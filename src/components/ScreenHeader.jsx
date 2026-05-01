import GordysLogo from './GordysLogo.jsx'

export default function ScreenHeader({ title, onLogoPress }) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-6 bg-cream shrink-0">
      <button onClick={onLogoPress} className="focus:outline-none" aria-label="Admin">
        <GordysLogo className="w-[78px] h-auto" />
      </button>
      <p className="font-condensed font-semibold text-crimson text-[18px] text-center tracking-[1.8px] uppercase leading-none">
        {title}
      </p>
    </div>
  )
}
