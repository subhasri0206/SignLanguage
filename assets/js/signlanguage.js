let recognition;
let recognizing = false;

// Initialize speech recognition
function initSpeechRecognition() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function () {
        recognizing = true;
        document.getElementById('start-button').disabled = true;
        document.getElementById('stop-button').disabled = false;
        document.getElementById('speech-output').innerHTML = "Listening...";
        document.getElementById('sign-display').innerHTML = ""; // Clear previous signs
    };

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById('speech-output').innerHTML = transcript;
        displaySignLanguage(transcript);
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

// Start recording
function startRecording() {
    initSpeechRecognition();
    recognition.start();
}

// Stop recording
function stopRecording() {
    if (recognizing) {
        recognition.stop();
    }
    document.getElementById('speech-output').innerHTML = "Recording stopped. Click 'Start Recording' to speak again.";
    document.getElementById('start-button').disabled = false;
    document.getElementById('stop-button').disabled = true;
}

// Display sign language animations and highlight only the current animated letter
function displaySignLanguage(text) {
    let signContainer = document.getElementById('sign-display');
    signContainer.innerHTML = ""; // Clear previous signs

    let letters = text.toUpperCase().replace(/[^A-Z]/g, ""); // Extract only letters

    let sentenceContainer = document.createElement("div");
    sentenceContainer.classList.add("sentence-container");
    signContainer.appendChild(sentenceContainer);

    let index = 0;

    function showNextLetter() {
        if (index < letters.length) {
            signContainer.innerHTML = ""; // Clear previous video but keep the sentence

            // Highlight only the current letter
            let highlightedSentence = text
                .split("")
                .map((char, i) => {
                    if (char.toUpperCase() === letters[index] && i === text.toUpperCase().indexOf(letters[index], index)) {
                        return `<span class="highlight">${char}</span>`;
                    }
                    return char;
                })
                .join("");

            sentenceContainer.innerHTML = highlightedSentence;
            signContainer.appendChild(sentenceContainer);

            let letter = letters[index];

            let videoWrapper = document.createElement("div");
            videoWrapper.classList.add("video-wrapper");

            let video = document.createElement("video");
            video.src = `videos/${letter}.mp4`; // Sign videos should be stored in the "videos" folder
            video.alt = `Sign for ${letter}`;
            video.classList.add("sign-video");
            video.autoplay = true;
            video.loop = false;
            video.muted = true; // Mute video to avoid any sound

            let caption = document.createElement("div");
            caption.classList.add("sign-caption");
            // caption.innerText = letter; // Display the current letter

            videoWrapper.appendChild(video);
            videoWrapper.appendChild(caption);
            signContainer.appendChild(videoWrapper);

            video.onended = function () {
                index++;
                showNextLetter(); // Show the next letter after the current video ends
            };
        }
    }

    showNextLetter(); // Start the sequence
}
