/*
Write a program that takes a birthYear, calculates the user's current age, and then
prints a message stating if they are old enough to vote (age 18 or older) or if they are
a senior citizen (age 65 or older).
*/

function calculateAge (year){
    if (year < 0){
        console.log("Year cannot be negative!");
        return;
    }

    let age = 2025 - year;

    if(age >= 18){
        console.log(`Can vote, age is ${age}.`);
        if(age >= 65){
            console.log("Senior citizen.");
        } else {
            console.log("Not a senior citizen.");
        }
    } else {
        console.log(`Cannot vote, age is ${age}.`);
    }
}

calculateAge(2006)

/*
Create an array of numbers.Calculate the sum and average of all the numbers in the
array.
*/

function arrayCalc(arr){
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i];
    }

    let avg = sum / arr.length;

    console.log(`sum = ${sum} and average = ${avg}`);
}

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];

arrayCalc(arr)

/*
Reverse a String
Check for Palindrome
Count Vowels
*/

function strOperations (str){
    let n = str.length;
    let ns = "";
    const vowels = 'aeiouAEIOU';
    let v = 0;

    for(i = 0; i < n; i++){
        if(vowels.includes(str[i])){
            v += 1;
        }
        ns += str[n-i-1];
    }

    console.log(`Reverse of ${str} is ${ns}.`)
    
    if(str == ns){
        console.log("It is a palindrome.")
    } else {
        console.log("It is not a palindrome.")
    }

    console.log(`Number of vowels in the word: ${v}`)
}

strOperations("racecar")

/*
Write a function that finds and returns the longest word in a sentence.
*/

function longestWord(sentence){
    let sen = sentence.split(" ");
    let lw = "";

    for(i = 0; i < sen.length; i++){
        if(sen[i].trim().length > lw.length){
            lw = sen[i];
        }
    }

    console.log("Longest word in sentence: " + lw)
}

longestWord("This sentence is too long to load.")

/*
Create a simple to-do list manager with the following features:
●​ Store to-do items in an array.
●​ Implement functions to add, remove, and display items.
●​ Use a loop to continuously prompt the user for an action (add, remove,
display, or quit).
●​ Print the list of items with their index when the user selects display.
●​ Exit the program when the user selects quit.
*/

let todoList = [];

function addTodo(task){
    todoList.push(task);
    console.log("New todo added!");
}

function removeTodo(index) {
    if(index >= 1  && index <= todoList.length){
        todoList.splice((index - 1), 1);
        console.log(`todo - ${index} removed!`);
    } else {
        console.log("Invalid index!")
    }
}

function displayTodo(){
    if(todoList.length == 0){
        console.log("NO todos available!");
        return;
    }

    for(let i = 0; i < todoList.length; i++){
        console.log(`${i+1} : ${todoList[i]}`);
    }
}

function todo(activity) {
    console.log("TODO LIST \n 1. Add todo \n 2. Remove todo \n 3. Display todo-list \n 4. Quit")

    for(let i = 0; i < activity.length; i++){

        ch = activity[i][0]

        if(ch == 1){
            addTodo(activity[i][1]);
        } else if (ch == 2) {
            removeTodo(activity[i][1]);
        } else if (ch == 3) {
            displayTodo();
        } else if (ch == 4) {
            console.log("Quitting...")
            break;
        } else {
            console.log("Invalid choice");
        }
    }
}

let tasks = [[1, "Study for maths tut."], [1, "Water plants."], [3], [2, 1], [3], [4]];

todo(tasks);
