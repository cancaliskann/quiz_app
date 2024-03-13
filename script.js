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

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    resultElement.textContent = ""; 
    nextButton.textContent = "Next";
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
            handleAnswer(answer.correct);
        });
        answerButtonContainer.appendChild(button);
    });
}

function handleAnswer(correct){
    if(correct){
        score++;
    }
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz(){
    questionElement.textContent = "Quiz Finished! Your Score: " + score + "/" + questions.length;
    resultElement.textContent = "You got " + score + " out of " + questions.length + " questions correct.";
}

startQuiz();
