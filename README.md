[ua](./README.uk.md)

# Particle System Simulation

### [Live Demo](https://semivate.github.io/particle_system_simulation/)

![Gameplay](./public/assets/particlesystem.gif)

An interactive simulation of a self-organizing particle system built using the Pixi.js graphics engine. The project implements a physical model of particle behavior. It was created as a hands-on educational experiment for exploring mathematical models in web graphics.

---

## Features

- **Adaptive rendering:** Automatic scaling to fit the browser window; enabled anti-aliasing ensures high-quality subpixel rendering of particles.
- **Synchronized game loop:** Physics calculations and graphics updates are fully synchronized with the user’s screen refresh rate. At each frame, the system centrally reads the current work area dimensions and cursor coordinates, then passes this data to objects for isolated recalculation of their motion.
- **Global mouse tracking:** The system tracks the cursor’s position. When the mouse leaves the window’s boundaries, particles automatically switch to decay mode.

## Physics and Architecture

- In the simulator, unique physical parameters are assigned to each particle using linear interpolation of random numbers, where the initial velocity is calculated as:
  $$
  \Delta v = (\text{Math.random()} - 0.5) \cdot 4
  $$
- When the screen is tapped, a pulse is generated that pushes the particles away from the center. The direction is given by the unit vector $\vec{u} = \left( \frac{\Delta x}{d}, \frac{\Delta y}{d} \right)$ over the distance $d = \sqrt{\Delta x^2 + \Delta y^2}$, and the new velocity is equal to:
  $$
  \vec{v}_{\text{new}} = \vec{v}_{\text{old}} + \vec{u} \cdot 45
  $$
- When the mouse is active, the interaction area changes cyclically over time. Due to the sawtooth-like time function $\text{progress} = (\text{Date.now()} \cdot 0.001) \pmod 1$, the dynamic radius pulsates according to the formula:
  $$
  R_{\text{dynamic}} = 180 - \text{progress} \cdot 100
  $$
- The particles attempt to position themselves in a circle around the mouse, following the concept of Steering Behaviors. The target position is calculated as $x_{\text{target}} = x_{\text{mouse}} + \cos(\theta) \cdot R_{\text{dynamic}}$, and the steering force is limited by the parameter $F_{\text{max}}$:
  $$
  \vec{F}_{\text{steer}} = \frac{\vec{v}_{\text{desired}} - \vec{v}_{\text{current}}}{|\vec{v}_{\text{desired}} - \vec{v}_{\text{current}}|} \cdot F_{\text{max}}
  $$
- Upon hitting the edge of the screen, the velocity vector along the corresponding axis is inverted and multiplied by the bounce coefficient $k_{\text{bounce}} = 0.8$, simulating a 20% loss of kinetic energy:
  $$
  v_{\text{new}} = -v_{\text{old}} \cdot 0.8
  $$

---

## Technologies Used

- **TypeScript**
- **Vite**
- **Pixi.js (v8)**
- **@pixi/devtools**
- **HTML5 Canvas**

---

## Preview

![Gameplay](./public/assets/image.png)
