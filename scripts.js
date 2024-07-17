// Initialize EmailJS
(function() {
    emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS user ID
})();

let currentQuestionIndex = 0;
const questions = [
    { question: "What is a function in C++?", options: ["A", "B", "C", "D"], answer: 0 },
    // Add more questions here...
];

function startQuiz() {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('questions-container').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';
    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `<input type="radio" name="answer" value="${index}" required> ${option}`;
        optionsContainer.appendChild(optionElement);
    });
}

function nextQuestion() {
    const form = document.getElementById('quiz-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const selectedOption = document.querySelector('input[name="answer"]:checked').value;
    questions[currentQuestionIndex].userAnswer = selectedOption;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        submitQuiz();
    }
}

function submitQuiz() {
    const name = document.getElementById('name').value;
    let score = 0;

    questions.forEach((q, index) => {
        if (q.userAnswer == q.answer) {
            score++;
        }
    });

    const results = {
        name: name,
        score: score,
        total: questions.length
    };

    sendEmail(results);
}

function sendEmail(results) {
    const templateParams = {
        to_name: "Instructor",
        from_name: results.name,
        message: `Name: ${results.name}\nScore: ${results.score}/${results.total}`
    };

    emailjs.send('service_d91rqwd', 'template_gkggqnf', templateParams) // Replace with your service ID and template ID
        .then(() => {
            alert('Quiz submitted successfully!');
        }, (error) => {
            console.error('Failed to send email:', error);
        });
              }
