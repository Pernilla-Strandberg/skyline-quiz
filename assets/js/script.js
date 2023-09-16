// Store quizData in array

const quizData = [{
        image: 'assets/images/image1.jpg',
        question: 'Guess the skyline!',
        options: ['São Paulo, Brazil', 'Bangkok, Thailand', 'Chicago, United States', 'Dubai, United Arab Emirates', 'Wuhan, China'],
        answer: 'Dubai, United Arab Emirates',
    },
    {
        image: 'assets/images/image2.jpg',
        question: 'Guess the skyline!',
        options: ['Dublin, Ireland', 'London, England', 'Toronto, Canada', 'Los Angeles, United States', 'Helsinki, Finland'],
        answer: 'London, England',
    },
    {
        image: 'assets/images/image3.jpg',
        question: 'Guess the skyline!',
        options: ['Mumbai, India', 'Jakarta, Indonesia', 'Warsaw, Poland', 'Yokohama, Japan', 'Istanbul, Turkey'],
        answer: 'Istanbul, Turkey',
    },
    {
        image: 'assets/images/image4.jpg',
        question: 'Guess the skyline!',
        options: ['Chicago, United States', 'Milano, Italy', 'Frankfurt am Main, Germany', 'Malmö, Sweden', 'Barcelona, Spain'],
        answer: 'Milano, Italy',
    },
    {
        image: 'assets/images/image5.jpg',
        question: 'Guess the skyline!',
        options: ['Singapore, Singapore', 'Las Vegas, United States', 'São Paulo, Brazil', 'Kuala Lumpur, Malaysia', 'Tokyo, Japan'],
        answer: 'Singapore, Singapore',
    },
    {
        image: 'assets/images/image6.jpg',
        question: 'Guess the skyline!',
        options: ['Vilnius, Lithuania', 'Toronto, Canada', 'Wuhan, China', 'Dublin, Ireland', 'London, England'],
        answer: 'Dublin, Ireland',
    },
    {
        image: 'assets/images/image7.jpg',
        question: 'Guess the skyline!',
        options: ['Warsaw, Poland', 'Alexandria, Egypt', 'Kowloon, Hong Kong', 'Chicago, United States', 'Bangkok, Thailand'],
        answer: 'Kowloon, Hong Kong',
    },
    {
        image: 'assets/images/image8.jpg',
        question: 'Guess the skyline!',
        options: ['Milano, Italy', 'Helsinki, Finland', 'Kowloon, Hong Kong', 'Frankfurt am Main, Germany', 'Malmö, Sweden'],
        answer: 'Malmö, Sweden',
    },
    {
        image: 'assets/images/image9.jpg',
        question: 'Guess the skyline!',
        options: ['Barcelona, Spain', 'Los Angeles, United States', 'Istanbul, Turkey', 'Alexandria, Egypt', 'Mumbai, India'],
        answer: 'Los Angeles, United States',
    },
    {
        image: 'assets/images/image10.jpg',
        question: 'Guess the skyline!',
        options: ['Yokohama, Japan', 'Jakarta, Indonesia', 'Las Vegas, United States', 'Kowloon, Hong Kong', 'Kuala Lumpur, Malaysia'],
        answer: 'Kuala Lumpur, Malaysia',
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