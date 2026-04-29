import { useEffect, useState } from 'react'
import SplashScreen from './screens/SplashScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import DoorNumberScreen from './screens/DoorNumberScreen.jsx'
import TimeScreen from './screens/TimeScreen.jsx'
import OrderSummaryScreen from './screens/OrderSummaryScreen.jsx'

const INITIAL_QUANTITIES = {
  margherita: 0,
  appleWalnut: 0,
  balsamicMushrooms: 0,
  spud: 0,
}

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [quantities, setQuantities] = useState(INITIAL_QUANTITIES)
  const [doorNumber, setDoorNumber] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)

  useEffect(() => {
    if (screen !== 'splash') return
    const t = setTimeout(() => setScreen('order'), 2600)
    return () => clearTimeout(t)
  }, [screen])

  function handleChangeQty(id, qty) {
    setQuantities(prev => ({ ...prev, [id]: qty }))
  }

  function handleCancel() {
    setQuantities(INITIAL_QUANTITIES)
    setDoorNumber('')
    setSelectedTime(null)
    setScreen('order')
  }

  return (
    <div className="h-full w-full bg-cream overflow-hidden">
      {screen === 'splash' && (
        <SplashScreen onDone={() => setScreen('order')} />
      )}
      {screen === 'order' && (
        <OrderScreen
          quantities={quantities}
          onChangeQty={handleChangeQty}
          onContinue={() => setScreen('door-number')}
        />
      )}
      {screen === 'door-number' && (
        <DoorNumberScreen
          doorNumber={doorNumber}
          onChangeDoor={setDoorNumber}
          onContinue={() => setScreen('time')}
          onBack={() => setScreen('order')}
        />
      )}
      {screen === 'time' && (
        <TimeScreen
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          onContinue={() => setScreen('order-summary')}
          onBack={() => setScreen('door-number')}
        />
      )}
      {screen === 'order-summary' && (
        <OrderSummaryScreen
          quantities={quantities}
          onPayPaypal={() => alert('PayPal Link — coming soon!')}
          onPayCash={() => alert('Cash payment confirmed!')}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
