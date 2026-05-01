import ScreenHeader from '../components/ScreenHeader.jsx'

export default function DoorNumberScreen({ doorNumber, onChangeDoor, onContinue, onBack, onLogoPress }) {
  const hasNumber = doorNumber.length > 0

  return (
    <div className="flex flex-col h-full bg-cream">
      <ScreenHeader title="Tell me your door number" onLogoPress={onLogoPress} />

      <div className="flex-1 flex items-center justify-center">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={doorNumber}
          onChange={e => onChangeDoor(e.target.value.replace(/\D/g, ''))}
          placeholder="00"
          className="w-[121px] h-[120px] bg-white border border-teal text-center font-condensed font-semibold text-[36px] tracking-[3.6px] uppercase text-teal placeholder:text-teal/20 focus:outline-none"
        />
      </div>

      <div className="shrink-0 flex flex-col gap-[10px] p-4 bg-cream">
        <button
          onClick={hasNumber ? onContinue : undefined}
          className={`w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase ${hasNumber ? 'bg-crimson text-cream active:bg-crimson-dark' : 'bg-crimson-light text-cream'}`}
        >
          Continue to delivery time
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase border border-teal text-teal active:bg-teal/5"
        >
          Back
        </button>
      </div>
    </div>
  )
}
