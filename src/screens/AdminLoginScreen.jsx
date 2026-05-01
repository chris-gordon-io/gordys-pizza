import { useState } from 'react'
import GordysLogo from '../components/GordysLogo.jsx'

export default function AdminLoginScreen({ onLogin, onBack }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (password === 'admin') {
      onLogin()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-cream px-6">
      <div className="flex flex-col gap-6 items-center justify-center py-6 shrink-0">
        <GordysLogo className="w-[78px] h-auto" />
        <p className="font-condensed font-semibold text-crimson text-[18px] text-center tracking-[1.8px] uppercase leading-none">
          Admin
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Password"
            autoFocus
            className="w-full border border-teal bg-white px-4 py-3 font-body text-teal text-[16px] focus:outline-none placeholder:text-teal/30"
          />
          {error && (
            <p className="font-body text-crimson text-[14px] text-center">Incorrect password</p>
          )}
          <button
            type="submit"
            className="w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase bg-crimson text-cream active:bg-crimson-dark"
          >
            Log in
          </button>
        </form>
        <button
          onClick={onBack}
          className="font-condensed font-semibold text-[16px] tracking-[1.6px] uppercase text-teal active:opacity-60"
        >
          Back
        </button>
      </div>
    </div>
  )
}
