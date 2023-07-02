import ToolButton from '../ToolButton';
import { SHAPES } from '../shapes';
import React from 'react';

type TopMenuProps = {
  className?: string;
  tool: string;
  onDrawingToolChange: (tool: string) => void;
};

const TopMenu = ({ tool, onDrawingToolChange }: TopMenuProps) => {
  return (
    <div className="box-border rounded-md bg-white px-4 py-1 drop-shadow-lg dark:bg-neutral-800">
      <div className="pointer-events-auto relative grid auto-cols-auto grid-flow-col grid-rows-none gap-2 ">
        {SHAPES?.map(({ value, icon, fillable }, index) => (
          <ToolButton
            key={index}
            type={value}
            checked={tool === value}
            fillable={fillable}
            icon={icon}
            onClick={() => onDrawingToolChange(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopMenu;
