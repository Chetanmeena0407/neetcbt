// Checkbox
const agree = document.getElementById("agree");

// Proceed Button
const proceedBtn = document.getElementById("proceedBtn");

// Disable button initially
proceedBtn.disabled = true;
proceedBtn.style.opacity = "0.6";
proceedBtn.style.cursor = "not-allowed";

// Enable button when checkbox checked
agree.addEventListener("change", function () {

    if (this.checked) {

        proceedBtn.disabled = false;
        proceedBtn.style.opacity = "1";
        proceedBtn.style.cursor = "pointer";

    } else {

        proceedBtn.disabled = true;
        proceedBtn.style.opacity = "0.6";
        proceedBtn.style.cursor = "not-allowed";

    }

});

// Proceed Button
proceedBtn.addEventListener("click", function () {

    if (!agree.checked) {

        alert("Please accept the instructions first.");
        return;

    }

    // Save Exam Flag
    sessionStorage.setItem("startExam", "true");

    // Redirect
    window.location.href = "exam.html";

});

// Disable Right Click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable Text Selection
document.addEventListener("selectstart", function (e) {
    e.preventDefault();
});

// Disable Drag
document.addEventListener("dragstart", function (e) {
    e.preventDefault();
});

// Disable Common Keyboard Shortcuts
document.addEventListener("keydown", function (e) {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }

    // Ctrl + Shift + I/J/C
    if (
        e.ctrlKey &&
        e.shiftKey &&
        (
            e.key === "I" ||
            e.key === "J" ||
            e.key === "C"
        )
    ) {
        e.preventDefault();
    }

    // Ctrl + U
    if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
    }

    // Ctrl + S
    if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
    }

    // Ctrl + P
    if (e.ctrlKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
    }

    // Ctrl + C
    if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
    }

    // Ctrl + V
    if (e.ctrlKey && (e.key === "v" || e.key === "V")) {
        e.preventDefault();
    }

});