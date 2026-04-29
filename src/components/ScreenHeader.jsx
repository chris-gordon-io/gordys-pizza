import GordysLogo from './GordysLogo.jsx'

export default function ScreenHeader({ title }) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center py-6 bg-cream shrink-0">
      <GordysLogo className="w-[78px] h-auto" />
      <p className="font-condensed font-semibold text-crimson text-[18px] text-center tracking-[1.8px] uppercase leading-none">
        {title}
      </p>
    </div>
  )
}
