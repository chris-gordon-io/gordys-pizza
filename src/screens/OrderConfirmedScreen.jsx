export default function OrderConfirmedScreen({ onHome }) {
  return (
    <div className="flex flex-col h-full bg-cream items-center justify-center gap-10 px-6">
      <div className="tick-wrap flex items-center justify-center">
        <svg viewBox="0 0 80 80" className="w-24 h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" stroke="#A82938" strokeWidth="3" className="tick-circle" />
          <path
            d="M22 41 L34 53 L58 28"
            stroke="#A82938"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tick-check"
          />
        </svg>
      </div>

      <p className="font-condensed font-semibold text-[#0e2c35] text-[32px] tracking-[3.2px] uppercase text-center leading-tight">
        Order<br />Confirmed
      </p>

      <button
        onClick={onHome}
        className="w-full max-w-xs py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase bg-crimson text-cream active:bg-crimson-dark"
      >
        Back to home
      </button>

      <style>{`
        .tick-wrap {
          animation: tickBounce 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms both;
        }
        @keyframes tickBounce {
          0%   { transform: scale(0);   opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        .tick-circle {
          stroke-dasharray: 239;
          stroke-dashoffset: 239;
          animation: drawCircle 500ms ease-out 200ms forwards;
        }
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        .tick-check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawCheck 350ms ease-out 600ms forwards;
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tick-wrap, .tick-circle, .tick-check { animation: none; }
          .tick-circle { stroke-dashoffset: 0; }
          .tick-check  { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
