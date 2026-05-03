import ScreenHeader from '../components/ScreenHeader.jsx'

const TIMES = ['5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30']

export default function DeliveryDetailsScreen({
  doorNumber, onChangeDoor,
  selectedTime, onSelectTime,
  onContinue, onBack, onLogoPress,
}) {
  const canContinue = doorNumber.length > 0 && selectedTime

  const rows = []
  for (let i = 0; i < TIMES.length; i += 2) rows.push(TIMES.slice(i, i + 2))

  return (
    <div className="flex flex-col h-full bg-cream">
      <ScreenHeader title="Delivery Details" onLogoPress={onLogoPress} />

      <div className="flex-1 overflow-y-auto px-6 pt-6 flex flex-col gap-6">

        {/* Door number */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-condensed font-semibold text-crimson text-[14px] tracking-[1.8px] uppercase">
            Door Number
          </p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={doorNumber}
            onChange={e => onChangeDoor(e.target.value.replace(/\D/g, ''))}
            placeholder="00"
            className="w-[121px] h-[72px] bg-white border border-teal text-center font-condensed font-semibold text-[18px] tracking-[1.8px] text-teal placeholder:text-teal/20 focus:outline-none"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-teal" />

        {/* Time picker */}
        <div className="flex flex-col gap-3">
          <p className="font-condensed font-semibold text-crimson text-[14px] tracking-[1.8px] uppercase text-center">
            Delivery Time
          </p>
          <div className="flex flex-col gap-1">
            {rows.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map(time => {
                  const selected = selectedTime === time
                  return (
                    <button
                      key={time}
                      onClick={() => onSelectTime(time)}
                      className={`flex-1 py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase transition-colors ${selected ? 'bg-crimson text-cream' : 'bg-white text-teal active:bg-gray-100'}`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="h-2" />
      </div>

      <div className="shrink-0 flex flex-col gap-[10px] p-4 bg-cream">
        <button
          onClick={canContinue ? onContinue : undefined}
          className={`w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase text-cream transition-colors ${canContinue ? 'bg-crimson active:bg-crimson-dark' : 'bg-crimson-light'}`}
        >
          Continue to payment
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
