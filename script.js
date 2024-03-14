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
const restartButton = document.createElement("button"); 
restartButton.textContent = "Restart Quiz"; 
restartButton.classList.add("btn"); 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    resultElement.textContent = ""; 
    nextButton.style.display = "none"; 
    restartButton.style.display = "none"; 
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;


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
        button.style.backgroundColor = "#7469B6"; 
    } else {
        button.style.backgroundColor = "#FF204E"; 
    }
    
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block"; 
}

function nextQuestion(){
    currentQuestionIndex++;
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.style.backgroundColor = "";
    });
    nextButton.style.display = "none"; 
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz(){
    questionElement.textContent = ""; 
    answerButtonContainer.innerHTML = ""; 
    nextButton.style.display = "none"; 
    resultElement.innerHTML = ""; 

    appendParagraph("Quiz Finished! Your Score: " + score + "/" + questions.length);
    appendParagraph("You got " + score + " out of " + questions.length + " questions correct.");

    
    restartButton.style.display = "block";
    resultElement.appendChild(restartButton); 
}




function appendParagraph(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    resultElement.appendChild(paragraph);
}

function restartQuiz(){
    restartButton.style.display = "none"; 
    startQuiz(); 
}

startQuiz();

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
