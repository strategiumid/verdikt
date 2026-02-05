// main.js
import { ApiService } from './api-service.js';
import { UIManager } from './ui-manager.js';
import { VoiceService } from './voice-service.js';
import { StorageService } from './storage-service.js';

class VerdiktChatApp {
    constructor() {
        this.apiService = new ApiService();
        this.uiManager = new UIManager();
        this.voiceService = new VoiceService();
        this.storageService = new StorageService();
        
        this.state = {
            conversationHistory: [],
            currentMode: 'balanced',
            messageCount: 0,
            // ... остальное состояние
        };
    }

    init() {
        this.setupEventListeners();
        this.loadFromStorage();
        this.setupBackgroundAnimations();
        this.updateUI();
        this.checkApiStatus();
        this.setupKeyboardShortcuts();
        
        console.log('Verdikt GPT - Эксперт по отношениям инициализирован');
    }

    setupEventListeners() {
        // Настройка обработчиков событий
    }

    async sendMessage() {
        const message = this.uiManager.getMessageInput().trim();
        
        if (!message) {
            this.uiManager.showNotification('Введите сообщение', 'warning');
            return;
        }

        if (!this.isTopicRelevant(message)) {
            this.uiManager.showNotification('Я специализируюсь только на отношениях...', 'warning');
            return;
        }

        this.addMessage(message, 'user');
        this.updateStats(message);
        
        try {
            this.uiManager.showTypingIndicator();
            const aiResponse = await this.apiService.getAIResponse(message, this.state);
            this.uiManager.hideTypingIndicator();
            
            this.addMessage(aiResponse, 'ai');
            this.uiManager.showNotification('Ответ получен ✅', 'success');
            
        } catch (error) {
            this.handleApiError(error);
        }
    }

    // ... остальные методы
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    const app = new VerdiktChatApp();
    app.init();
    window.VerdiktChat = app;
});