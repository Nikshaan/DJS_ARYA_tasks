const pomoTime = document.getElementById('time');
const work = document.getElementById('work');
const shortBreak = document.getElementById('shortBreak');
const longBreak = document.getElementById('longBreak');
const stopBtn = document.getElementById('stop');

modeSeconds = {'work' : 1500, 'shortBreak' : 300, 'longBreak' : 600, 'wait' : 0};

let timer;
let currMode = 'wait';

const updateTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    pomoTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const setTimer = (mode) => {
    currMode = mode;
    let time = modeSeconds[mode] + 1;
    clearInterval(timer);

    timer = setInterval(() => {
        time -= 1;
        updateTimer(time);

        if (time <= 0) {
            clearInterval(timer);
            if(currMode != 'wait') alert("Time is up!");
        }
    }, 1000);
}

work.addEventListener('click', () => setTimer('work'));
shortBreak.addEventListener('click', () => setTimer('shortBreak'));
longBreak.addEventListener('click', () => setTimer('longBreak'));
stopBtn.addEventListener('click', () => setTimer('wait'));

setTimer(currMode);