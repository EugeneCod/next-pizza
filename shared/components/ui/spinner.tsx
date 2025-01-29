interface SpinnerProps {
  size?: number;
  thickness?: number;
  color?: string;
}

export const Spinner = (props: SpinnerProps) => {
  const { size = 50, thickness = 4, color = '#f55100' } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray="100,50"
      />
    </svg>
  );
};
