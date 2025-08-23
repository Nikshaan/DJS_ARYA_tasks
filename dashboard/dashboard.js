const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const list = document.getElementById('list'); 
const contributionsList = document.getElementById('contributionsList');
const itemType = document.getElementById('itemType');
const itemPrice = document.getElementById('itemPrice');
const addItemBtn = document.getElementById('addItemBtn');
const expensesTotal = document.getElementById('expensesTotal');
let expenses = {};

const todoList = () => {
    let todo = todoInput.value.trim();
    if(todo != "") {
        const div = document.createElement('div');
        const todoP = document.createElement('p');
        todoP.textContent = todo;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'deleteBtn';
        todoP.classList.add('todoP');
        div.classList.add('todoDiv');
        div.appendChild(todoP);
        div.appendChild(deleteBtn);
        list.appendChild(div);
        todoInput.value = "";
    }
}

addTodoBtn.addEventListener('click', todoList);

list.addEventListener('click', (e) => {
    const clickedOn = e.target;
    if(clickedOn.classList.contains('deleteBtn')) {
        const li = clickedOn.parentElement;
        list.removeChild(li);
    }
})

const getWeather = async() => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=06903f13e9d67d4a0331b604c9e5ee1c&q=mumbai";
    const response = await fetch(apiUrl);
    let data = await response.json();

    document.getElementById("feels").innerHTML = data.main.feels_like + " °C";
    document.getElementById("humidity").innerHTML = data.main.humidity + " %"; 
    document.getElementById("pressure").innerHTML = data.main.pressure + " Pa";
    document.getElementById("temp").innerHTML = data.main.temp + " °C";
    document.getElementById("overall").innerHTML = data.weather[0].description;
    document.getElementById("windSpeed").innerHTML = data.wind.speed + " km/h";

    const weatherIcon = document.getElementById("weatherIcon");

    if(data.weather[0].main == "Clear"){
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src="images/mist.png";
    }
    else if(data.weather[0].main == "Clouds"){
        weatherIcon.src="images/cloudy.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src="images/snow.png";
    }
}

getWeather();

const getGithubContributions = async() => {
    let lastContris = [];
    const apiUrl = "https://github-contributions-api.jogruber.de/v4/nikshaan?y=2025";
    const response = await fetch(apiUrl);
    let data = await response.json();
    let contributions = data.contributions;

    for(let i = 364; i >= 0; i--) {
        let contri = contributions[i];
        if(contri.count > 0){
            lastContris.push([contri.date, contri.count]);
        }
        if(lastContris.length == 10) break;
    }

    let k = 0;

    while (k != 10){
        const div = document.createElement('div');
        const contriP = document.createElement('p');
        contriP.textContent = `${lastContris[k][0]} : ${lastContris[k][1]}`;
        const progress = document.createElement('div');
        progress.classList.add('progress');

        if(lastContris > 10){
            progress.style.width = 100 + '%';
        } else {
            progress.style.width = lastContris[k][1]*10 + '%';
        }

        div.classList.add('contriDiv');
        div.appendChild(contriP);
        div.appendChild(progress);
        contributionsList.appendChild(div);

        k += 1;
    }
}

getGithubContributions();

const calcExpenses = () => {
    let type = itemType.value.trim().toLowerCase();
    let price = itemPrice.value.trim().toLowerCase();

    const allVals = Object.values(expenses);
    const total = allVals.reduce((acc, currentVal) => {
        return acc + currentVal;
    }, parseInt(price));

    console.log(total);
    if (type in expenses) {
        let newPrice = expenses[type] + parseInt(price);
        expenses[type] = newPrice;
    } else {
        expenses[type] = parseInt(price);
    }

    let sectionCheck = document.getElementById(type);

    if(!sectionCheck) {
        const section = document.createElement('div');
        section.classList.add('expensesIndividual');
        section.id = type;
        expensesTotal.appendChild(section);
    }

    for (const key in expenses) {
        if (expenses.hasOwnProperty(key)) {
            const val = expenses[key];
            const div = document.getElementById(key);
            const percentage = Math.round((val / total) * 100);
            div.style.width = percentage + "%";
            div.textContent = `${key} : ${percentage}%`;
        }
    }

    itemType.value = "";
    itemPrice.value = "";
    console.log(expenses);
}

addItemBtn.addEventListener('click', calcExpenses);