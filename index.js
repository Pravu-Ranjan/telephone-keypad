let button = document.querySelectorAll('button')
let input = document.getElementById('input-box')
let busy = true
let hold
let is_busy
let delay = 500
let change = -1
let click = null
for (let i = 0; i < button.length; ++i) {
  button[i].onmousedown = function (e) {
    var text = button[i].getAttribute('data-text').split(''),
      number = button[i].getAttribute('data-number')
    busy = true
    clearTimeout(is_busy)
    if (click !== e.target) {
      busy = false
    }
    if (change >= text.length - 1 || click !== e.target) {
      change = 0
      click = e.target
    } else {
      change = change + 1
    }
    hold = setTimeout(function () {
      input.value = input.value.slice(0, -1) + number
    }, delay)
    input.value = busy
      ? input.value.slice(0, -1) + text[change]
      : input.value + text[change]
  }
  button[i].onmouseup = function (e) {
    clearTimeout(hold)
    busy = true
    is_busy = setTimeout(function () {
      change = -1
      busy = false
      e.target = null
    }, delay)
    input.focus()
    input.selectionStart = input.selectionEnd = input.value.length
  }
}
