// api-service.js
export class ApiService {
    constructor() {
        this.config = {
            url: 'https://openrouter.ai/api/v1/chat/completions',
            model: 'tngtech/deepseek-r1t2-chimera:free',
            apiKey: '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',
            maxTokens: 2000,
            temperature: 0.7
        };
    }

    async getAIResponse(message, state) {
        const messages = this.prepareMessages(message, state);
        
        const response = await fetch(this.config.url, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({
                model: this.config.model,
                messages: messages,
                max_tokens: this.config.maxTokens,
                temperature: state.aiModes[state.currentMode].temperature,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    prepareMessages(message, state) {
        // Подготовка истории сообщений для API
    }

    getHeaders() {
        return {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Verdikt GPT Chat'
        };
    }

    async checkApiStatus() {
        // Проверка статуса API
    }
}