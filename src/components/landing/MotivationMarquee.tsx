const MESSAGE = "Nothing is impossible until you make it happen !!";

export default function MotivationMarquee() {
  return (
    <aside className="home-encouragement bg-white text-black px-5 py-4 text-center text-sm leading-relaxed no-print" aria-label="A little encouragement">
      <p>{MESSAGE}</p>
    </aside>
  );
}
