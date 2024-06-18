// Lista de cursores personalizados
const cursors = [
    'assets/cursors/boba.cur',
    'assets/cursors/kitty.cur',
    'assets/cursors/kuro.cur',
    'assets/cursors/kuromi.cur',
    'assets/cursors/mario.cur',
    'assets/cursors/melody.cur',
    'assets/cursors/miffy.cur',
    'assets/cursors/neko.cur',
    'assets/cursors/paw.cur',
    'assets/cursors/purple.cur',
    'assets/cursors/smiley.cur',
    'assets/cursors/star.cur',
];

// Função para selecionar um cursor aleatoriamente
function getRandomCursor() {
    const randomIndex = Math.floor(Math.random() * cursors.length);
    return cursors[randomIndex];
}

// Aplicar o cursor aleatório ao carregar a página
window.onload = function() {
    const randomCursor = getRandomCursor();
    document.body.style.cursor = `url(${randomCursor}), auto`;
    
    // Aplicar o cursor aleatório aos links e outros elementos interativos
    const elements = document.querySelectorAll('a, button');
    elements.forEach(element => {
        element.style.cursor = `url(${randomCursor}), auto`;
    });
};