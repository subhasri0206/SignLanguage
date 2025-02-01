import speech_recognition as sr

def speech_to_text():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        try:
            print("Listening for audio...")
            audio = recognizer.listen(source, timeout=5)  # Adjust timeout if needed
            text = recognizer.recognize_google(audio)
            return {"status": "success", "text": text}
        except sr.UnknownValueError:
            return {"status": "error", "text": "Could not understand audio."}
        except sr.RequestError as e:
            return {"status": "error", "text": f"Error: {e}"}
        except Exception as e:
            return {"status": "error", "text": f"Unexpected error: {e}"}
