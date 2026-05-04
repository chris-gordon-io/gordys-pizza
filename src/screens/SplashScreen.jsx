import { useEffect } from 'react'
import GordysLogo from '../components/GordysLogo.jsx'

function formatDeliveryDate(iso) {
  if (!iso) return null
  const d = new Date(iso + 'T12:00:00')
  const day = d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()
  const date = d.getDate()
  const n = date % 10, m = date % 100
  const suffix = m === 11 || m === 12 || m === 13 ? 'TH' : n === 1 ? 'ST' : n === 2 ? 'ND' : n === 3 ? 'RD' : 'TH'
  return `${day} ${date}${suffix}`
}

/**
 * GORDY'S splash screen.
 *
 * The vector wordmark slides up from below the viewport while fading in,
 * then settles with a tiny overshoot. Tap or press any key to skip.
 */
export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const handler = () => onDone?.()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onDone])

  const formattedDate = formatDeliveryDate(localStorage.getItem('gordys_delivery_date') || '')

  return (
    <div
      onClick={() => onDone?.()}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-cream select-none cursor-pointer"
    >
      <div className="logo-rise flex flex-col items-center gap-4">
        <GordysLogo className="w-64 sm:w-72 md:w-80 h-auto" />
        {formattedDate && (
          <div className="flex flex-col items-center gap-1">
            <p className="font-condensed font-semibold text-crimson text-[13px] tracking-[2px] uppercase">Delivery</p>
            <p className="font-condensed font-semibold text-[#0e2c35] text-[32px] tracking-[3.2px] uppercase">{formattedDate}</p>
          </div>
        )}
      </div>

      <style>{`
        .logo-rise {
          transform: translateY(60vh);
          opacity: 0;
          animation: logoRise 1100ms cubic-bezier(0.22, 1, 0.36, 1) 200ms forwards;
          will-change: transform, opacity;
        }
        @keyframes logoRise {
          0%   { transform: translateY(60vh); opacity: 0; }
          40%  { opacity: 1; }
          85%  { transform: translateY(-6px); opacity: 1; }
          100% { transform: translateY(0);    opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-rise { animation: none; transform: none; opacity: 1; }
        }
      `}</style>
    </div>
  )
}
