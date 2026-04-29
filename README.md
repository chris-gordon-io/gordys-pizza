# Gordy's

A React + Vite + Tailwind app, built screen by screen from the Figma designs.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Structure

- `src/App.jsx` — top-level screen router (local state, no backend yet)
- `src/screens/SplashScreen.jsx` — animated GORDY'S wordmark
- `src/screens/HomeScreen.jsx` — placeholder, replace with next design
- `tailwind.config.js` — color tokens (`cream`, `crimson`) and font families

## Notes

- The splash auto-advances after ~2.6s. Tap or press any key to skip.
- The logo font is currently `Alfa Slab One` from Google Fonts as a stand-in.
  Swap to your real logo font (or use an SVG export of the actual mark) when ready.
