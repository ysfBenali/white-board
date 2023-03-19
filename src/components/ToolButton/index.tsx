import React from 'react';

type ToolButtonProps = {
  checked: boolean;
  type: string;
  icon: React.ElementType;
  fillable: boolean;
  onClick: () => void;
};

const ToolButton = ({
  icon: Icon,
  type,
  checked,
  fillable,
  onClick,
}: ToolButtonProps) => {
  return (
    <label
      className={
        `box-border flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg ` +
        `${
          checked
            ? 'bg-button-muted bg-opacity-20 dark:bg-opacity-30 '
            : 'hover:bg-secondary hover:bg-opacity-30 hover:active:border hover:active:border-button-muted dark:hover:bg-opacity-10'
        }`
      }
      htmlFor={type}
      onChange={onClick}
    >
      <input
        className="appearance-none"
        id={type}
        type="radio"
        checked={checked}
      />
      <div className="h-5 w-5">
        {checked ? (
          <Icon
            className={`${
              fillable ? 'fill-primary stroke-primary' : 'stroke-primary'
            }`}
          />
        ) : (
          <Icon />
        )}
      </div>
    </label>
  );
};

export default ToolButton;
