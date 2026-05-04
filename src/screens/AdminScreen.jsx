import { useState } from 'react'
import GordysLogo from '../components/GordysLogo.jsx'

const PIZZA_NAMES = {
  margherita: 'Margherita',
  appleWalnut: 'Apple and Walnut',
  balsamicMushrooms: 'Balsamic Mushrooms',
  spud: 'Hot Potato',
}

const PIZZA_PRICES = {
  margherita: 6,
  appleWalnut: 8,
  balsamicMushrooms: 7,
  spud: 7,
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function AdminScreen({ onLogout }) {
  const [orders, setOrders] = useState(() => {
    const raw = localStorage.getItem('gordys_orders')
    return raw ? JSON.parse(raw) : []
  })
  const [deliveryDate, setDeliveryDate] = useState(
    () => localStorage.getItem('gordys_delivery_date') || ''
  )
  const sorted = [...orders].reverse()

  function handleClearOrders() {
    localStorage.removeItem('gordys_orders')
    setOrders([])
  }

  function handleSetDate(val) {
    setDeliveryDate(val)
    if (val) localStorage.setItem('gordys_delivery_date', val)
    else localStorage.removeItem('gordys_delivery_date')
  }

  return (
    <div className="flex flex-col h-full bg-cream">
      <div className="flex flex-col gap-6 items-center justify-center py-6 bg-cream shrink-0">
        <GordysLogo className="w-[78px] h-auto" />
        <p className="font-condensed font-semibold text-crimson text-[18px] text-center tracking-[1.8px] uppercase leading-none">
          Orders
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-6 pb-6">
        {/* Delivery date setter */}
        <div className="flex flex-col gap-2 pb-6 border-b border-teal">
          <p className="font-condensed font-semibold text-crimson text-[13px] tracking-[2px] uppercase">Delivery date</p>
          <input
            type="date"
            value={deliveryDate}
            onChange={e => handleSetDate(e.target.value)}
            className="w-full border border-teal bg-white px-3 py-2 font-body text-teal text-[16px] focus:outline-none"
          />
          {deliveryDate && (
            <button
              onClick={() => handleSetDate('')}
              className="self-start font-condensed text-[13px] tracking-[1.4px] uppercase text-teal/50 active:opacity-60"
            >
              Clear date
            </button>
          )}
        </div>

        {sorted.length === 0 && (
          <p className="font-body text-teal/50 text-[14px] text-center pt-12">No orders yet</p>
        )}
        {sorted.map((order, i) => {
          const items = Object.entries(order.quantities).filter(([, q]) => q > 0)
          const total = items.reduce((s, [id, q]) => s + PIZZA_PRICES[id] * q, 0)
          return (
            <div key={i} className="flex flex-col gap-2 pb-6 border-b border-teal">
              <div className="flex items-center justify-between">
                <span className="font-condensed font-semibold text-[#0e2c35] text-[20px] tracking-[2px] uppercase">
                  Door {order.doorNumber}
                </span>
                <span className="font-condensed font-semibold text-teal text-[16px] tracking-[1.6px] uppercase">
                  {order.deliveryTime} · {formatDate(order.placedAt)}
                </span>
              </div>
              {items.map(([id, qty]) => (
                <div key={id} className="flex justify-between">
                  <span className="font-body text-teal text-[14px]">
                    {qty > 1 ? `${qty}× ` : ''}{PIZZA_NAMES[id]}
                  </span>
                  <span className="font-body text-teal text-[14px]">
                    £{PIZZA_PRICES[id] * qty}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-1">
                <span className="font-condensed font-semibold text-teal text-[16px] tracking-[1.6px] uppercase">
                  {order.paymentMethod === 'paypal' ? 'PayPal' : 'Cash'}
                </span>
                <span className="font-condensed font-semibold text-teal text-[16px] tracking-[1.6px]">
                  £{total}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="shrink-0 flex flex-col gap-3 p-4">
        {orders.length > 0 && (
          <button
            onClick={handleClearOrders}
            className="w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase border border-crimson text-crimson active:bg-crimson/5"
          >
            Clear orders
          </button>
        )}
        <button
          onClick={onLogout}
          className="w-full py-3 font-condensed font-semibold text-[18px] tracking-[1.8px] uppercase border border-teal text-teal active:bg-teal/5"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
