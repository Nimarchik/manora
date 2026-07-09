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



