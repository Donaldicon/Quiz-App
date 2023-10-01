
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
const progressBarEl = document.getElementById("progress-bar");
const timeLeftEl = document.getElementById("time-digit");

let remainingTime = 9;
let countdown;

const totalTime = remainingTime;

const questions = [
  {
    question: "How many breeds of elephants are there?",
    answers: [
      {text: "5", correct: false},
      {text: "3", correct: true},
      {text: "2", correct: false},
      {text: "4", correct: false},

    ]
  },
  {
    question: "How many tiles with letters of the alphabet are there in the game of scrabble?",
    answers: [
      {text : "98", correct: true},
      {text : "95", correct: false},
      {text : "90", correct: false},
      {text : "100", correct: false},

    ]
  },
  {
    question: "What is Joe Biden's middle name?",
    answers: [
      {text : "Jacob", correct: false},
      {text : "Arthur", correct: false},
      {text : "Rice", correct: false},
      {text : "Robinette", correct: true},

    ]
  },
  {
    question: "Who won the first ever FIFA men's world cup?",
    answers: [
      {text : "Argentina", correct: false},
      {text : "Uruguay", correct: true},
      {text : "Spain", correct: false},
      {text : "Germany", correct: false},

    ]
  },
  {
    question: "Which of the following happened 2 years after the titanic sank?",
    answers: [
      {text : "Amalgamation of Nigeria ", correct: true},
      {text : "invention of light bulbs", correct: false},
      {text : "Monalisa painting", correct: false},
      {text : "Captain America civil war lol", correct: false},

    ]
  },
  {
    question: "The numbers on the opposite sides of a six-sided die always add up to what number?",
    answers: [
      {text : "6", correct: false},
      {text : "8", correct: false},
      {text : "5", correct: false},
      {text : "7", correct: true},

    ]
  },
  {
    question: "How many Knights are on a side in a game of chess?",
    answers: [
      {text: "4", correct: false},
      {text: "2", correct: true},
      {text: "1", correct: false},
      {text: "3", correct: false},

    ]
  },
  {
    question: "Who won the ballon d'or in 2012?",
    answers: [
      {text: "Lionel Messi", correct: true},
      {text: "Cristiano Ronaldo", correct: false},
      {text: "Xhaka", correct: false},
      {text: "Lewandowski", correct: false},

    ]
  },
  {
    question: "In what year did Davido release Aye?",
    answers: [
      {text: "2012", correct: false},
      {text: "2011", correct: false},
      {text: "2014", correct: true},
      {text: "2013", correct: false},

    ]
  },
  {
    question: "In what year did Laycon win the Big brother Naija competiton?",
    answers: [
      {text: "2019", correct: false},
      {text: "2020", correct: true},
      {text: "2021", correct: false},
      {text: "2018", correct: false},

    ]
  },
];


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  remainingTime = 9;
  clearInterval(countdown);
  showQuestion();
  timerDisplay();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
 
function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      // button.classList.add("correct");
    }
    button.disabled = true;
    clearInterval(countdown);
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  progressBarEl.style.width = "0%";
  timeLeftEl.textContent = "0";
}

function handleNextButton(){
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    remainingTime = 9;
    clearInterval(countdown);
    timerDisplay();
  } else {
    showScore()
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});


const timerDisplay = () => {
  countdown = setInterval(() => {
    remainingTime--;
    timeLeftEl.textContent = `${remainingTime}s`;
    if (remainingTime > 0) {
    
      const progress = ((totalTime - remainingTime) / totalTime) *100;
  
      progressBarEl.style.width = `${100-progress}%`;
      
      timeLeftEl.textContent = "0" + remainingTime ;
  
  
    } else if (remainingTime == 0) {
      clearInterval(countdown);
      handleNextButton();
      progressBarEl.style.width = "0%";
      timeLeftEl.textContent = "0";
    }
  }, 1000);
  
};



startQuiz();