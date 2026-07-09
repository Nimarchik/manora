const btnNo = document.getElementById('btn_no')
const btnYes = document.getElementById('btn_yes')
const container = document.querySelector('.content')
const message = document.getElementById('message')
const vis = document.querySelector('.text_content')


btnNo.addEventListener('mouseenter', () => {
  const maxX = container.clientWidth - btnNo.offsetWidth
  const maxY = container.clientHeight - btnNo.offsetHeight

  const x = Math.floor(Math.random() * maxX)
  const y = Math.floor(Math.random() * maxY)

  btnNo.style.position = 'fixed'
  btnNo.style.left = x + 'px'
  btnNo.style.top = y + 'px'
})

btnNo.addEventListener('click', () => {
  showMessage('Хуй тебе Жми ДА!')
  message.style.opacity = 1
})

btnYes.addEventListener('click', () => {
  showMessage('Шо да?) попробуй свой ответ)')
  message.style.opacity = 1
})

const inp = document.querySelector('.inp_text')
const wrongAnswer = [
  'Это что за ответ?',
  'Еще немного и получится)',
  "Снова мимо)",
  "Попробуй загуглить)",
  "Даже гугл не помог?",
  "Откуда такие ответы?"
]

function showMessage(text) {
  message.textContent = text;

  message.classList.remove("show");
  void message.offsetWidth; // перезапуск анимации
  message.classList.add("show");
}


function createMoon() {
  const moon = document.createElement("div");
  moon.classList.add("moon");
  moon.textContent = "❤";

  moon.style.left = Math.random() * window.innerWidth + "px";
  moon.style.fontSize = (20 + Math.random() * 40) + "px";
  moon.style.animationDuration = (3 + Math.random() * 4) + "s";

  document.getElementById("moon-container").appendChild(moon);

  setTimeout(() => {
    moon.remove();
  }, 7000);
}

function moonRain() {
  let count = 0;

  const interval = setInterval(() => {
    createMoon();
    count++;

    if (count >= 150) { // количество лун
      clearInterval(interval);
    }
  }, 100);
}

function checkAnswer() {
  inp.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      const answer = inp.value.trim().toLowerCase();

      if (answer === "настолько красивая, что умереть можно") {
        // message.textContent = `${inp.value} - это значит что наши чувства взаимны)`
        showMessage(`${inp.value} - это значит что наши чувства взаимны)`)
        moonRain();
        message.style.opacity = 1
        message.style.fontFamily = "Caveat", cursive;
      } else {
        const randomIn = Math.floor(Math.random() * wrongAnswer.length)
        // p.textContent = `${inp.value} -  ${showMessage(wrongAnswer[randomIn])}`
        showMessage(wrongAnswer[randomIn])
        message.style.opacity = 1
      }
    }
  })
}

inp.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

const moonAnimation = document.querySelector("#moonAnimation");
let text = document.querySelector('.text_contentSub')
let text1 = document.querySelector('.text_contentSub1')
let text2 = document.querySelector('.text_contentSub2')
let text3 = document.querySelector('.text_contentSub3')

vis.addEventListener('click', () => {
  text.classList.toggle('--active')
  text1.classList.toggle('--active1')
  text2.classList.toggle('--active2')
  text3.classList.toggle('--active3')

})



const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

// for intro motion
let mouseMoved = false;

const pointer = {
  x: .5 * window.innerWidth,
  y: .5 * window.innerHeight,
}
const params = {
  pointsNumber: 40,
  widthFactor: .3,
  mouseThreshold: .6,
  spring: .4,
  friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
  trail[i] = {
    x: pointer.x,
    y: pointer.y,
    dx: 0,
    dy: 0,
  }
}

window.addEventListener("click", e => {
  updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("mousemove", e => {
  mouseMoved = true;
  updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
  mouseMoved = true;
  updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
  pointer.x = eX;
  pointer.y = eY;
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);


function update(t) {

  // for intro motion
  if (!mouseMoved) {
    pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
    pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trail.forEach((p, pIdx) => {
    const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
    const spring = pIdx === 0 ? .4 * params.spring : params.spring;
    p.dx += (prev.x - p.x) * spring;
    p.dy += (prev.y - p.y) * spring;
    p.dx *= params.friction;
    p.dy *= params.friction;
    p.x += p.dx;
    p.y += p.dy;
  });

  ctx.lineCap = "round";
  ctx.strokeStyle = "#ffffff"; // Белый цвет
  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);

  for (let i = 1; i < trail.length - 1; i++) {
    const xc = .5 * (trail[i].x + trail[i + 1].x);
    const yc = .5 * (trail[i].y + trail[i + 1].y);
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
    ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
    ctx.stroke();
  }
  ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
  ctx.stroke();

  window.requestAnimationFrame(update);
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}