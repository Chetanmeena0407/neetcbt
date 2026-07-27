let questions = [];

let currentQuestion = 0;

let answers = [];

let review = [];

const questionImage = document.getElementById("questionImage");

const questionNo = document.getElementById("questionNo");

const optionRadio = document.querySelectorAll('input[name="answer"]');

const optionLabel = document.querySelectorAll(".options label");

const palette = document.getElementById("paletteGrid");


// ==========================
// Load Questions
// ==========================

fetch("questions.json")

.then(res=>res.json())

.then(data=>{

questions=data;

answers=new Array(questions.length).fill(null);

review=new Array(questions.length).fill(false);

createPalette();

loadQuestion(0);

});


// ==========================
// Load Question
// ==========================

function loadQuestion(index){

currentQuestion=index;

let q=questions[index];

questionNo.innerHTML=index+1;

questionImage.src=q.image;


// Options

optionLabel[0].lastChild.textContent=" "+q.options[0];

optionLabel[1].lastChild.textContent=" "+q.options[1];

optionLabel[2].lastChild.textContent=" "+q.options[2];

optionLabel[3].lastChild.textContent=" "+q.options[3];


// Remove Selection

optionRadio.forEach(r=>r.checked=false);


// Restore Answer

if(answers[index]!=null){

optionRadio[answers[index]].checked=true;

}


updatePalette();

}

// ==========================
// Create Palette
// ==========================

function createPalette() {

    palette.innerHTML = "";

    questions.forEach((q, i) => {

        let btn = document.createElement("button");

        btn.innerHTML = i + 1;

        btn.onclick = () => {

            saveCurrentAnswer();
            loadQuestion(i);

        };

        palette.appendChild(btn);

    });

}

// ==========================
// Save Current Answer
// ==========================

function saveCurrentAnswer() {

    let selected = null;

    optionRadio.forEach((radio, index) => {

        if (radio.checked) {

            selected = index;

        }

    });

    answers[currentQuestion] = selected;

}

// ==========================
// Update Palette Colors
// ==========================

function updatePalette() {

    let buttons = palette.querySelectorAll("button");

    buttons.forEach((btn, i) => {

        btn.className = "";

        if (i === currentQuestion) {

            btn.classList.add("current");

        }

        if (answers[i] != null) {

            btn.classList.add("answered");

        }

        if (review[i]) {

            btn.classList.add("review");

        }

    });

}

// ==========================
// Save & Next
// ==========================

document.getElementById("saveNext").onclick = () => {

    saveCurrentAnswer();

    if (currentQuestion < questions.length - 1) {

        loadQuestion(currentQuestion + 1);

    }

};

// ==========================
// Previous
// ==========================

document.getElementById("backBtn").onclick = () => {

    saveCurrentAnswer();

    if (currentQuestion > 0) {

        loadQuestion(currentQuestion - 1);

    }

};

// ==========================
// Next
// ==========================

document.getElementById("nextBtn").onclick = () => {

    saveCurrentAnswer();

    if (currentQuestion < questions.length - 1) {

        loadQuestion(currentQuestion + 1);

    }

};

// ==========================
// Clear Response
// ==========================

document.getElementById("clear").onclick = () => {

    optionRadio.forEach(r => r.checked = false);

    answers[currentQuestion] = null;

    updatePalette();

};

// ==========================
// Mark For Review
// ==========================

document.getElementById("reviewNext").onclick = () => {

    saveCurrentAnswer();

    review[currentQuestion] = true;

    if (currentQuestion < questions.length - 1) {

        loadQuestion(currentQuestion + 1);

    }

};

document.getElementById("saveReview").onclick = () => {

    saveCurrentAnswer();

    review[currentQuestion] = true;

    updatePalette();

};
// ==========================
// 3 Hour Timer
// ==========================

let totalSeconds = 3 * 60 * 60;

const timer = document.getElementById("timer");

function startTimer() {

    const interval = setInterval(() => {

        let h = Math.floor(totalSeconds / 3600);

        let m = Math.floor((totalSeconds % 3600) / 60);

        let s = totalSeconds % 60;

        timer.innerHTML =
            String(h).padStart(2, "0") + ":" +
            String(m).padStart(2, "0") + ":" +
            String(s).padStart(2, "0");

        if (totalSeconds <= 0) {

            clearInterval(interval);

            alert("Time Over!");

            submitExam();

        }

        totalSeconds--;

    }, 1000);

}

startTimer();


// ==========================
// Auto Save
// ==========================

setInterval(() => {

    localStorage.setItem("neet_answers", JSON.stringify(answers));

    localStorage.setItem("neet_review", JSON.stringify(review));

}, 5000);


// Restore Saved Data

const savedAnswers = localStorage.getItem("neet_answers");

const savedReview = localStorage.getItem("neet_review");

if (savedAnswers) {

    answers = JSON.parse(savedAnswers);

}

if (savedReview) {

    review = JSON.parse(savedReview);

}


// ==========================
// Submit
// ==========================

function submitExam() {

    saveCurrentAnswer();

    let answered = 0;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q, i) => {

        if (answers[i] == null) {
            unanswered++;
        } else {
            answered++;

            // questions.json me answer 1-4 hai,
            // radio index 0-3 hai
            if ((answers[i] + 1) === q.answer) {
                correct++;
            } else {
                wrong++;
            }
        }

    });

    let marks = (correct * 4) - wrong;

    if (confirm("Submit Test?")) {

        alert(
            "RESULT\n\n" +
            "Answered : " + answered +
            "\nCorrect : " + correct +
            "\nWrong : " + wrong +
            "\nUnanswered : " + unanswered +
            "\n\nMarks : " + marks
        );

    }

}


// ==========================
// Fullscreen
// ==========================

window.onload = async () => {

    if (sessionStorage.getItem("startExam")) {

        try {

            await document.documentElement.requestFullscreen();

        } catch (e) {}

    }

};


// ==========================
// Disable Right Click
// ==========================

document.addEventListener("contextmenu", e => e.preventDefault());


// ==========================
// Disable Text Selection
// ==========================

document.addEventListener("selectstart", e => e.preventDefault());


// ==========================
// Disable Drag
// ==========================

document.addEventListener("dragstart", e => e.preventDefault());


// ==========================
// Disable Common Shortcuts
// ==========================

document.addEventListener("keydown", e => {

    if (e.key === "F12") e.preventDefault();

    if (e.ctrlKey && ["u","U","s","S","p","P","c","C","v","V"].includes(e.key)) {

        e.preventDefault();

    }

    if (e.ctrlKey && e.shiftKey &&
        ["I","J","C"].includes(e.key)) {

        e.preventDefault();

    }

});


// ==========================
// Tab Switch Warning
// ==========================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        alert("Warning: You left the examination window.");

    }

});
