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

export default cursorPosition;
