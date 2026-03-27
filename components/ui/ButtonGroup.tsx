import React from 'react';
import { Button } from './Button';
import type { ButtonType, ButtonSize } from './Button';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupItem { label: string; onClick?: () => void; disabled?: boolean; }

export interface ButtonGroupProps {
  type?: ButtonType;
  size?: ButtonSize;
  orientation?: ButtonGroupOrientation;
  items?: ButtonGroupItem[];
  disabled?: boolean;
}

export function ButtonGroup({
  type = 'primary',
  size = 'medium',
  orientation = 'horizontal',
  items = [{ label: 'First' }, { label: 'Second' }, { label: 'Third' }],
  disabled = false,
}: ButtonGroupProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      role="group"
      aria-label="Button group"
      className={['inline-flex', isHorizontal ? 'flex-row' : 'flex-col'].join(' ')}
    >
      {items.map((item, i) => {
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        const radiusClass = isHorizontal
          ? isFirst ? 'rounded-r-none'
            : isLast ? 'rounded-l-none'
            : 'rounded-none'
          : isFirst ? 'rounded-b-none'
            : isLast ? 'rounded-t-none'
            : 'rounded-none';

        const borderClass = isHorizontal && !isFirst
          ? '-ml-px'
          : !isHorizontal && !isFirst
            ? '-mt-px'
            : '';

        return (
          <div key={i} className={[radiusClass, borderClass, 'relative'].join(' ')}>
            <Button
              type={type}
              size={size}
              label={item.label}
              disabled={disabled || item.disabled}
              onClick={item.onClick}
            />
          </div>
        );
      })}
    </div>
  );
}
