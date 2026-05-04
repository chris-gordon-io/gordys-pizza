import { useEffect, useState } from 'react'
import SplashScreen from './screens/SplashScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import DeliveryDetailsScreen from './screens/DeliveryDetailsScreen.jsx'
import OrderSummaryScreen from './screens/OrderSummaryScreen.jsx'
import AdminLoginScreen from './screens/AdminLoginScreen.jsx'
import AdminScreen from './screens/AdminScreen.jsx'
import OrderConfirmedScreen from './screens/OrderConfirmedScreen.jsx'

const INITIAL_QUANTITIES = {
  margherita: 0,
  appleWalnut: 0,
  balsamicMushrooms: 0,
  spud: 0,
}

function saveOrder(order) {
  const existing = JSON.parse(localStorage.getItem('gordys_orders') || '[]')
  existing.push(order)
  localStorage.setItem('gordys_orders', JSON.stringify(existing))
}

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [quantities, setQuantities] = useState(INITIAL_QUANTITIES)
  const [doorNumber, setDoorNumber] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)
  const [prevScreen, setPrevScreen] = useState(null)

  useEffect(() => {
    if (screen !== 'splash') return
    const t = setTimeout(() => setScreen('order'), 3000)
    return () => clearTimeout(t)
  }, [screen])

  function handleChangeQty(id, qty) {
    setQuantities(prev => ({ ...prev, [id]: qty }))
  }

  function handleCancel() {
    setQuantities(INITIAL_QUANTITIES)
    setDoorNumber('')
    setSelectedTime(null)
    setScreen('splash')
  }

  function handleLogoPress() {
    setPrevScreen(screen)
    setScreen('admin-login')
  }

  function handlePay(method) {
    saveOrder({
      quantities,
      doorNumber,
      deliveryTime: selectedTime,
      paymentMethod: method,
      placedAt: Date.now(),
    })
    setScreen('order-confirmed')
  }

  const logoPress = screen === 'admin-login' || screen === 'admin' ? undefined : handleLogoPress

  return (
    <div className="h-full w-full bg-cream overflow-hidden">
      {screen === 'splash' && (
        <SplashScreen onDone={() => setScreen('order')} />
      )}
      {screen === 'order' && (
        <OrderScreen
          quantities={quantities}
          onChangeQty={handleChangeQty}
          onContinue={() => setScreen('delivery')}
          onLogoPress={logoPress}
        />
      )}
      {screen === 'delivery' && (
        <DeliveryDetailsScreen
          doorNumber={doorNumber}
          onChangeDoor={setDoorNumber}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onContinue={() => setScreen('order-summary')}
          onBack={() => setScreen('order')}
          onLogoPress={logoPress}
        />
      )}
      {screen === 'order-summary' && (
        <OrderSummaryScreen
          quantities={quantities}
          deliveryTime={selectedTime}
          onPayPaypal={() => handlePay('paypal')}
          onPayCash={() => handlePay('cash')}
          onCancel={handleCancel}
          onLogoPress={logoPress}
        />
      )}
      {screen === 'admin-login' && (
        <AdminLoginScreen
          onLogin={() => setScreen('admin')}
          onBack={() => setScreen(prevScreen || 'order')}
        />
      )}
      {screen === 'admin' && (
        <AdminScreen
          onLogout={() => setScreen('order')}
        />
      )}
      {screen === 'order-confirmed' && (
        <OrderConfirmedScreen
          onHome={() => { handleCancel(); setScreen('splash') }}
        />
      )}
    </div>
  )
}
