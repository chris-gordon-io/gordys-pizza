import { useEffect } from 'react'
import GordysLogo from '../components/GordysLogo.jsx'

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

  return (
    <div
      onClick={() => onDone?.()}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-cream select-none cursor-pointer"
    >
      <GordysLogo className="logo-rise w-64 sm:w-72 md:w-80 h-auto" />

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
