import logo from '../assets/logo.png'

export default function GordysLogo({ className = '', ...props }) {
  return (
    <img
      src={logo}
      alt="Gordy's"
      className={className}
      {...props}
    />
  )
}
