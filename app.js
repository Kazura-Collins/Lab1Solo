const axios = window.axios;
const API_URL = 'https://opentdb.com/api.php?amount=10';

const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const nextBtn = document.getElementById('next-btn');

let currentQuestion = 0;
let score = 0;
let questions = [];

function decodeEntities(encodedString) {
  var textarea = document.createElement('textarea');
  textarea.innerHTML = encodedString;
  return textarea.value;
}


async function getQuestions() {
  try {
    const response = await axios.get(API_URL);
    questions = response.data.results;
    showQuestion();
  } catch (error) {
    console.error(error);
  }
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showScore();
    return;
  }
  const question = questions[currentQuestion];
  questionEl.innerText = decodeEntities(question.question);
  optionsEl.innerHTML = '';
  question.incorrect_answers.forEach((answer) => {
    const option = createOption(decodeEntities(answer));
    optionsEl.appendChild(option);
  });
  const decodedCorrectAnswer = decodeEntities(question.correct_answer);
  const correctOption = createOption(decodedCorrectAnswer);
  correctOption.addEventListener('click', () => {
    score++;
    currentQuestion++;
    showQuestion();
  });
  optionsEl.appendChild(correctOption);
  console.log(question, decodedQuestion);
}


function showScore() {
  questionEl.innerText = `Your score is ${score} out of ${questions.length}.`;
  optionsEl.innerHTML = '';
  nextBtn.style.display = 'none';
}

function createOption(answer) {
  const option = document.createElement('button');
  option.innerText = decodeURIComponent(answer);
  return option;
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  showQuestion();
});

getQuestions();
