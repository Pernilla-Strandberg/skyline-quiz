// Store quizData in array

const quizData = [
    {
      image: 'assets/images/image1.jpg',
      question: 'Skyline?',
      options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
      answer: 'Choice 2',
    },
    {
        image: 'image2.jpg',
        question: 'Question 2?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image3.jpg',
        question: 'Question 3?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image4.jpg',
        question: 'Question 4?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image5.jpg',
        question: 'Question 5?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image6.jpg',
        question: 'Question 6?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image7.jpg',
        question: 'Question 7?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image8.jpg',
        question: 'Question 8?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image9.jpg',
        question: 'Question 9?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image10.jpg',
        question: 'Question 10?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image11.jpg',
        question: 'Question 11?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image12.jpg',
        question: 'Question 12?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image13.jpg',
        question: 'Question 13?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image14.jpg',
        question: 'Question 14?',
        options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'],
        answer: 'Choice 2',
    },
    {
        image: 'image15.jpg',
        question: 'Question 15?',
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

// Display first view of container and button, hide other views and elements
function displayQuizStart() {
    quizQuestionContainer.style.display = 'none';
    submitButton.style.display = 'none';
    quizStartContainer.style.display = 'block'
    newQuizButton.style.display = 'inline-block';
    resultContainer.style.display = 'none'
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

    
}


