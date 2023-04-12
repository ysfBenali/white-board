import React from 'react';

type IconProps = { className?: string };

type Opts = { width?: number; height?: number } & React.SVGProps<SVGSVGElement>;

const createIcon = (node: React.ReactNode, options: Opts) => {
  const { width = 24, height = width, style, className, ...rest } = options;

  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={style}
      {...rest}
    >
      {typeof node === 'string' ? <path fill="currentColor" d={node} /> : node}
    </svg>
  );
};

export const SelectionIcon = ({ className }: IconProps) =>
  createIcon(
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z" />
      <path d="M13.5 13.5l4.5 4.5" />
    </g>,
    { fill: 'none', width: 22, height: 22, strokeWidth: 1.25, className },
  );

export const RectangleIcon = ({ className }: IconProps) =>
  createIcon(
    <g strokeWidth="1.3">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="5" y="5" width="15" height="15" rx="2.5"></rect>
    </g>,
    {
      className,
      width: 24,
      height: 24,
      fill: 'none',
      stroke: 'currentColor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
  );

export const LineIcon = ({ className }: IconProps) =>
  createIcon(<path d="M4.167 10h11.666" strokeWidth="1.4" />, {
    className,
    width: 20,
    height: 20,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  });

export const CircleIcon = ({ className }: IconProps) =>
  createIcon(<circle cx="12" cy="12" r="7.5" strokeWidth="1.4" />, {
    className,
    width: 24,
    height: 24,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  });
