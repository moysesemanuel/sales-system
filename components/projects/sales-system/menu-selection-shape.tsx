type MenuSelectionShapeProps = {
  className?: string;
};

export function MenuSelectionShape({ className }: MenuSelectionShapeProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="-52 -24 288 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-34 2
       H222
       A18 18 0 0 0 240 -16
       V76
       A18 18 0 0 0 222 58
       H-34
       A18 18 0 0 1 -52 40
       V20
       A18 18 0 0 1 -34 2"
        fill="currentColor"
      />
    </svg>
  );
}
