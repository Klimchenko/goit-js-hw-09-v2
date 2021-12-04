const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', () => {
    refs.startBtn.setAttribute("disabled", true)
    onStart = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}),
    refs.stopBtn.addEventListener('click', () => {
        clearInterval(onStart),
            refs.startBtn.removeAttribute("disabled")
    })
