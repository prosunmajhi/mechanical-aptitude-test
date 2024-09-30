// User info form submission
document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user inputs
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Save name and phone number in a global variable
    window.userInfo = { name, phone };

    // Hide the welcome section and show the quiz
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Start the quiz
    populate();
});

// Populate the quiz with questions
function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // Show question
        const element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // Show options
        const choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            const choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("bt" + i, choices[i]);
        }

        showProgress();
    }
}

// Handle user's guesses
function guess(id, guess) {
    const button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    };
}

// Show the progress of the quiz
function showProgress() {
    const currentQuestionNumber = quiz.questionIndex + 1;
    const element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

// Show the scores at the end of the quiz
function showScores() {
    const gameOverHTML = `
        <h1>Result</h1>
        <h2 id='score'> Your score: ${quiz.score}</h2>
    `;
    const element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

    // Send data to Google Sheets
    sendToGoogleSheets(window.userInfo.name, window.userInfo.phone, quiz.score);
}

// Send data to Google Sheets
function sendToGoogleSheets(name, phone, score) {
    const url = 'https://script.google.com/macros/s/AKfycbyla1NTfgm5XxQA9wB7vsvV-pYtb-VnJ9hllANhXpAI87eZrgxhH_n4XPKSavGraV20uQ/exec';
    
    fetch(`${url}?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&score=${encodeURIComponent(score)}`)
        .then(response => {
            if (response.ok) {
                console.log('Data saved successfully');
            } else {
                console.error('Error saving data');
            }
        })
        .catch(error => console.error('Fetch error:', error));
}

// Create questions
const questions = [
    new Question("What is the purpose of a crankshaft?", ["To convert reciprocating motion into rotary motion", "To convert rotary motion into reciprocating motion", "To increase engine speed", "To decrease engine torque"], "To convert reciprocating motion into rotary motion"),
    new Question("Which type of stress is responsible for deformation?", ["Tensile stress", "Compressive stress", "Shear stress", "All of the above"], "All of the above"),
    new Question("What is the term for the flow of fluid through a pipe?", ["Laminar flow", "Turbulent flow", "Viscous flow", "Compressible flow"], "Laminar flow"),
    new Question("Which material is commonly used for making brake pads?", ["Steel", "Cast iron", "Aluminum", "Ceramic"], "Ceramic"),
    new Question("What is the purpose of a governor in a engine?", ["To regulate engine speed", "To increase engine power", "To decrease engine torque", "To improve engine efficiency"], "To regulate engine speed"),
    new Question("Which type of bearing is used for high-speed applications?", ["Ball bearing", "Roller bearing", "Journal bearing", "Thrust bearing"], "Ball bearing"),
    new Question("What is the term for the ratio of output power to input power?", ["Efficiency", "Mechanical advantage", "Torque", "Speed"], "Efficiency"),
    new Question("Which material is commonly used for making exhaust systems?", ["Steel", "Aluminum", "Copper", "Stainless steel"], "Stainless steel"),
    new Question("What is the purpose of a clutch in a vehicle?", ["To engage/disengage engine from transmission", "To increase engine power", "To decrease engine torque", "To improve engine efficiency"], "To engage/disengage engine from transmission"),
    new Question("What is the basic principle of refrigeration?", ["Compression", "Expansion", "Conduction", "Convection"], "Compression"),
    new Question("Which of the following is a type of mechanical advantage?", ["Lever", "Pulley", "Gear", "All of the above"], "All of the above"),
    new Question("What is the purpose of a flywheel in an engine?", ["To increase power", "To decrease speed", "To store energy", "To reduce vibration"], "To store energy"),
    new Question("Which material is commonly used for making engine blocks?", ["Aluminum", "Copper", "Steel", "Cast iron"], "Cast iron"),
    new Question("What is the term for the resistance of a fluid to flow?", ["Viscosity", "Density", "Pressure", "Temperature"], "Viscosity"),
    new Question("Which type of bearing is used for heavy loads?", ["Ball bearing", "Roller bearing", "Journal bearing", "Thrust bearing"], "Roller bearing"),
    new Question("What is the purpose of a heat exchanger?", ["To transfer heat", "To transfer mass", "To generate power", "To control flow"], "To transfer heat"),
    new Question("Which of the following is a type of stress?", ["Tensile stress", " Compressive stress", "Shear stress", "All of the above"], " All of the above"),
    new Question("What is the term for the ratio of output force to input force?", ["Mechanical advantage", "Efficiency", "Torque", "Speed"], "Mechanical advantage"),
    new Question("Which material is commonly used for making brake pads?", ["Steel", "Cast iron", "Aluminum", "Ceramic"], "Ceramic"),
];

const quiz = new Quiz(questions);
