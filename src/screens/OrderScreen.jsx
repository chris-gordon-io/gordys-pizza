import ScreenHeader from '../components/ScreenHeader.jsx'

const PIZZAS = [
  { id: 'margherita', name: 'Margherita', ingredients: 'San marzano tomato, fior di latte, fresh basil' },
  { id: 'appleWalnut', name: 'Apple and Walnut', ingredients: 'Apple, blue cheese, crushed walnuts' },
  { id: 'balsamicMushrooms', name: 'Balsamic Mushrooms', ingredients: 'Mixed mushrooms, balsamic reduction, fresh thyme' },
  { id: 'spud', name: 'Hot potato', ingredients: 'Potato, rosemary, chilli' },
]

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  )
}

function Counter({ count, onDecrement, onIncrement }) {
  return (
    <div className="flex items-center shrink-0">
      <button
        onClick={onDecrement}
        disabled={count === 0}
        className="bg-white flex items-center justify-center w-10 h-10 text-teal disabled:opacity-30 active:bg-gray-100"
        aria-label="Remove one"
      >
        <MinusIcon />
      </button>
      <div className="w-10 h-10 flex items-center justify-center">
        <span className={`font-condensed font-semibold text-[24px] tracking-[2.4px] text-teal ${count === 0 ? 'opacity-20' : ''}`}>
          {count}
        </span>
      </div>
      <button
        onClick={onIncrement}
        className="bg-white flex items-center justify-center w-10 h-10 text-teal active:bg-gray-100"
        aria-label="Add one"
      >
        <PlusIcon />
      </button>
    </div>
  )
}

function PizzaCard({ pizza, count, onDecrement, onIncrement }) {
  return (
    <div className="flex gap-6 items-center pb-6 border-b border-teal-mid w-full shrink-0">
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="font-condensed font-semibold text-teal text-[24px] tracking-[2.4px] leading-[28px] uppercase">
          {pizza.name}
        </p>
        <p className="font-body text-teal-mid text-[14px] tracking-[0.14px]">
          {pizza.ingredients}
        </p>
      </div>
      <Counter count={count} onDecrement={onDecrement} onIncrement={onIncrement} />
    </div>
  )
}

export default function OrderScreen({ quantities, onChangeQty, onContinue }) {
  const hasItems = Object.values(quantities).some(q => q > 0)

  return (
    <div className="flex flex-col h-full bg-cream">
      <ScreenHeader title="Choose your Pizza ('s)" />
      <div className="flex-1 overflow-y-auto px-6 pt-6 flex flex-col gap-6">
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
