import ScreenHeader from '../components/ScreenHeader.jsx'

function formatDeliveryDate(iso) {
  if (!iso) return null
  const d = new Date(iso + 'T12:00:00')
  const day = d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()
  const date = d.getDate()
  const n = date % 10, m = date % 100
  const suffix = m === 11 || m === 12 || m === 13 ? 'TH' : n === 1 ? 'ST' : n === 2 ? 'ND' : n === 3 ? 'RD' : 'TH'
  return `${day} ${date}${suffix}`
}

const PIZZAS = [
  { id: 'margherita',        name: 'Margherita',         ingredients: 'Tomato, Mozzarella',                          price: '£7' },
  { id: 'appleWalnut',       name: 'Apple and Walnut',   ingredients: 'Apple, blue cheese, Crushed walnuts',         price: '£9' },
  { id: 'balsamicMushrooms', name: 'Balsamic Mushrooms', ingredients: 'Balsamic mushrooms, Tallegio, Lemon thyme',   price: '£8' },
  { id: 'spud',              name: 'Hot Potato',         ingredients: 'Potato, Rosemary, Chilli',                    price: '£8' },
]

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  )
}

function Counter({ count, onDecrement, onIncrement }) {
  return (
    <div className="flex items-center shrink-0">
      {count > 0 && (
        <>
          <button
            onClick={onDecrement}
            className="bg-white flex items-center justify-center w-8 h-8 text-teal active:bg-gray-100"
            aria-label="Remove one"
          >
            <MinusIcon />
          </button>
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="font-condensed font-semibold text-[18px] tracking-[1.8px] text-teal">
              {count}
            </span>
          </div>
        </>
      )}
      <button
        onClick={onIncrement}
        className="bg-white flex items-center justify-center w-8 h-8 text-teal active:bg-gray-100"
        aria-label="Add one"
      >
        <PlusIcon />
      </button>
    </div>
  )
}

function PizzaCard({ pizza, count, onDecrement, onIncrement }) {
  return (
    <div className="flex flex-col gap-2 pb-6 border-b border-teal w-full shrink-0">
      <div className="flex items-start gap-3">
        <p className="flex-1 font-condensed font-semibold text-[#0e2c35] text-[20px] tracking-[2px] leading-[28px] uppercase">
          {pizza.name}
        </p>
        <p className="font-condensed font-semibold text-teal text-[20px] tracking-[2px] leading-[28px] shrink-0">
          {pizza.price}
        </p>
      </div>
      <div className="flex items-start gap-3">
        <p className="flex-1 font-body text-teal text-[14px] tracking-[0.14px]">
          {pizza.ingredients}
        </p>
        <Counter count={count} onDecrement={onDecrement} onIncrement={onIncrement} />
      </div>
    </div>
  )
}

export default function OrderScreen({ quantities, onChangeQty, onContinue, onLogoPress }) {
  const hasItems = Object.values(quantities).some(q => q > 0)
  const formattedDate = formatDeliveryDate(localStorage.getItem('gordys_delivery_date') || '')

  return (
    <div className="flex flex-col h-full bg-cream">
      <ScreenHeader title="Choose your Pizza(s)" onLogoPress={onLogoPress} />
      <div className={`flex-1 overflow-y-auto px-6 flex flex-col gap-6 ${formattedDate ? 'pt-0' : 'pt-6'}`}>
        {formattedDate && (
          <div className="flex items-center justify-center gap-2 -mt-4">
            <p className="font-condensed font-semibold text-[#0e2c35] text-[16px] tracking-[1.6px] uppercase">Delivery</p>
            <p className="font-condensed font-semibold text-[#0e2c35] text-[16px] tracking-[1.6px] uppercase">{formattedDate}</p>
          </div>
        )}
        {PIZZAS.map(pizza => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            count={quantities[pizza.id] ?? 0}
            onDecrement={() => onChangeQty(pizza.id, Math.max(0, (quantities[pizza.id] ?? 0) - 1))}
            onIncrement={() => onChangeQty(pizza.id, (quantities[pizza.id] ?? 0) + 1)}
          />
        ))}
        <div className="h-2" />
      </div>
      <div className="shrink-0 p-4 bg-cream">
        <button
          onClick={hasItems ? onContinue : undefined}
          className={`w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase text-cream transition-colors ${hasItems ? 'bg-crimson active:bg-crimson-dark' : 'bg-crimson-light'}`}
        >
          Continue to your details
        </button>
      </div>
    </div>
  )
}
