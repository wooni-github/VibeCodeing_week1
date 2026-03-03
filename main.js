/**
 * Premium Lotto Generator
 * Modern JavaScript with Web Components
 */

// --- Web Components ---

class LottoBall extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        this.textContent = number;
        this.style.setProperty('--ball-color', this.getBallColor(parseInt(number)));
    }

    getBallColor(n) {
        if (n <= 10) return 'var(--ball-yellow)';
        if (n <= 20) return 'var(--ball-blue)';
        if (n <= 30) return 'var(--ball-red)';
        if (n <= 40) return 'var(--ball-gray)';
        return 'var(--ball-green)';
    }
}

customElements.define('lotto-ball', LottoBall);

// --- Core Logic ---

class LottoApp {
    constructor() {
        this.ballDisplay = document.getElementById('ball-display');
        this.generateBtn = document.getElementById('generate-trigger');
        this.themeBtn = document.getElementById('theme-toggle');
        this.historyList = document.getElementById('history-list');
        
        this.history = [];
        this.isGenerating = false;

        this.init();
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generateNumbers());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        
        // Load theme from preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.replace('light', 'dark');
        }
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark');
        document.body.classList.toggle('light', !isDark);
        
        // Update icons if lucide is available
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    async generateNumbers() {
        if (this.isGenerating) return;
        
        this.isGenerating = true;
        this.generateBtn.disabled = true;
        this.ballDisplay.innerHTML = '';

        const { main, bonus } = this.getRandomNumbers();
        
        // Render main numbers
        for (const num of main) {
            const ball = document.createElement('lotto-ball');
            ball.setAttribute('number', num);
            this.ballDisplay.appendChild(ball);
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Add separator
        const separator = document.createElement('span');
        separator.className = 'bonus-plus';
        separator.textContent = '+';
        this.ballDisplay.appendChild(separator);
        await new Promise(resolve => setTimeout(resolve, 150));

        // Render bonus number with a wrapper for the label
        const bonusWrapper = document.createElement('div');
        bonusWrapper.className = 'bonus-wrapper';
        
        const bonusBall = document.createElement('lotto-ball');
        bonusBall.setAttribute('number', bonus);
        bonusBall.classList.add('bonus-ball');
        
        const bonusLabel = document.createElement('span');
        bonusLabel.className = 'bonus-label';
        bonusLabel.textContent = 'BONUS';
        
        bonusWrapper.appendChild(bonusBall);
        bonusWrapper.appendChild(bonusLabel);
        this.ballDisplay.appendChild(bonusWrapper);
        
        this.addToHistory({ main, bonus });
        
        this.isGenerating = false;
        this.generateBtn.disabled = false;
    }

    getRandomNumbers() {
        const set = new Set();
        while (set.size < 7) {
            set.add(Math.floor(Math.random() * 45) + 1);
        }
        const allNumbers = Array.from(set);
        const bonus = allNumbers.pop();
        const main = allNumbers.sort((a, b) => a - b);
        return { main, bonus };
    }

    addToHistory(result) {
        this.history.unshift(result);
        if (this.history.length > 5) this.history.pop();

        this.renderHistory();
    }

    renderHistory() {
        this.historyList.innerHTML = '';
        this.history.forEach(result => {
            const { main, bonus } = result;
            const item = document.createElement('div');
            item.className = 'history-item';
            
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            item.innerHTML = `
                <div class="history-numbers">
                    ${main.map(n => `<div class="mini-ball" style="background: ${this.getBallColor(n)}">${n}</div>`).join('')}
                    <span class="history-plus">+</span>
                    <div class="mini-ball bonus" style="background: ${this.getBallColor(bonus)}">${bonus}</div>
                </div>
                <span style="font-size: 0.7rem; opacity: 0.6;">${time}</span>
            `;
            this.historyList.appendChild(item);
        });
    }

    getBallColor(n) {
        if (n <= 10) return 'oklch(85% 0.15 85)';
        if (n <= 20) return 'oklch(60% 0.2 250)';
        if (n <= 30) return 'oklch(60% 0.25 20)';
        if (n <= 40) return 'oklch(60% 0.05 260)';
        return 'oklch(65% 0.2 150)';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new LottoApp();
});
