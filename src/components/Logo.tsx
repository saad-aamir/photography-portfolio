"use client";

interface LogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  minimal?: boolean; // Just the camera + couple silhouette for navbar
}

export default function Logo({
  size = 500,
  className = "",
  animated = true,
  minimal = false,
}: LogoProps) {
  const drawStyle = (delay: number) =>
    animated
      ? {
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: `draw 1.8s ${delay}s ease forwards`,
        }
      : { strokeDasharray: "none" as const };

  const lineStyle = (delay: number) =>
    animated
      ? {
          fill: "none" as const,
          strokeLinecap: "round" as const,
          strokeLinejoin: "round" as const,
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: `draw 1.8s ${delay}s ease forwards`,
        }
      : {
          fill: "none" as const,
          strokeLinecap: "round" as const,
          strokeLinejoin: "round" as const,
        };

  if (minimal) {
    return (
      <svg
        viewBox="200 130 102 170"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * (170 / 102)}
        className={className}
      >
        <defs>
          <filter id="softglow-mini">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#softglow-mini)">
          {/* Woman head */}
          <ellipse cx="225" cy="168" rx="16" ry="18" fill="none" stroke="#B5D4C0" strokeWidth="1.5" />
          {/* Man head */}
          <ellipse cx="278" cy="165" rx="17" ry="19" fill="none" stroke="#9AC4A8" strokeWidth="1.5" />
          {/* Camera */}
          <rect x="234" y="248" width="34" height="26" rx="4" fill="none" stroke="#E8F5EC" strokeWidth="1.5" />
          <circle cx="251" cy="261" r="9" fill="none" stroke="#E8F5EC" strokeWidth="1.2" />
          <circle cx="251" cy="261" r="3" fill="#B5D4C0" opacity="0.8" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <radialGradient id="bg2" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#0a1a0f" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Circular frame */}
      <circle cx="250" cy="245" r="185" fill="none" stroke="#4A7C5B" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 5" />
      <circle cx="250" cy="245" r="178" fill="none" stroke="#6BAB80" strokeWidth="0.5" opacity="0.2" />

      {/* Botanical leaves — left side */}
      <g style={{ transformOrigin: "90px 300px", animation: animated ? "sway 5s ease-in-out infinite" : "none" }}>
        <path d="M90,300 Q60,270 50,240 Q65,255 90,300Z" fill="none" stroke="#4A7C5B" strokeWidth="1.2" opacity="0.7" style={drawStyle(0.2)} />
        <path d="M90,300 Q55,280 48,260 Q62,272 90,300Z" fill="none" stroke="#6BAB80" strokeWidth="1" opacity="0.5" style={drawStyle(0.3)} />
        <line x1="90" y1="300" x2="52" y2="248" stroke="#4A7C5B" strokeWidth="0.8" opacity="0.4" style={drawStyle(0.25)} />
      </g>
      <g style={{ transformOrigin: "80px 360px", animation: animated ? "sway 6s 1s ease-in-out infinite" : "none" }}>
        <path d="M80,360 Q42,340 35,310 Q55,328 80,360Z" fill="none" stroke="#4A7C5B" strokeWidth="1.2" opacity="0.6" style={drawStyle(0.4)} />
        <line x1="80" y1="360" x2="37" y2="318" stroke="#4A7C5B" strokeWidth="0.8" opacity="0.4" style={drawStyle(0.45)} />
      </g>

      {/* Botanical leaves — right side */}
      <g style={{ transformOrigin: "410px 280px", animation: animated ? "sway 5.5s 0.5s ease-in-out infinite" : "none" }}>
        <path d="M410,280 Q445,255 455,225 Q438,242 410,280Z" fill="none" stroke="#4A7C5B" strokeWidth="1.2" opacity="0.7" style={drawStyle(0.35)} />
        <path d="M410,280 Q448,265 456,242 Q440,255 410,280Z" fill="none" stroke="#6BAB80" strokeWidth="1" opacity="0.5" style={drawStyle(0.45)} />
        <line x1="410" y1="280" x2="454" y2="234" stroke="#4A7C5B" strokeWidth="0.8" opacity="0.4" style={drawStyle(0.4)} />
      </g>
      <g style={{ transformOrigin: "420px 350px", animation: animated ? "sway 4.5s 1.5s ease-in-out infinite" : "none" }}>
        <path d="M420,350 Q458,325 465,295 Q448,314 420,350Z" fill="none" stroke="#4A7C5B" strokeWidth="1.2" opacity="0.6" style={drawStyle(0.5)} />
        <line x1="420" y1="350" x2="463" y2="302" stroke="#4A7C5B" strokeWidth="0.8" opacity="0.4" style={drawStyle(0.55)} />
      </g>

      {/* Top botanical sprigs */}
      <g filter="url(#softglow)">
        <path d="M200,95 Q185,70 175,55" fill="none" stroke="#6BAB80" strokeWidth="1" opacity="0.6" style={drawStyle(0.6)} />
        <path d="M200,95 Q190,72 183,62 Q178,68 175,55" fill="none" stroke="#4A7C5B" strokeWidth="0.8" opacity="0.5" style={drawStyle(0.65)} />
        <path d="M200,95 Q195,75 200,62" fill="none" stroke="#6BAB80" strokeWidth="1" opacity="0.5" style={drawStyle(0.7)} />
        <path d="M300,95 Q315,70 325,55" fill="none" stroke="#6BAB80" strokeWidth="1" opacity="0.6" style={drawStyle(0.6)} />
        <path d="M300,95 Q310,72 317,62 Q322,68 325,55" fill="none" stroke="#4A7C5B" strokeWidth="0.8" opacity="0.5" style={drawStyle(0.7)} />
      </g>

      {/* Couple group */}
      <g
        style={{
          animation: animated ? "bob 5s ease-in-out infinite" : "none",
          transformOrigin: "250px 280px",
        }}
        filter="url(#softglow)"
      >
        {/* Woman — head */}
        <ellipse cx="195" cy="168" rx="21" ry="24" fill="none" stroke="#B5D4C0" strokeWidth="1.8" style={drawStyle(0.8)} />
        {/* Woman hair flowing */}
        <path pathLength={1} stroke="#B5D4C0" strokeWidth="1.4" d="M175,160 Q170,145 177,135 Q185,127 196,128 Q208,130 212,140 Q216,152 212,165" style={lineStyle(0.85)} />
        <path pathLength={1} stroke="#B5D4C0" strokeWidth="1" d="M175,160 Q165,168 163,182 Q162,195 167,205" style={lineStyle(0.9)} />
        {/* Woman dress body */}
        <path pathLength={1} stroke="#B5D4C0" strokeWidth="1.8" d="M183,192 Q178,205 176,222 Q174,242 176,262 Q178,278 182,290" style={lineStyle(0.95)} />
        {/* Dress flare */}
        <path pathLength={1} stroke="#B5D4C0" strokeWidth="1.4" d="M176,262 Q165,275 158,295 Q153,315 157,332 Q162,348 174,352 Q186,356 196,350 Q206,343 208,328 Q210,310 205,292 Q200,275 194,262" style={lineStyle(1.0)} />
        {/* Woman arm to camera */}
        <path pathLength={1} stroke="#B5D4C0" strokeWidth="1.5" d="M183,215 Q198,210 214,210 Q224,210 232,214" style={lineStyle(1.05)} />

        {/* Man — head */}
        <ellipse cx="305" cy="165" rx="23" ry="26" fill="none" stroke="#9AC4A8" strokeWidth="1.8" style={drawStyle(0.8)} />
        {/* Man hair */}
        <path pathLength={1} stroke="#9AC4A8" strokeWidth="1.4" d="M283,158 Q284,143 294,136 Q305,130 316,135 Q326,141 327,155" style={lineStyle(0.85)} />
        {/* Man shirt/jacket */}
        <path pathLength={1} stroke="#9AC4A8" strokeWidth="2" d="M315,192 Q322,205 324,222 Q326,242 324,262 Q323,278 320,290" style={lineStyle(0.95)} />
        <path pathLength={1} stroke="#9AC4A8" strokeWidth="1.5" d="M308,192 Q300,205 298,225 Q296,248 298,268 Q300,285 305,298 Q312,312 320,315 Q330,316 338,308 Q346,298 346,280 Q346,260 343,242 Q340,224 335,210" style={lineStyle(1.0)} />
        {/* Man arm to camera */}
        <path pathLength={1} stroke="#9AC4A8" strokeWidth="1.5" d="M318,218 Q304,214 290,213 Q278,212 268,215" style={lineStyle(1.05)} />
        {/* Arm around woman */}
        <path pathLength={1} stroke="#9AC4A8" strokeWidth="1.5" d="M298,228 Q278,224 260,225 Q245,226 232,230" style={lineStyle(1.1)} />

        {/* Camera */}
        <rect x="224" y="248" width="54" height="40" rx="6" fill="none" stroke="#E8F5EC" strokeWidth="2" style={drawStyle(1.2)} />
        <circle cx="251" cy="268" r="13" fill="none" stroke="#E8F5EC" strokeWidth="1.8" style={drawStyle(1.35)} />
        <circle cx="251" cy="268" r="7" fill="none" stroke="#E8F5EC" strokeWidth="1.2" style={drawStyle(1.45)} />
        <circle cx="251" cy="268" r="2.5" fill="#B5D4C0" opacity="0.8" />
        {/* Top mount */}
        <path pathLength={1} stroke="#E8F5EC" strokeWidth="1.6" d="M236,248 L236,241 L240,238 L262,238 L266,241 L266,248" style={lineStyle(1.25)} />
        {/* Shutter */}
        <rect x="254" y="236" width="9" height="5" rx="2.5" fill="none" stroke="#E8F5EC" strokeWidth="1.2" style={drawStyle(1.3)} />

        {/* Faces */}
        <path pathLength={1} stroke="#B5D4C0" strokeWidth="1.1" d="M189,171 Q193,174 197,171" style={lineStyle(1.6)} />
        <circle cx="188" cy="165" r="1.8" fill="#B5D4C0" opacity="0.8" />
        <circle cx="201" cy="165" r="1.8" fill="#B5D4C0" opacity="0.8" />

        <path pathLength={1} stroke="#9AC4A8" strokeWidth="1.1" d="M299,168 Q304,172 309,168" style={lineStyle(1.6)} />
        <circle cx="297" cy="163" r="1.8" fill="#9AC4A8" opacity="0.8" />
        <circle cx="311" cy="163" r="1.8" fill="#9AC4A8" opacity="0.8" />
      </g>

      {/* Click flash */}
      <g style={{ animation: animated ? "click-flash 0.4s 2.5s 3 ease" : "none", opacity: animated ? 0 : 0 }}>
        <circle cx="251" cy="240" r="30" fill="none" stroke="#E8F5EC" strokeWidth="1" opacity="0.6" />
        <line x1="251" y1="210" x2="251" y2="195" stroke="#E8F5EC" strokeWidth="1.5" />
        <line x1="275" y1="216" x2="285" y2="205" stroke="#E8F5EC" strokeWidth="1.5" />
        <line x1="227" y1="216" x2="217" y2="205" stroke="#E8F5EC" strokeWidth="1.5" />
        <line x1="283" y1="240" x2="298" y2="240" stroke="#E8F5EC" strokeWidth="1.5" />
        <line x1="219" y1="240" x2="204" y2="240" stroke="#E8F5EC" strokeWidth="1.5" />
      </g>

      {/* Sparks */}
      {animated && (
        <g filter="url(#softglow)">
          <circle cx="251" cy="240" r="3" fill="#E8F5EC" style={{ animation: "spark-fly 1s 2.6s ease-out forwards", ["--tx" as string]: "-40px", ["--ty" as string]: "-50px" }} />
          <circle cx="251" cy="240" r="2" fill="#6BAB80" style={{ animation: "spark-fly 0.9s 2.65s ease-out forwards", ["--tx" as string]: "45px", ["--ty" as string]: "-45px" }} />
          <circle cx="251" cy="240" r="2.5" fill="#B5D4C0" style={{ animation: "spark-fly 0.8s 2.7s ease-out forwards", ["--tx" as string]: "-20px", ["--ty" as string]: "-60px" }} />
          <circle cx="251" cy="240" r="2" fill="#E8F5EC" style={{ animation: "spark-fly 1.1s 2.6s ease-out forwards", ["--tx" as string]: "25px", ["--ty" as string]: "-62px" }} />
          <circle cx="251" cy="240" r="1.5" fill="#fff" style={{ animation: "spark-fly 0.85s 2.75s ease-out forwards", ["--tx" as string]: "-55px", ["--ty" as string]: "-28px" }} />
          <circle cx="251" cy="240" r="2" fill="#6BAB80" style={{ animation: "spark-fly 0.75s 2.8s ease-out forwards", ["--tx" as string]: "58px", ["--ty" as string]: "-22px" }} />
        </g>
      )}

      {/* Stars */}
      <g fill="#6BAB80">
        <circle cx="145" cy="120" r="1.8" style={{ animation: animated ? "twinkle 3s 0.4s infinite" : "none" }} />
        <circle cx="375" cy="100" r="2" style={{ animation: animated ? "twinkle 2.5s 0.8s infinite" : "none" }} />
        <circle cx="430" cy="340" r="1.5" style={{ animation: animated ? "twinkle 4s 1.2s infinite" : "none" }} />
        <circle cx="95" cy="380" r="1.8" style={{ animation: animated ? "twinkle 2.8s 0.6s infinite" : "none" }} />
        <circle cx="200" cy="430" r="1.5" style={{ animation: animated ? "twinkle 3.2s 1s infinite" : "none" }} />
        <circle cx="360" cy="410" r="1.8" style={{ animation: animated ? "twinkle 2.2s 1.4s infinite" : "none" }} />
      </g>

      {/* Bottom label */}
      <text x="250" y="478" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" letterSpacing="5" fill="#6BAB80" opacity="0.55" fontStyle="italic">
        sussex light
      </text>
    </svg>
  );
}
