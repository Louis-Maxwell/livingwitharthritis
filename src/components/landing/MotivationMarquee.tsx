import { useState } from "react";

const MESSAGE = "Nothing is impossible until you make it happen !!";

export default function MotivationMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="motivation-marquee no-print" aria-label="A little encouragement">
      <p className="sr-only">{MESSAGE}</p>
      <div className="motivation-marquee__viewport" aria-hidden="true">
        <div className="motivation-marquee__track" style={{ animationPlayState: paused ? "paused" : "running" }}>
          {[0, 1].map((group) => (
            <div className="motivation-marquee__group" key={group}>
              {[0, 1, 2].map((item) => (
                <span className="motivation-marquee__message" key={item}>{MESSAGE}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="motivation-marquee__toggle"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? "Resume scrolling message" : "Pause scrolling message"}
      >
        {paused ? "Play" : "Pause"}
      </button>
    </section>
  );
}
