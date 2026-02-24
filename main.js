const numbersContainer = document.querySelector('.numbers');
const generateBtn = document.querySelector('#generate');
const toggleThemeBtn = document.querySelector('#toggle-theme');

// Theme Toggle Logic
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    toggleThemeBtn.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateNumbers = async () => {
    // Disable button during animation
    generateBtn.disabled = true;
    
    // Generate 6 unique numbers
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 46) + 1);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // Clear previous numbers
    numbersContainer.innerHTML = '';

    // Add balls sequentially
    for (const number of sortedNumbers) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.textContent = number;
        
        // Add dynamic color based on number ranges (optional aesthetic touch)
        if (number <= 10) circle.style.backgroundColor = '#fbc02d'; // Yellow
        else if (number <= 20) circle.style.backgroundColor = '#1976d2'; // Blue
        else if (number <= 30) circle.style.backgroundColor = '#d32f2f'; // Red
        else if (number <= 40) circle.style.backgroundColor = '#7b1fa2'; // Purple
        else circle.style.backgroundColor = '#388e3c'; // Green

        numbersContainer.appendChild(circle);
        
        // Wait before showing the next ball
        await delay(600); 
    }

    // Re-enable button
    generateBtn.disabled = false;
};

generateBtn.addEventListener('click', generateNumbers);

// Initial run
generateNumbers();
