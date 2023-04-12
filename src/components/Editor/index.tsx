import rough from 'roughjs';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTheme, useToggleTheme } from '../../providers/ThemeProvider';
import useWindowSize from '../../hooks/useWindowSize';
import { Options, Drawable } from 'roughjs/bin/core';
import TopMenu from '../TopMenu';
import { Coordinates, Element, Point } from '../../types';

const generator = rough.generator();

const createElement = (
  id: number,
  coordinates: Coordinates,
  type: string,
  options?: Options,
): Element => {
  const { x1, y1, x2, y2 } = coordinates;
  let roughElement = {} as Drawable;

  if (type === 'line') roughElement = generator.line(x1, y1, x2, y2, options);
  if (type === 'rectangle')
    roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, options);
  if (type === 'ellipse') {
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    roughElement = generator.ellipse(cx, cy, x2 - x1, y2 - y1, options);
  }

  return { id, x1, y1, x2, y2, type, roughElement };
};

const adjustElementCoordinates = (element: Element): Coordinates => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === 'rectangle') {
    return {
      x1: Math.min(x1, x2),
      y1: Math.min(y1, y2),
      x2: Math.max(x1, x2),
      y2: Math.max(y1, y2),
    };
  }
  if (type === 'line') {
    if (x1 < x2 || x1 === x2 || y1 < y2) return { x1, y1, x2, y2 };
    else return { x1: x2, y1: y2, x2: x1, y2: y1 };
  }

  return element;
};

const nearPoint = (
  x: number,
  y: number,
  x1: number,
  y1: number,
  positionName: string,
) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? positionName : null;
};

const positionWithinElement = (x: number, y: number, element: Element) => {
  const { x1, y1, x2, y2, type } = element;

  if (type === 'rectangle') {
    const topLeft = nearPoint(x, y, x1, y1, 'tl');
    const topRight = nearPoint(x, y, x2, y1, 'tr');
    const bottomLeft = nearPoint(x, y, x1, y2, 'bl');
    const bottomRight = nearPoint(x, y, x2, y2, 'br');
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;

    return topLeft || topRight || bottomLeft || bottomRight || inside;
  }
  if (type === 'line') {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearPoint(x, y, x1, y1, 'start');
    const end = nearPoint(x, y, x2, y2, 'end');
    const inside = Math.abs(offset) < 1 ? 'inside' : null;

    return start || end || inside;
  }
  if (type === 'ellipse') {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const radiusX = Math.abs(x2 - x1) / 2;
    const radiusY = Math.abs(y2 - y1) / 2;
    const normalizedX = (x - centerX) / radiusX;
    const normalizedY = (y - centerY) / radiusY;
    const distanceFromCenter = Math.sqrt(
      normalizedX * normalizedX + normalizedY * normalizedY,
    );
    const inside = distanceFromCenter <= 1.125 ? 'inside' : null;

    return inside;
  } else throw new Error(`Type not recognised: ${type}`);
};

const cursorPosition = (position: string): string => {
  switch (position) {
    case 'tr':
    case 'bl':
      return 'nesw-resize';
    case 'tl':
    case 'br':
    case 'start':
    case 'end':
      return 'nwse-resize';
    default:
      return 'move';
  }
};

const distance = (a: Point, b: Point) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x: number, y: number, elements: Element[]) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

const Editor = () => {
  const ToggleTheme = useToggleTheme();
  const theme = useTheme();
  const isDark = theme === 'dark';

  const { width: canvasWidth, height: canvasHeight } = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [action, setAction] = useState('none');
  const [tool, setTool] = useState('selection');
  const innerStrokeColor = isDark ? 'white' : 'black';

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    //clear canvas
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements, canvasWidth, canvasHeight]);

  useEffect(() => {
    const updatedElements = elements?.map((item) => {
      const { roughElement } = item;
      return {
        ...item,
        roughElement: {
          ...roughElement,
          options: { ...roughElement?.options, stroke: innerStrokeColor },
        },
        strokeColor: innerStrokeColor,
      };
    });
    setElements(updatedElements);
  }, [theme]);

  const updateElement = (
    id: number,
    newCoordinates: Coordinates,
    type: string,
    options?: Options,
  ) => {
    const updatedElement = createElement(id, newCoordinates, type, options);
    const elementsClone = [...elements];
    elementsClone[id] = updatedElement;
    setElements(elementsClone);
  };

  //Event Handlers
  const handleMouseDown = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const { clientX, clientY } = event;
    const boundingRect = canvasRef.current.getBoundingClientRect();
    if (tool === 'selection') {
      // Moving
      const element = getElementAtPosition(
        clientX - boundingRect.left,
        clientY - boundingRect.top,
        elements,
      );
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY } as Element);
        if (element.position === 'inside') setAction('moving');
        else setAction('resizing');
      }
    } else {
      // Drawing
      setAction('drawing');
      const id = elements.length;
      const element = createElement(
        id,
        {
          x1: clientX - boundingRect.left,
          y1: clientY - boundingRect.top,
          x2: clientX,
          y2: clientY,
        },
        tool,
        { stroke: innerStrokeColor },
      );
      setElements((prev) => [...prev, element]);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const { clientX, clientY } = event;
    const boundingRect = canvasRef.current.getBoundingClientRect();
    const target = event.target as HTMLElement;
    target.style.cursor = 'crosshair';

    if (tool === 'selection') {
      const element = getElementAtPosition(
        clientX - boundingRect.left,
        clientY - boundingRect.top,
        elements,
      );
      target.style.cursor = element
        ? cursorPosition(element.position as string)
        : 'default';
    }
    if (action === 'drawing') {
      // Drawing
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(
        index,
        {
          x1,
          y1,
          x2: clientX - boundingRect.left,
          y2: clientY - boundingRect.top,
        },
        tool,
        { stroke: innerStrokeColor },
      );
    } else if (action === 'moving') {
      // Moving
      const { id, x1, y1, x2, y2, type, offsetX, offsetY } =
        selectedElement as Element;
      const width = x2 - x1;
      const height = y2 - y1;

      const nextX1 = offsetX ? clientX - offsetX : clientX;
      const nextY1 = offsetY ? clientY - offsetY : clientY;
      updateElement(
        id,
        {
          x1: nextX1,
          y1: nextY1,
          x2: nextX1 + width,
          y2: nextY1 + height,
        },
        type,
        { stroke: innerStrokeColor },
      );
    }
  };

  const handleMouseUp = () => {
    const index = elements.length - 1;
    const { id, type } = elements[index];
    if (action === 'drawing') {
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(
        id,
        {
          x1,
          y1,
          x2,
          y2,
        },
        type,
        { stroke: innerStrokeColor },
      );
    }
    setSelectedElement(null);
    setAction('none');
  };

  return (
    <div className="flex h-full w-full flex-col bg-white text-base dark:bg-zinc-900 dark:text-base-dark">
      <div className="pointer-events-none absolute h-full w-full p-4">
        <div className="relative z-30 grid grid-cols-4 gap-12">
          <div className="pointer-events-auto justify-self-start">
            <button onClick={ToggleTheme}>{isDark ? 'Light' : 'Dark'}</button>
          </div>
          <section className="col-span-2 flex justify-center">
            <TopMenu tool={tool} onDrawingToolChange={setTool} />
          </section>
          <div className="justify-self-end">right section</div>
        </div>
        <footer className="pointer-events-none absolute left-0 bottom-4 z-30 w-full px-4 text-center">
          App Footer
        </footer>
      </div>
      <main>
        <canvas
          className="absolute z-20 bg-white dark:bg-zinc-900"
          id="canvas"
          ref={canvasRef}
          height={canvasHeight}
          width={canvasWidth}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          Canvas
        </canvas>
      </main>
    </div>
  );
};

export default Editor;
