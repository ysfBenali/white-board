import { LineIcon, SelectionIcon, RectangleIcon, CircleIcon } from './icons';

type ShapesType = {
  value: string;
  icon: React.ElementType;
  fillable: boolean;
};

export const SHAPES: ShapesType[] = [
  { value: 'selection', icon: SelectionIcon, fillable: true },
  { value: 'rectangle', icon: RectangleIcon, fillable: true },
  { value: 'ellipse', icon: CircleIcon, fillable: true },
  { value: 'line', icon: LineIcon, fillable: false },
];
