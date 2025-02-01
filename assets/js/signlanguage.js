let recognition;
let recognizing = false;

// Initialize speech recognition
function initSpeechRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;  // Keeps recognizing even after pauses
    recognition.interimResults = true;  // Shows intermediate results
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        recognizing = true;
        document.getElementById('start-button').disabled = true;
        document.getElementById('stop-button').disabled = false;
        document.getElementById('speech-output').innerHTML = "Listening...";
    };

    recognition.onresult = function (event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('speech-output').innerHTML = transcript;
    };

    recognition.onerror = function (event) {
        console.error(event.error);
        recognition.stop();
    };

    recognition.onend = function () {
        recognizing = false;
        document.getElementById('start-button').disabled = false;
        document.getElementById('stop-button').disabled = true;
    };
}

// Start recording and speech recognition
function startRecording() {
    initSpeechRecognition();
    recognition.start();
}

// Stop recording and reset UI
function stopRecording() {
    if (recognizing) {
        recognition.stop();  // Stop the speech recognition
    }

    // Reset the UI
    document.getElementById('speech-output').innerHTML = "Recording stopped. Please click 'Start Recording' to speak again.";
    document.getElementById('start-button').disabled = false;  // Enable start button
    document.getElementById('stop-button').disabled = true;   // Disable stop button
}