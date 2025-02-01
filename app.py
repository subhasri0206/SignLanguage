# import tkinter as tk
# import speech_recognition as sr
# from tkinter import messagebox
# def Speech_to_Text():
#     r = sr.Recognizer()
#     with sr.Microphone() as source:
#         try:
#             audio = r.listen(source)
#             text = r.recognize_google(audio)
#             txtSpeech.insert(tk.END, text + "\n")

#         except sr.UnknownValueError:
#             txtSpeech.insert(tk.END, "Could not understand audio\n")
#         except sr.RequestError as e:
#             txtSpeech.insert(tk.END, "Error: {0}\n".format(e))

            
# def reset_txtSpeech():
#     txtSpeech.delete("1.0", tk.END)   

# def exit_system():
#     result = messagebox.askyesno('Speech to Text', 'Do you want to exit?')
#     if result == True:
#         root.destroy()
#         return

# root = tk.Tk()
# root.title("Speech to Text")

# MainFrame =tk.Frame(root, bd=20, width=900, height=300)
# MainFrame.pack()

# lblTitle = tk.Label(MainFrame, text="Speech to Text", font=('arial', 40, 'bold'), width= 18)
# lblTitle.pack()

# txtSpeech = tk.Text(MainFrame, font=('arial', 30, 'bold'), width = 68, height = 12)
# txtSpeech.pack()

# btnConvert = tk.Button(MainFrame, font = ('arial', 20, 'bold'), text = "Convert to Text", command = Speech_to_Text, width = 20, height = 2)
# btnConvert.pack(side = tk.LEFT, padx = 80)

# btnReset = tk.Button(MainFrame, font = ('arial', 20, 'bold'), text = "Reset", command = reset_txtSpeech, width = 20, height = 2)
# btnReset.pack(side = tk.LEFT, padx = 80)

# btnExit = tk.Button(MainFrame, font = ('arial', 20, 'bold'), text = "Exit", command = exit_system, width = 20, height = 2)
# btnExit.pack(side = tk.LEFT, padx = 80)

# root.mainloop()


from flask import Flask, render_template, jsonify, request
from speech_to_text import speech_to_text

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/speech-to-text', methods=['POST'])
def handle_speech_to_text():
    if request.method == 'POST':
        result = speech_to_text()
        return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
