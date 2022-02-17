const constellation_canvas = document.getElementById('canvas');
const constellation_ctx = constellation_canvas.getContext('2d');
constellation_canvas.width = innerWidth;
constellation_canvas.height = innerHeight;

class Particle {
  constructor(x, y, xv, yv, r) {
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.r = r;
  }
  update() {
    if (this.x < 0 + this.r) {
      this.x = 0 + this.r;
      this.xv = -this.xv;
    } else if (this.x > constellation_canvas.width - this.r) {
      this.x = constellation_canvas.width - this.r;
      this.xv = -this.xv;
    }
    if (this.y < 0 + this.r) {
      this.y = 0 + this.r;
      this.yv = -this.yv;
    } else if (this.y > constellation_canvas.height - this.r) {
      this.y = constellation_canvas.height - this.r;
      this.yv = -this.yv;
    }
    this.x += this.xv;
    this.y += this.yv;
    this.draw();
  }
  draw() {
    constellation_ctx.fillStyle = "#fff";
    constellation_ctx.beginPath();
    constellation_ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    constellation_ctx.fill();
    constellation_ctx.closePath();
  }
}

let num = constellation_canvas.width * constellation_canvas.height / 12000;
let pA = [];

function init() {
  for (let i = 0; i < num; i++) {
    const x = Math.random() * constellation_canvas.width;
    const y = Math.random() * constellation_canvas.height;
    const xv = Math.random() * 4 - 2;
    const yv = Math.random() * 4 - 2;
    const r = Math.random() * 3 + 2;

    pA.push(new Particle(x, y, xv, yv, r));
  }
}

function connect() {
  let o = 1;
  for (const a of pA) {
    for (const b of pA) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        o = 1 - (d / 100);
        constellation_ctx.strokeStyle = `rgba(250, 250, 250, ${o})`;
        constellation_ctx.lineWidth = 1;
        constellation_ctx.beginPath();
        constellation_ctx.moveTo(a.x, a.y);
        constellation_ctx.lineTo(b.x, b.y);
        constellation_ctx.closePath();
        constellation_ctx.stroke();
      }
    }
  }
}

function animate() {
  constellation_ctx.clearRect(0, 0, constellation_canvas.width, constellation_canvas.height);

  for (let i = 0; i < pA.length; i++) {
    pA[i].update();
  }

  connect();

  requestAnimationFrame(animate);
}

init();
requestAnimationFrame(animate);

window.addEventListener('resize', function (e) {
  constellation_canvas.width = innerWidth;
  constellation_canvas.height = innerHeight;
  pA = [];
  num = constellation_canvas.width * constellation_canvas.height / 9000;
  init();
});
