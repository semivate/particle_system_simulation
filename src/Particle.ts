import { Graphics } from "pixi.js";

export class Particle extends Graphics {
  vx = 0;
  vy = 0;

  private orbitAngle: number;
  private maxSpeed: number;
  private maxForce: number;
  private personalDrag: number;

  constructor() {
    super();

    this.circle(0, 0, 3);
    this.fill(0xffffff);

    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;

    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;

    this.orbitAngle = Math.random() * Math.PI * 2;

    this.maxSpeed = 10 + Math.random() * 5;
    this.maxForce = 0.3 + Math.random() * 0.3;
    this.personalDrag = 0.88 + Math.random() * 0.03;
  }

  pulse(clickX: number, clickY: number) {
    const dx = this.x - clickX;
    const dy = this.y - clickY;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

    this.vx += (dx / distance) * 45;
    this.vy += (dy / distance) * 45;
  }

  update(
    screenWidth: number,
    screenHeight: number,
    mouseX: number,
    mouseY: number,
    isMouseActive: boolean,
  ) {
    if (isMouseActive) {
      const fromMouseDx = this.x - mouseX;
      const fromMouseDy = this.y - mouseY;
      const distanceToMouse =
        Math.sqrt(fromMouseDx * fromMouseDx + fromMouseDy * fromMouseDy) || 1;

      const progress = (Date.now() * 0.001) % 1;
      const dynamicRadius = 180 - progress * 100;

      if (distanceToMouse < dynamicRadius) {
        const evadePush = (dynamicRadius - distanceToMouse) * 0.15;
        this.vx += (fromMouseDx / distanceToMouse) * evadePush;
        this.vy += (fromMouseDy / distanceToMouse) * evadePush;
      }

      const targetX = mouseX + Math.cos(this.orbitAngle) * dynamicRadius;
      const targetY = mouseY + Math.sin(this.orbitAngle) * dynamicRadius;

      const desiredX = targetX - this.x;
      const desiredY = targetY - this.y;
      const distanceToTarget =
        Math.sqrt(desiredX * desiredX + desiredY * desiredY) || 1;

      let speed = this.maxSpeed;
      if (distanceToTarget < 40) {
        speed = (distanceToTarget / 40) * this.maxSpeed;
      }

      const desiredVx = (desiredX / distanceToTarget) * speed;
      const desiredVy = (desiredY / distanceToTarget) * speed;

      let steerX = desiredVx - this.vx;
      let steerY = desiredVy - this.vy;

      const steerMag = Math.sqrt(steerX * steerX + steerY * steerY) || 1;
      if (steerMag > this.maxForce) {
        steerX = (steerX / steerMag) * this.maxForce;
        steerY = (steerY / steerMag) * this.maxForce;
      }

      this.vx += steerX;
      this.vy += steerY;

      this.vx += (Math.random() - 0.5) * 1.4;
      this.vy += (Math.random() - 0.5) * 1.4;

      this.vx *= this.personalDrag;
      this.vy *= this.personalDrag;
    } else {
      this.vx *= 0.98;
      this.vy *= 0.98;
    }

    this.x += this.vx;
    this.y += this.vy;

    const radius = 3;

    const bounceElasticity = 0.8;

    if (this.x < radius) {
      this.x = radius;
      this.vx = -this.vx * bounceElasticity;
    } else if (this.x > screenWidth - radius) {
      this.x = screenWidth - radius;
      this.vx = -this.vx * bounceElasticity;
    }

    if (this.y < radius) {
      this.y = radius;
      this.vy = -this.vy * bounceElasticity;
    } else if (this.y > screenHeight - radius) {
      this.y = screenHeight - radius;
      this.vy = -this.vy * bounceElasticity;
    }
  }
}
