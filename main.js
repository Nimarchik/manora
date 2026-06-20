const btnNo = document.getElementById('btn_no')
const btnYes = document.getElementById('btn_yes')
const container = document.querySelector('.content')
const message = document.getElementById('message')


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

function checkAnswer() {
  inp.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      const answer = inp.value.trim().toLowerCase();

      if (answer === "настолько красивая, что умереть можно") {
        // message.textContent = `${inp.value} - это значит что наши чувства взаимны)`
        showMessage(`${inp.value} - это значит что наши чувства взаимны)`)
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
