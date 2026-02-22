export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-ink/10 animate-ink-drop" />
        <div className="absolute inset-2 rounded-full bg-ink/15 animate-ink-drop [animation-delay:0.4s]" />
        <div className="absolute inset-4 rounded-full bg-ink/20 animate-ink-drop [animation-delay:0.8s]" />
      </div>
      <p className="text-ink/50 text-sm">
        Searching through classical poetry…
      </p>
    </div>
  );
}
