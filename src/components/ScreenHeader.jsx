import GordysLogo from './GordysLogo.jsx'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
    </svg>
  )
}

function SubtitleRow({ text, icon }) {
  const Icon = icon === 'clock' ? ClockIcon : CalendarIcon
  return (
    <div className="flex items-center gap-[6px] text-crimson">
      <Icon />
      <p className="font-condensed font-semibold text-crimson text-[14px] tracking-[1.4px] uppercase leading-none">
        {text}
      </p>
    </div>
  )
}

export default function ScreenHeader({ title, subtitle, subtitleIcon, subtitle2, subtitleIcon2, onLogoPress, onBack, onClose }) {
  return (
    <div className="relative flex flex-col gap-6 items-center justify-center py-6 bg-cream shrink-0">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 text-teal active:opacity-60"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute left-[12px] top-[12px] flex items-center justify-center w-10 h-10 text-teal active:opacity-60"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
      <button onClick={onLogoPress} className="focus:outline-none" aria-label="Admin">
        <GordysLogo className="w-[78px] h-auto" />
      </button>
      <div className="flex flex-col items-center gap-[22px]">
        <p className="font-condensed font-semibold text-crimson text-[18px] text-center tracking-[1.8px] uppercase leading-none">
          {title}
        </p>
        {(subtitle || subtitle2) && (
          <div className="flex flex-col items-center gap-2">
            {subtitle && <SubtitleRow text={subtitle} icon={subtitleIcon} />}
            {subtitle2 && <SubtitleRow text={subtitle2} icon={subtitleIcon2} />}
          </div>
        )}
      </div>
    </div>
  )
}
