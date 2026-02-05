// storage-service.js
export class StorageService {
    constructor() {
        this.prefix = 'verdikt_';
    }

    save(key, data) {
        const storageKey = this.prefix + key;
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    load(key) {
        const storageKey = this.prefix + key;
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : null;
    }

    saveChat(chatData) {
        const savedChats = this.load('saved_chats') || [];
        savedChats.push(chatData);
        this.save('saved_chats', savedChats);
        return savedChats.length;
    }

    loadChats() {
        return this.load('saved_chats') || [];
    }

    saveStats(stats) {
        this.save('stats', stats);
    }

    loadStats() {
        return this.load('stats') || {};
    }

    saveTheme(theme) {
        this.save('theme', theme);
    }

    loadTheme() {
        return this.load('theme') || 'dark';
    }

    saveAchievements(achievements) {
        this.save('achievements', achievements);
    }

    loadAchievements() {
        return this.load('achievements') || {};
    }

    clear() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}