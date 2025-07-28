import type { ComponentType, SVGProps } from 'react';

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface IconProps {
  icon: SvgIconComponent;
  size?: number;
  color?: string;
  className?: string;
  iconClassName?: string;
}

export default function Icon({
  icon: ImgIcon,
  size = 18,
  className,
  iconClassName,
}: IconProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <ImgIcon className={`${iconClassName}`} />
    </div>
  );
}
