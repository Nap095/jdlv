document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');

    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => {
            square.style.backgroundColor = getRandomColor(i);
        });
        grid.appendChild(square);
    }
});

function getRandomColor(x) {
    // x est un argement passé à la fonction
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
