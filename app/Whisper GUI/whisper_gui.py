import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import tkinter.scrolledtext as st
import whisper
import threading
import queue

# Set up the main window
root = tk.Tk()
root.title("Whisper Transcription GUI")
root.geometry("600x400")

# Variables to store selections
file_path_var = tk.StringVar()
model_size_var = tk.StringVar(value="base")  # Default to 'base'
result_queue = queue.Queue()

# Functions
def select_file():
    file_path = filedialog.askopenfilename(
        filetypes=[("Audio files", "*.mp3 *.wav *.m4a *.ogg *.flac")]
    )
    if file_path:
        file_path_var.set(file_path)

def transcribe_audio(file_path, model_size):
    try:
        status_label.config(text="Loading model...")
        model = whisper.load_model(model_size)
        status_label.config(text="Transcribing...")
        result = model.transcribe(file_path)
        transcript = result["text"]
        result_queue.put(transcript)
    except Exception as e:
        result_queue.put(f"Error: {str(e)}")

def start_transcription():
    file_path = file_path_var.get()
    model_size = model_size_var.get()
    if not file_path or not model_size:
        messagebox.showwarning("Warning", "Please select an audio file and a model size.")
        return
    status_label.config(text="Starting...")
    thread = threading.Thread(target=transcribe_audio, args=(file_path, model_size))
    thread.start()

def check_queue():
    try:
        result = result_queue.get_nowait()
        if result.startswith("Error:"):
            messagebox.showerror("Error", result)
            status_label.config(text="")
        else:
            text_area.config(state=tk.NORMAL)
            text_area.delete(1.0, tk.END)
            text_area.insert(tk.END, result)
            text_area.config(state=tk.DISABLED)
            status_label.config(text="Done.")
    except queue.Empty:
        pass
    root.after(100, check_queue)

# GUI Layout
# Audio file selection
tk.Label(root, text="Select audio file:").grid(row=0, column=0, padx=5, pady=5, sticky="w")
tk.Button(root, text="Browse...", command=select_file).grid(row=0, column=1, padx=5, pady=5)
tk.Label(root, textvariable=file_path_var, wraplength=400).grid(row=1, column=0, columnspan=2, padx=5, pady=5, sticky="w")
tk.Label(root, text="Supported formats: mp3, wav, m4a, ogg, flac").grid(row=2, column=0, columnspan=2, padx=5, pady=5, sticky="w")

# Model size selection
tk.Label(root, text="Select model size:").grid(row=3, column=0, padx=5, pady=5, sticky="w")
model_combo = ttk.Combobox(root, textvariable=model_size_var, values=["tiny", "base", "small", "medium", "large"], state="readonly")
model_combo.grid(row=3, column=1, padx=5, pady=5)

# Transcribe button
tk.Button(root, text="Transcribe", command=start_transcription).grid(row=4, column=0, columnspan=2, pady=10)

# Status label
status_label = tk.Label(root, text="")
status_label.grid(row=5, column=0, columnspan=2, pady=5)

# Transcript display
text_area = st.ScrolledText(root, wrap=tk.WORD, width=70, height=15, state=tk.DISABLED)
text_area.grid(row=6, column=0, columnspan=2, padx=5, pady=5)

# Start checking the queue
root.after(100, check_queue)

# Run the application
root.mainloop()