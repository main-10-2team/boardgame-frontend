import { type IconProps } from '@custom-types/icon';

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
