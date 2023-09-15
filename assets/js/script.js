// Store quizData in array

const quizData = [
    {
      image: 'assets/images/image1.jpg',
      question: 'Skyline?',
      options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
      answer: 'Choice 2',
    },
    {
        image: 'assets/images/image2.jpg',
        question: 'Skyline 2?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image3.jpg',
        question: 'Skyline 3?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image4.jpg',
        question: 'Skyline 4?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image5.jpg',
        question: 'Skyline 5?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image6.jpg',
        question: 'Skyline 6?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image7.jpg',
        question: 'Skyline 7?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image8.jpg',
        question: 'Skyline 8?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image9.jpg',
        question: 'Skyline 9?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image10.jpg',
        question: 'Skyline 10?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image11.jpg',
        question: 'Skyline 11?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image12.jpg',
        question: 'Skyline 12?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image13.jpg',
        question: 'Skyline 13?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'assets/images/image14.jpg',
        question: 'Skyline 14?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
];

// Get elements from DOM
const quizContainer = document.getElementById('quiz-container');
const quizStartContainer = document.getElementById('quiz-start');
const newQuizButton = document.getElementById('new-quiz-button');
const quizQuestionContainer = document.getElementById('quiz-question');
const submitButton = document.getElementById('submit-button');
const progressBar = document.getElementById('progress-bar');
const resultContainer = document.getElementById('quiz-result');

// Set empty counters
let progressDots = [];
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Mix array
function mixArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display first view of container and button, hide other views and elements
function displayQuizStart() {
    quizQuestionContainer.style.display = 'none';
    submitButton.style.display = 'none';
    quizStartContainer.style.display = 'block'
    newQuizButton.style.display = 'inline-block';
    resultContainer.style.display = 'none'
}

// Enable or disable submit button in question view
function enableSubmitButton() {
    // Enable 
    submitButton.disabled = false;
}
function disableSubmitButton() {
    // Disable
    submitButton.disabled = true;
}

// Display quiz data
function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const quizImage = document.getElementById('quiz-image');
    const questionText = document.getElementById('quiz-question-text');
    const quizForm = document.getElementById('quiz-form');

    quizImage.src = questionData.image;
    questionText.textContent = questionData.question;

    // Reset choices
    quizForm.innerHTML = '';

    // Mix question data options
    const mixedOptions = [...questionData.options];
    mixArray(mixedOptions);

    // Create radio buttons and mix the options
    for (let i = 0; i < mixedOptions.length; i++) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'quiz';
        input.value = mixedOptions[i];
        label.appendChild(input);
        label.appendChild(document.createTextNode(mixedOptions[i]));
        quizForm.appendChild(label);
    }

    // Show quiz form and progress bar
    quizForm.style.display = 'block';
    progressBar.style.display = 'block';
    updateProgress();

    // Enable or disable submit button
    const radioButtons = document.querySelectorAll('input[name="quiz"]');
    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
            if (radioButton.checked) {
                enableSubmitButton();
            } else {
                disableSubmitButton();
            }
        });
    });
    // Disable submit button at start
    disableSubmitButton();
}

// Add eventListeners to buttons and call functions on click
submitButton.addEventListener('click', checkAnswer);
newQuizButton.addEventListener('click', startQuiz);

// Check if answer is correct and add score
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      // Check if current question is within the array range to show next question 
      // Display the result view if current question is not within the array range
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
    updateProgress(); // UpdateProgress   
}

// Display question view
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizQuestionContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    quizStartContainer.style.display = 'none';
    newQuizButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
    updateProgress(); // Display progress bar
}

// Display progress bar and increase progress for each question
function updateProgress() {
    // Clear previous progress bar
    progressBar.innerHTML = '';

    // Display progress bar with dots
    for (let i = 0; i < quizData.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('progress-dot');
        if (i < currentQuestion) {
            dot.classList.add('answered');
        }
        progressBar.appendChild(dot);
    }
}

// Display result view
function displayResult() {
    quizQuestionContainer.style.display = 'none';
    submitButton.style.display = 'none';
    quizStartContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML += `<h2>Result</h2><p>You scored ${score} out of ${quizData.length}!</p>`;
    newQuizButton.style.display = 'inline-block';
}

displayQuizStart(); // First view to be displayed


