/**
 * Placeholder home screen — shows after the splash finishes.
 * We'll replace this with the next design you share.
 */
export default function HomeScreen({ onRestart }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
      <h1 className="font-display text-3xl text-crimson">Welcome to Gordy's</h1>
      <p className="max-w-sm text-sm text-stone-600">
        This is a placeholder. Send me the next screen design and I'll build it.
      </p>
      <button
        onClick={onRestart}
        className="rounded-full border border-crimson px-5 py-2 text-sm font-medium text-crimson transition hover:bg-crimson hover:text-cream"
      >
        Replay splash
      </button>
    </div>
  )
}
