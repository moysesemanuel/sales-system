type MenuSelectionShapeProps = {
  className?: string;
};

export function MenuSelectionShape({ className }: MenuSelectionShapeProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 -24 236 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2
       H222
       A18 18 0 0 0 240 -16
       V76
       A18 18 0 0 0 222 58
       H20
       A18 18 0 0 1 2 40
       V20
       A18 18 0 0 1 20 2"
        fill="currentColor"
      />
    </svg>
  );
}
