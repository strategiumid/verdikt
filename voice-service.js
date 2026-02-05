// voice-service.js
export class VoiceService {
    constructor() {
        this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechSynthesis = window.speechSynthesis;
        this.recognition = null;
        this.isRecording = false;
        this.isSpeaking = false;
        
        this.initSpeechRecognition();
    }

    initSpeechRecognition() {
        if (this.SpeechRecognition) {
            this.recognition = new this.SpeechRecognition();
            this.recognition.lang = 'ru-RU';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.setupRecognitionEvents();
        }
    }

    setupRecognitionEvents() {
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.onTranscript(transcript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            this.onError(event.error);
        };
    }

    toggleRecording() {
        if (!this.recognition) return false;
        
        if (!this.isRecording) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
        
        return true;
    }

    startRecording() {
        this.isRecording = true;
        this.recognition.start();
    }

    stopRecording() {
        this.isRecording = false;
        this.recognition.stop();
    }

    speakText(text) {
        if (this.isSpeaking) {
            this.stopSpeaking();
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU';
        utterance.rate = 1;
        utterance.pitch = 1;
        
        utterance.onstart = () => {
            this.isSpeaking = true;
        };
        
        utterance.onend = () => {
            this.isSpeaking = false;
        };
        
        this.speechSynthesis.speak(utterance);
    }

    stopSpeaking() {
        this.speechSynthesis.cancel();
        this.isSpeaking = false;
    }
}