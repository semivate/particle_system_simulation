import { Application } from "pixi.js";
import { Particle } from "./Particle";
import { initDevtools } from "@pixi/devtools";

(async () => {
  const app = new Application();

  await app.init({
    background: "#17161a",
    resizeTo: window,
    antialias: true,
  });

  initDevtools({ app });

  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const mouse = {
    x: 0,
    y: 0,
    active: false,
  };

  const particles: Particle[] = [];

  for (let i = 0; i < 200; i++) {
    const particle = new Particle();
    particles.push(particle);
    app.stage.addChild(particle);
  }

  app.ticker.add(() => {
    for (const particle of particles) {
      particle.update(
        app.screen.width,
        app.screen.height,
        mouse.x,
        mouse.y,
        mouse.active,
      );
    }
  });

  const deactivateMouse = () => {
    mouse.active = false;
  };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.active = true;
  });

  window.addEventListener("click", (event) => {
    for (const particle of particles) {
      particle.pulse(event.clientX, event.clientY);
    }
  });

  document.body.addEventListener("pointerleave", deactivateMouse);
  window.addEventListener("blur", deactivateMouse);
})();
