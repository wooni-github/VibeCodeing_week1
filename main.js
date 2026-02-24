const numbersContainer = document.querySelector('.numbers');
const generateBtn = document.querySelector('#generate');

const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 46) + 1);
    }

    numbersContainer.innerHTML = '';
    for (const number of numbers) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.textContent = number;
        numbersContainer.appendChild(circle);
    }
};

generateBtn.addEventListener('click', generateNumbers);

generateNumbers();