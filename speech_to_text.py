import tkinter as tk
import speech_recognition as sr
from tkinter import messagebox
def Speech_to_Text():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        try:
            audio = r.listen(source)
            text = r.recognize_google(audio)
            txtSpeech.insert(tk.END, text + "\n")

        except sr.UnknownValueError:
            txtSpeech.insert(tk.END, "Could not understand audio\n")
        except sr.RequestError as e:
            txtSpeech.insert(tk.END, "Error: {0}\n".format(e))

            
def reset_txtSpeech():
    txtSpeech.delete("1.0", tk.END)   

def exit_system():
    result = messagebox.askyesno('Speech to Text', 'Do you want to exit?')
    if result == True:
        root.destroy()
        return