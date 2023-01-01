import React from 'react';

type TopMenuProps = {
  className?: string;
  tool: string;
  onDrawingToolChange: (tool: string) => void;
};

const TopMenu = ({ tool, onDrawingToolChange }: TopMenuProps) => {
  return (
    <div className="box-border rounded-md bg-white px-4 py-2 drop-shadow-lg dark:bg-zinc-800">
      <div className="pointer-events-auto relative grid auto-cols-auto grid-flow-col grid-rows-none gap-2">
        <input
          type="radio"
          name="tool"
          id="selection"
          checked={tool === 'selection'}
          onChange={() => onDrawingToolChange('selection')}
        />
        <label htmlFor="selection">Selection</label>
        <input
          type="radio"
          name="tool"
          id="line"
          checked={tool === 'line'}
          onChange={() => onDrawingToolChange('line')}
        />
        <label htmlFor="line">Line</label>
        <input
          type="radio"
          name="tool"
          id="rectangle"
          checked={tool === 'rectangle'}
          onChange={() => onDrawingToolChange('rectangle')}
        />
        <label htmlFor="rectangle">Rectangle</label>
      </div>
    </div>
  );
};

export default TopMenu;
