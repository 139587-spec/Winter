const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const snowImg = new Image();
snowImg.src = "snowflake.png";

let particles = [];
const particleCount = 80;
const speed = { x: 0, y: 1 };

function makeParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 20,
      scale: Math.random() * 0.6 + 0.4,
      flipX: Math.random() < 0.5 ? 1 : -1,
      flipY: Math.random() < 0.5 ? 1 : -1,
      offset: Math.random() * 1000
    });
  }
}
makeParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(p.flipX * p.scale, p.flipY * p.scale);

    const maxSize = 80;
    const s = p.scale * (maxSize / Math.max(snowImg.naturalWidth, snowImg.naturalHeight));

    ctx.globalAlpha = 0.7;
    ctx.drawImage(
      snowImg,
      -snowImg.naturalWidth / 2,
      -snowImg.naturalHeight / 2,
      snowImg.naturalWidth * s,
      snowImg.naturalHeight * s
    );
    ctx.globalAlpha = 1;
    ctx.restore();

    p.x += speed.x;
    p.y += speed.y;

    if (p.y > canvas.height + 40) p.y = -40;
    if (p.x > canvas.width + 40) p.x = -40;
    if (p.x < -40) p.x = canvas.width + 40;
  }

  requestAnimationFrame(animateParticles);
}

snowImg.onload = () => {
  animateParticles();
};