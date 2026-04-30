// ================= DATA =================
const lectures = [];

for (let i = 1; i <= 12; i++) {
    let lessons = [];
    for (let j = 1; j <= 5; j++) {
        lessons.push(`
            <h3>Lesson ${j}</h3>
            <p>This is lesson ${j} of Lecture ${i}.</p>
            <p>Here you learn important Linux concepts.</p>
            <pre><code>echo "Hello Linux ${i}-${j}"</code></pre>
        `);
    }

    let quiz = [];
    for (let q = 1; q <= 10; q++) {
        quiz.push({
            question: `Lecture ${i} - Question ${q}: What does Linux command do?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: 0
        });
    }

    lectures.push({
        title: `Lecture ${i}`,
        description: `Linux Topic ${i}`,
        lessons: lessons,
        quiz: quiz
    });
}

// ================= STATE =================
let currentLecture = 0;
let currentLesson = 0;
let currentQuestion = 0;
let score = 0;

// ================= ELEMENTS =================
const screens = document.querySelectorAll(".screen");
const lectureGrid = document.getElementById("lecture-grid");

// ================= NAVIGATION =================
function showScreen(id) {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ================= START =================
document.getElementById("start-btn").onclick = () => {
    showScreen("lecture-screen");
    renderLectures();
};

document.getElementById("back-to-welcome").onclick = () => {
    showScreen("welcome-screen");
};

// ================= LECTURES =================
function renderLectures() {
    lectureGrid.innerHTML = "";

    lectures.forEach((lec, index) => {
        const card = document.createElement("div");
        card.className = "lecture-card";
        card.innerHTML = `
            <span class="lecture-number">Lecture ${index + 1}</span>
            <span class="lecture-title">${lec.title}</span>
            <span class="lecture-description">${lec.description}</span>
        `;

        card.onclick = () => {
            currentLecture = index;
            currentLesson = 0;
            showLesson();
        };

        lectureGrid.appendChild(card);
    });
}

// ================= LESSONS =================
function showLesson() {
    showScreen("lesson-screen");

    const lec = lectures[currentLecture];
    document.getElementById("lesson-title").textContent = lec.title;
    document.getElementById("current-lesson").textContent = currentLesson + 1;
    document.getElementById("lesson-text").innerHTML = lec.lessons[currentLesson];
}

document.getElementById("next-lesson").onclick = () => {
    if (currentLesson < 4) {
        currentLesson++;
        showLesson();
    } else {
        showScreen("lecture-complete-screen");
    }
};

document.getElementById("prev-lesson").onclick = () => {
    if (currentLesson > 0) {
        currentLesson--;
        showLesson();
    }
};

document.getElementById("back-to-lectures").onclick = () => {
    showScreen("lecture-screen");
};

// ================= QUIZ =================
document.getElementById("start-quiz").onclick = () => {
    currentQuestion = 0;
    score = 0;
    showQuiz();
};

function showQuiz() {
    showScreen("quiz-screen");

    const q = lectures[currentLecture].quiz[currentQuestion];

    document.getElementById("quiz-title").textContent = `Quiz: Lecture ${currentLecture + 1}`;
    document.getElementById("current-question").textContent = currentQuestion + 1;
    document.getElementById("question-text").textContent = q.question;

    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = opt;

        div.onclick = () => {
            if (i === q.answer) score++;
            nextQuestion();
        };

        container.appendChild(div);
    });
}

function nextQuestion() {
    if (currentQuestion < 9) {
        currentQuestion++;
        showQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen("results-screen");

    document.getElementById("score-text").textContent = `Your Score: ${score}/10`;
    document.getElementById("percentage-text").textContent = `${score * 10}%`;
}

// ================= RESULTS =================
document.getElementById("retry-quiz").onclick = () => {
    currentQuestion = 0;
    score = 0;
    showQuiz();
};

document.getElementById("back-to-lessons").onclick = () => {
    showLesson();
};

document.getElementById("review-lessons").onclick = () => {
    showLesson();
};