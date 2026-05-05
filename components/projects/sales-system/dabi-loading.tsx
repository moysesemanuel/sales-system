type DabiLoadingProps = {
  text?: string;
  fullScreen?: boolean;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: {
    wrapper: 86,
    logo: 48,
    ring: 74,
    radius: 14,
    fontSize: 16,
  },
  md: {
    wrapper: 110,
    logo: 64,
    ring: 96,
    radius: 18,
    fontSize: 20,
  },
  lg: {
    wrapper: 132,
    logo: 78,
    ring: 116,
    radius: 22,
    fontSize: 24,
  },
};

export function DabiLoading({
  text = "Sincronizando informações",
  fullScreen = true,
  showText = true,
  size = "md",
}: DabiLoadingProps) {
  const currentSize = sizeMap[size];

  return (
    <div
      style={{
        minHeight: fullScreen ? "100vh" : "auto",
        width: "100%",
        background: fullScreen ? "#020817" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: fullScreen ? 0 : 24,
      }}
    >
      <style>
        {`
          @keyframes dabiSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          @keyframes dabiPulse {
            0%, 100% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.06);
            }
          }

          @keyframes dabiGlow {
            0%, 100% {
              box-shadow: 0 0 32px rgba(37, 99, 235, 0.28);
            }

            50% {
              box-shadow: 0 0 42px rgba(124, 58, 237, 0.42);
            }
          }

          @keyframes dabiTextShine {
            0% {
              background-position: 160% center;
            }

            100% {
              background-position: -160% center;
            }
          }

          @keyframes dabiDotFloat {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.45;
            }

            50% {
              transform: translateY(-3px);
              opacity: 1;
            }
          }

          .dabi-loading-text {
            background: linear-gradient(
              90deg,
              #64748b 0%,
              #94a3b8 35%,
              #e0e7ff 50%,
              #94a3b8 65%,
              #64748b 100%
            );
            background-size: 220% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: dabiTextShine 2.4s ease-in-out infinite;
          }

          .dabi-loading-dots {
            display: inline-flex;
            gap: 1px;
            color: #94a3b8;
          }

          .dabi-loading-dots span {
            display: inline-block;
            animation: dabiDotFloat 1.2s ease-in-out infinite;
          }

          .dabi-loading-dots span:nth-child(1) {
            animation-delay: 0s;
          }

          .dabi-loading-dots span:nth-child(2) {
            animation-delay: 0.15s;
          }

          .dabi-loading-dots span:nth-child(3) {
            animation-delay: 0.3s;
          }
        `}
      </style>

      <div
        style={{
          width: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: currentSize.wrapper,
            height: currentSize.wrapper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: showText ? 14 : 0,
          }}
        >
          <div
            style={{
              width: currentSize.logo,
              height: currentSize.logo,
              borderRadius: currentSize.radius,
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: "0 0 32px rgba(37, 99, 235, 0.28)",
              animation:
                "dabiPulse 1.6s ease-in-out infinite, dabiGlow 1.6s ease-in-out infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: currentSize.ring,
                height: currentSize.ring,
                borderRadius: 999,
                border: "3px solid rgba(37, 99, 235, 0.12)",
                borderTopColor: "#2563eb",
                borderRightColor: "#7c3aed",
                boxSizing: "border-box",
                animation: "dabiSpin 1s linear infinite",
              }}
            />

            <span
              style={{
                position: "relative",
                zIndex: 1,
                color: "#ffffff",
                fontSize: currentSize.fontSize,
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              DB
            </span>
          </div>
        </div>

        {showText && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              fontSize: 14,
              lineHeight: 1.4,
              whiteSpace: "nowrap",
            }}
          >
            <span className="dabi-loading-text">{text}</span>

            <span className="dabi-loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}