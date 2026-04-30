type DaBiTechLogoProps = {
  className?: string;
  variant?: "light" | "dark";
  mode?: "full" | "symbol";
};

export function DaBiTechLogo({
  className,
  variant = "light",
  mode = "full",
}: DaBiTechLogoProps) {
  const wordmarkFill = variant === "dark" ? "#000000" : "#ffffff";
  return (
    <svg
      aria-label="DaBi Tech Digital Solutions"
      className={className}
      role="img"
      viewBox={mode === "symbol" ? "120 85 110 110" : "120 85 520 120"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(120,85)">
        <rect x="0" y="0" width="110" height="110" rx="24" ry="24" fill="#0B2A57" />

        <g transform="translate(5,0)">
          <path d="M25 10 H53 C73 10 88 22 88 35 C88 48 73 60 53 60 H25 Z" fill="#ffffff" />
          <path d="M25 50 H53 C73 50 88 62 88 75 C88 88 73 100 53 100 H25 Z" fill="#00B6E6" opacity="0.6" />
        </g>
      </g>

      {mode === "full" ? (
        <>
          <text
            x="285"
            y="145"
            fill={wordmarkFill}
            fontFamily="Inter, system-ui, Arial, sans-serif"
            fontSize="68"
            fontWeight="700"
          >
            DaBi Tech
          </text>
          <text
            x="288"
            y="190"
            fill="#00B6E6"
            fontFamily="Inter, system-ui, Arial, sans-serif"
            fontSize="24"
            fontWeight="500"
            letterSpacing="1px"
          >
            DIGITAL SOLUTIONS
          </text>
        </>
      ) : null}
    </svg>
  );
}
