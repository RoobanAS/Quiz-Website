const quizData = { 
    HTML: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High-Level Tool Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
        { question: "Which tag is used to create a hyperlink in HTML?", options: ["<a>", "<link>", "<href>", "<nav>"], answer: "<a>" },
        { question: "What is the correct HTML for creating a checkbox?", options: ["<checkbox>", "<check>", "<input type='checkbox'>", "<input checkbox>"], answer: "<input type='checkbox'>" },
        { question: "Which HTML element represents the largest heading?", options: ["<h1>", "<h6>", "<heading>", "<h>"], answer: "<h1>" },
        { question: "What is the correct way to create an ordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: "<ol>" },
        { question: "Which attribute specifies the destination of a link?", options: ["src", "href", "link", "target"], answer: "href" },
        { question: "Which tag is used to display an image?", options: ["<image>", "<img>", "<pic>", "<photo>"], answer: "<img>" },
        { question: "What is the default file extension for an HTML document?", options: [".htm", ".html", ".xml", ".doc"], answer: ".html" },
        { question: "Which doctype is correct for HTML5?", options: ["<!DOCTYPE HTML>", "<!DOCTYPE html>", "<DOCTYPE HTML5>", "<DOCTYPE html5>"], answer: "<!DOCTYPE html>" },
        { question: "Which tag is used to insert a line break?", options: ["<break>", "<br>", "<lb>", "<newline>"], answer: "<br>" },
    ],
    CSS: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
        { question: "Which property is used to change the background color?", options: ["color", "background-color", "bgcolor", "background"], answer: "background-color" },
        { question: "How do you make text bold in CSS?", options: ["font-weight: bold;", "text-style: bold;", "font-style: bold;", "text-weight: bold;"], answer: "font-weight: bold;" },
        { question: "Which property is used to change the font size?", options: ["font-size", "text-size", "font-height", "size"], answer: "font-size" },
        { question: "How do you add a border to an element?", options: ["border: 1px solid black;", "outline: 1px black;", "border-style: solid;", "border-width: 1px;"], answer: "border: 1px solid black;" },
        { question: "Which property is used to make text italic?", options: ["font-style: italic;", "text-style: italic;", "font-variant: italic;", "text-variant: italic;"], answer: "font-style: italic;" },
        { question: "Which CSS property controls the visibility of an element?", options: ["visibility", "display", "opacity", "hidden"], answer: "visibility" },
        { question: "How do you center-align text inside a block element?", options: ["text-align: center;", "margin: auto;", "align: center;", "justify-content: center;"], answer: "text-align: center;" },
        { question: "Which property controls the stacking order of elements?", options: ["z-index", "order", "stack", "layer"], answer: "z-index" },
        { question: "Which property is used to create rounded corners?", options: ["corner-radius", "border-radius", "radius", "round-corner"], answer: "border-radius" },
    ],
    JavaScript: [
        { question: "What is the use of the `addEventListener` method?", options: ["Attach an event to an element", "Remove an event listener", "Create a new event", "Execute a function"], answer: "Attach an event to an element" },
        { question: "Which method is used to parse a string as a number?", options: ["parseInt()", "parseFloat()", "number()", "toNumber()"], answer: "parseInt()" },
        { question: "What will `typeof '123'` return?", options: ["string", "number", "boolean", "undefined"], answer: "string" },
        { question: "Which operator is used for concatenation?", options: ["+", "-", "*", "/"], answer: "+" },
        { question: "How do you declare a variable in JavaScript?", options: ["let", "var", "const", "All of the above"], answer: "All of the above" },
        { question: "What will `false + 1` return?", options: ["1", "false", "NaN", "0"], answer: "1" },
        { question: "What method can be used to check if a value is an array?", options: ["Array.isArray()", "Array.check()", "Array.verify()", "isArray()"], answer: "Array.isArray()" },
        { question: "Which of the following is not a valid JavaScript data type?", options: ["Object", "Number", "Boolean", "Character"], answer: "Character" },
        { question: "What is the output of `typeof NaN`?", options: ["number", "NaN", "undefined", "object"], answer: "number" },
        { question: "Which statement is used to terminate a loop in JavaScript?", options: ["break", "continue", "exit", "end"], answer: "break" },
    ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

const signUpForm = document.getElementById("sign-up-form");
const signUpContainer = document.getElementById("sign-up-container");
const quizContainer = document.getElementById("quiz-container");
const quizIntro = document.getElementById("quiz-intro");
const quizQuestions = document.getElementById("quiz-questions");
const timerElement = document.getElementById("time-left");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const quizResults = document.getElementById("quiz-results");
const scoreElement = document.getElementById("score");
const viewAnswerButton = document.getElementById("view_answer-btn")
const restartButton = document.getElementById("restart-btn");
const startHtmlBtn = document.getElementById("start-html-btn");
const startCssBtn = document.getElementById("start-css-btn");
const startJsBtn = document.getElementById("start-js-btn");

function startTimer() {
    timeLeft = 20;
    timerElement.textContent = timeLeft;
    timer = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    const currentQuestion = currentQuiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(li);
    });

    nextButton.classList.add("hidden");
    clearInterval(timer);
    startTimer();
}

function checkAnswer(selectedOption) {
    const options = optionsElement.querySelectorAll("li");
    options.forEach(option => option.classList.remove("selected"));

    const currentQuestion = currentQuiz[currentQuestionIndex];
    const clickedOption = Array.from(options).find(option => option.textContent === selectedOption);
    if (clickedOption) clickedOption.classList.add("selected");

    if (selectedOption === currentQuestion.answer) score++;

    // Show the "Next" button after an answer is selected
    nextButton.classList.remove("hidden");
    clearInterval(timer); // Stop the timer when the answer is selected
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        loadQuestion(); // Load the next question
    } else {
        showResults(); // Show results if all questions are answered
    }
}

// Add event listener to the "Next" button
nextButton.addEventListener("click", function() {
    nextQuestion();
});

function showResults() {
    quizQuestions.classList.add("hidden");
    quizResults.classList.remove("hidden");
    scoreElement.textContent = `You scored ${score} out of ${currentQuiz.length}`;
    
    viewAnswerButton.addEventListener("click", showAnswers);
}

function showAnswers() {
    const answersList = document.createElement("ul");
    
    currentQuiz.forEach((question, index) => {
        const listItem = document.createElement("li");

        // Escape the HTML tags in the answer so they are displayed as text
        const escapedAnswer = question.answer.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        listItem.innerHTML = `Q${index + 1}: ${question.question} - Correct Answer: <span style="color: green;">${escapedAnswer}</span>`;
        answersList.appendChild(listItem);
    });
    
    // Append the answers list to the results section
    quizResults.appendChild(answersList);
    
    // Hide the "View Answers" button after it has been clicked
    const viewAnswerButton = quizResults.querySelector("button");
    viewAnswerButton.style.display = "none";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizResults.classList.add("hidden");
    quizIntro.classList.remove("hidden");
    answersList.textContent = ' '
}

function startQuiz(section) {
    currentQuiz = quizData[section];
    currentQuestionIndex = 0;
    score = 0;
    quizIntro.classList.add("hidden");
    quizQuestions.classList.remove("hidden");
    loadQuestion();
    startTimer();
}

signUpForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    signUpContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
});

startHtmlBtn.addEventListener("click", function() {
    startQuiz("HTML");
});

startCssBtn.addEventListener("click", function() {
    startQuiz("CSS");
});

startJsBtn.addEventListener("click", function() {
    startQuiz("JavaScript");
});

restartButton.addEventListener("click", restartQuiz);
