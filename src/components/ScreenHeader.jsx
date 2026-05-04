import GordysLogo from './GordysLogo.jsx'

export default function ScreenHeader({ title, subtitle, onLogoPress }) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-6 bg-cream shrink-0">
      <button onClick={onLogoPress} className="focus:outline-none" aria-label="Admin">
        <GordysLogo className="w-[78px] h-auto" />
      </button>
      <div className="flex flex-col items-center gap-[20px]">
        <p className="font-condensed font-semibold text-crimson text-[18px] text-center tracking-[1.8px] uppercase leading-none">
          {title}
        </p>
        {subtitle && (
          <div className="flex items-center gap-[6px] text-crimson">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
            </svg>
            <p className="font-condensed font-semibold text-crimson text-[14px] tracking-[1.4px] uppercase leading-none">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
