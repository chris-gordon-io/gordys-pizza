import ScreenHeader from '../components/ScreenHeader.jsx'

const PIZZAS = {
  margherita:        { name: 'Margherita',         ingredients: 'Tomato, Mozzarella',                          price: 6 },
  appleWalnut:       { name: 'Apple and Walnut',   ingredients: 'Apple, blue cheese, Crushed walnuts',         price: 8 },
  balsamicMushrooms: { name: 'Balsamic Mushrooms', ingredients: 'Balsamic mushrooms, Tallegio, Lemon thyme',   price: 7 },
  spud:              { name: 'Hot Potato',          ingredients: 'Potato, Rosemary, Chilli',                    price: 7 },
}

export default function OrderSummaryScreen({ quantities, onPayPaypal, onPayCash, onCancel, onLogoPress }) {
  const orderedItems = Object.entries(quantities).filter(([, qty]) => qty > 0)
  const total = orderedItems.reduce((sum, [id, qty]) => sum + PIZZAS[id].price * qty, 0)
  const totalStr = `£${total.toFixed(2)}`

  return (
    <div className="flex flex-col h-full bg-cream">
      <ScreenHeader title="Your order" onLogoPress={onLogoPress} />

      <div className="flex-1 overflow-y-auto px-6 pt-6 flex flex-col gap-6">
        {orderedItems.map(([id, qty]) => (
          <div key={id} className="flex flex-col gap-2 w-full shrink-0">
            <div className="flex items-start gap-3">
              <p className="flex-1 font-condensed font-semibold text-[#0e2c35] text-[20px] tracking-[2px] leading-[28px] uppercase">
                {qty > 1 ? `${qty}× ${PIZZAS[id].name}` : PIZZAS[id].name}
              </p>
              <p className="font-condensed font-semibold text-teal text-[20px] tracking-[2px] leading-[28px] shrink-0">
                £{PIZZAS[id].price * qty}
              </p>
            </div>
            <p className="font-body text-teal text-[14px] tracking-[0.14px]">
              {PIZZAS[id].ingredients}
            </p>
          </div>
        ))}
        <div className="h-2" />
      </div>

      <div className="shrink-0 flex flex-col gap-[10px] p-4 bg-cream">
        <button
          onClick={() => {
            const url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=c.p.gordon%40me.com&amount=${total.toFixed(2)}&currency_code=GBP&item_name=Gordy%27s+Pizza`
            window.open(url, '_blank')
            onPayPaypal()
          }}
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
