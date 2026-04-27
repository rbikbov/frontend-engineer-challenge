import { IconProps } from './_icon-props';

export const ChevronLeftIcon = ({
  size = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.94369 11.9906L13.9719 1.97291L12.0284 0.0273438L1.0284 11.0158L0.0566406 11.9865L1.02636 12.9593L12.0033 23.9709L13.9509 22.0294L3.94369 11.9906Z"
      fill="currentColor"
    />
  </svg>
);
