document.addEventListener('DOMContentLoaded', function() {
    // Modo de exibição de fotos
    const photos = document.querySelectorAll('.photos img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('enlarged');
        });
    });

    // Proteção por senha
    const password = '18062023';  
    const input = document.getElementById('password');
    const keypad = document.getElementById('keypad');
    const clearButton = document.getElementById('clear');
    const enterButton = document.getElementById('enter');
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');

    keypad.addEventListener('click', function(event) {
        if (event.target.classList.contains('key')) {
            input.value += event.target.textContent;
        }
    });

    document.addEventListener('keydown', function(event) {
        if (!isNaN(event.key)) {
            input.value += event.key;
        } else if (event.key === 'Enter') {
            verifyPassword();
        } else if (event.key === 'Backspace') {
            input.value = input.value.slice(0, -1);
        }
    });

    clearButton.addEventListener('click', function() {
        input.value = '';
    });

    enterButton.addEventListener('click', verifyPassword);

    function verifyPassword() {
        if (input.value === password) {
            passwordScreen.style.display = 'none';
            mainContent.style.display = 'flex';
            showY2KContent();  // Chamar a função para mostrar as imagens Y2K
        } else {
            alert('Senha incorreta. Tente novamente.');
            input.value = '';
        }
    }


    // Tabs
    function openCity(evt, cityName) {
        var i, tabcontent, tab;
        
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        
        tab = document.getElementsByClassName("tab");
        for (i = 0; i < tab.length; i++) {
            tab[i].className = tab[i].className.replace(" active", "");
        }
        
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    // Tornar a função `openCity` disponível globalmente
    window.openCity = openCity;
});


// Data do evento (substitua com sua data desejada no formato 'YYYY-MM-DD')
const dataEvento = new Date('2025-06-18').getTime();

// Função para atualizar a contagem regressiva
function atualizarContagemRegressiva() {
    const agora = new Date().getTime();
    const diferenca = dataEvento - agora;

    // Calcular dias, horas, minutos e segundos restantes
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Atualizar o elemento HTML com a contagem regressiva
    document.getElementById('countdown-timer').innerHTML = `
        ${dias}d ${horas}h ${minutos}m ${segundos}s
    `;

    // Verificar se o evento já ocorreu
    if (diferenca < 0) {
        clearInterval(contagemRegressiva); // Parar a contagem regressiva quando o evento ocorrer
        document.getElementById('countdown-timer').innerHTML = 'O evento ocorreu!';
    }
}

// Chamar a função inicialmente para evitar um atraso na atualização
atualizarContagemRegressiva();

// Atualizar a contagem regressiva a cada segundo
const contagemRegressiva = setInterval(atualizarContagemRegressiva, 1000);

function abrirSurpresa() {
    const surpresas = [
        'Te amo kabeção',
        'voce eh meu funkpop favorito',
        'te amo mozao',
        'a eevee ta com saudade do seu chulé'
        
    ];

    const indiceAleatorio = Math.floor(Math.random() * surpresas.length);
    const surpresa = surpresas[indiceAleatorio];

    mostrarPopup(surpresa);
}

function mostrarPopup(surpresa) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="conteudo-popup">
            <span class="fechar" onclick="fecharPopup()">&times;</span>
            <p>${surpresa}</p>
        </div>
    `;
    document.body.appendChild(popup);
}

function fecharPopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}
