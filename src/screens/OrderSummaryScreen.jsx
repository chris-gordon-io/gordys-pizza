import ScreenHeader from '../components/ScreenHeader.jsx'

const PIZZAS = {
  margherita:        { name: 'Margherita',        ingredients: 'San marzano tomato, fior di latte, fresh basil', price: 7 },
  appleWalnut:       { name: 'Apple and Walnut',  ingredients: 'Apple, blue cheese, crushed walnuts',            price: 9 },
  balsamicMushrooms: { name: 'Balsamic Mushrooms',ingredients: 'Mixed mushrooms, balsamic reduction, fresh thyme', price: 8 },
  spud:              { name: 'Hot Potato',         ingredients: 'Potato, rosemary, chilli',                       price: 8 },
}

export default function OrderSummaryScreen({ quantities, onPayPaypal, onPayCash, onCancel }) {
  const orderedItems = Object.entries(quantities).filter(([, qty]) => qty > 0)
  const total = orderedItems.reduce((sum, [id, qty]) => sum + PIZZAS[id].price * qty, 0)
  const totalStr = `£${total.toFixed(2)}`

  return (
    <div className="flex flex-col h-full bg-cream">
      <ScreenHeader title="Your order" />

      <div className="flex-1 overflow-y-auto px-6 pt-6 flex flex-col gap-6">
        {orderedItems.map(([id, qty]) => (
          <div key={id} className="flex gap-6 items-center pb-6 border-b border-teal-mid w-full">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p className="font-condensed font-semibold text-teal text-[24px] tracking-[2.4px] leading-[28px] uppercase">
                {PIZZAS[id].name}
              </p>
              <p className="font-body text-teal-mid text-[14px] tracking-[0.14px]">
                {PIZZAS[id].ingredients}
              </p>
            </div>
            <span className="font-condensed font-semibold text-teal text-[24px] tracking-[2.4px] shrink-0">
              {qty}
            </span>
          </div>
        ))}
        <div className="h-2" />
      </div>

      <div className="shrink-0 flex flex-col gap-[10px] p-4 bg-cream">
        <button
          onClick={onPayPaypal}
          className="w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase bg-crimson text-cream active:bg-crimson-dark"
        >
          Pay {totalStr} with PayPal Link
        </button>
        <button
          onClick={onPayCash}
          className="w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase border border-teal text-teal active:bg-teal/5"
        >
          Pay {totalStr} with Cash
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase text-teal active:opacity-60"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
