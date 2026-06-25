export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="soft-grid absolute inset-0 opacity-15" />
      <div className="relative text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
          <span className="text-3xl font-black">P</span>
        </div>
        <h1 className="mb-2 text-2xl font-black text-white">PinIt</h1>
        <p className="mb-5 text-sm text-slate-300">Preparing your workspace...</p>
        <div className="flex justify-center gap-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-cyan-400"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-orange-400" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
