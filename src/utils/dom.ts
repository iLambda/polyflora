type OverflowerX = { clientWidth: number, scrollWidth: number, };
type OverflowerY = { clientHeight: number, scrollHeight: number }; 
const isOverflownY = ({ clientHeight, scrollHeight }: OverflowerY) => { return scrollHeight > clientHeight; };
const isOverflownX = ({ clientWidth, scrollWidth }: OverflowerX) => { return scrollWidth > clientWidth; };

export function isOverflown (dir: 'x', element: OverflowerX) : boolean;
export function isOverflown (dir: 'y', element: OverflowerY) : boolean;
export function isOverflown (dir: 'xy', element: OverflowerX & OverflowerY) : boolean;
export function isOverflown (dir: 'x' | 'y' | 'xy', element: OverflowerX | OverflowerY | (OverflowerX & OverflowerY)) : boolean {
    const overflowX = dir !== 'y' && 'clientWidth' in element && isOverflownX(element);
    const overflowY = dir !== 'x' && 'clientHeight' in element && isOverflownY(element);
    return overflowX || overflowY;
}