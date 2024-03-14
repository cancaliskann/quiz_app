const questions = [ 
    {
        question: "What is 1 + 1?",
        answer: [ 
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "4", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answer: [ 
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answer: [ 
            { text: "Ernest Hemingway", correct: false },
            { text: "Harper Lee", correct: true },
            { text: "J.K. Rowling", correct: false },
            { text: "George Orwell", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answer: [ 
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false },
            { text: "O2", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonContainer = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const restartButton = document.createElement("button"); // Create restart button
restartButton.textContent = "Restart Quiz"; // Set button text
restartButton.classList.add("btn"); // Add button class

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    resultElement.textContent = ""; // Reset result
    nextButton.style.display = "none"; // Hide the "Next Question" button initially
    restartButton.style.display = "none"; // Hide the "Restart Quiz" button initially
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;

    // Clear previous answer buttons
    answerButtonContainer.innerHTML = '';

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => {
            handleAnswer(answer.correct, button);
        });
        answerButtonContainer.appendChild(button);
    });
}

function handleAnswer(correct, button){
    if(correct){
        score++;
        button.style.backgroundColor = "green"; // Change button color to green if correct
    } else {
        button.style.backgroundColor = "red"; // Change button color to red if wrong
    }
    // Disable answer buttons after the user responds
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block"; // Show the "Next Question" button
}

function nextQuestion(){
    currentQuestionIndex++;
    // Reset button colors
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.style.backgroundColor = "";
    });
    nextButton.style.display = "none"; // Hide the "Next Question" button
    // Check if quiz is finished
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz(){
    questionElement.textContent = ""; // Hide the question
    answerButtonContainer.innerHTML = ""; // Hide the answer buttons
    nextButton.style.display = "none"; // Hide the "Next Question" button
    resultElement.textContent = "Quiz Finished! Your Score: " + score + "/" + questions.length;
    resultElement.textContent += "\nYou got " + score + " out of " + questions.length + " questions correct.";
    // Append result and restart button
    answerButtonContainer.appendChild(resultElement);
    answerButtonContainer.appendChild(restartButton);
    restartButton.style.display = "block"; // Show the "Restart Quiz" button
}

function restartQuiz(){
    restartButton.style.display = "none"; // Hide the "Restart Quiz" button
    startQuiz(); // Restart the quiz
}

startQuiz();

// Add event listeners
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
