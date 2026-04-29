import ScreenHeader from '../components/ScreenHeader.jsx'

const TIMES = ['5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30']

export default function TimeScreen({ selectedTime, onSelectTime, onContinue, onBack }) {
  const rows = []
  for (let i = 0; i < TIMES.length; i += 2) {
    rows.push(TIMES.slice(i, i + 2))
  }

  return (
    <div className="flex flex-col h-full bg-cream">
      <ScreenHeader title="Tell me when you want them/it" />

      <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto">
        <div className="flex flex-col gap-1 w-full">
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

      <div className="shrink-0 flex flex-col gap-[10px] p-4 bg-cream">
        <button
          onClick={selectedTime ? onContinue : undefined}
          className={`w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase ${selectedTime ? 'bg-crimson text-cream active:bg-crimson-dark' : 'bg-crimson-light text-cream'}`}
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
