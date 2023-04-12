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
            ? 'bg-true-v-600 bg-opacity-20 dark:bg-true-v-400 dark:bg-opacity-30 '
            : 'hover:bg-alto-400 hover:bg-opacity-30 hover:active:border hover:active:border-true-v-700 dark:hover:bg-opacity-10 dark:hover:active:border-true-v-300'
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
              fillable
                ? 'fill-true-v-600 stroke-true-v-600 dark:fill-true-v-400 dark:stroke-true-v-400'
                : 'stroke-true-v-600 dark:stroke-true-v-400'
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
