const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Particle {
  constructor (x, y, xv, yv, r) {
    this.x = x;
    this.y = y;    
    this.xv = xv;    
    this.yv = yv;    
    this.r = r;    
  }
  update () {
    if (this.x < 0 + this.r) {
      this.x = 0 + this.r;
      this.xv = -this.xv;
    } else if (this.x > canvas.width - this.r) {
      this.x = canvas.width - this.r;
      this.xv = -this.xv;
    }
    if (this.y < 0 + this.r) {
      this.y = 0 + this.r;
      this.yv = -this.yv;
    } else if (this.y > canvas.height - this.r) {
      this.y = canvas.height - this.r;
      this.yv = -this.yv;
    }
    this.x += this.xv;
    this.y += this.yv;
    this.draw();
  }
  draw() {
    ctx.fillStyle = "#006992";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}

let num = canvas.width * canvas.height / 12000;
let pA = [];

function init() {
  for (let i = 0; i < num; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const xv = Math.random() * 4 - 2;
    const yv = Math.random() * 4 - 2;
    const r = Math.random() * 2 + 2;
    
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
        ctx.strokeStyle = `rgba(0, 105, 146, ${o})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
}      

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < pA.length; i++) {
    pA[i].update();
  }
  
  connect();
  
  requestAnimationFrame(animate);
}

init();
requestAnimationFrame(animate);

window.addEventListener('resize', function (e) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  pA = [];
  num = canvas.width * canvas.height / 9000;
  init();
});
