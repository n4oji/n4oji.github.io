document.addEventListener('DOMContentLoaded', function() {
    // Elementos da tela de senha
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');
    const clearButton = document.getElementById('clear');
    const enterButton = document.getElementById('enter');

    const password = '18062023';  
    const input = document.getElementById('password');
    const keypad = document.getElementById('keypad');

    const cloneKeypad = keypad.cloneNode(true);
    keypad.parentNode.replaceChild(cloneKeypad, keypad);
    
    // Redefinir referências após clonagem
    const keys = cloneKeypad.querySelectorAll('.key');
    const newClearButton = document.getElementById('clear');
    const newEnterButton = document.getElementById('enter');
    
    // Configurar eventos do teclado virtual
    keys.forEach(key => {
        key.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar comportamentos padrão
            input.value += this.textContent;
            console.log('Tecla virtual pressionada:', this.textContent);
        });
    });
    
    // Configurar evento para o botão Clear
    newClearButton.addEventListener('click', function(e) {
        e.preventDefault();
        input.value = '';
        console.log('Campo limpo');
    });
    
    // Configurar evento para o botão Enter
    newEnterButton.addEventListener('click', function(e) {
        e.preventDefault();
        verifyPassword();
        console.log('Verificando senha...');
    });
    
    // Configurar eventos para o teclado físico
    document.addEventListener('keydown', function(event) {
        // Apenas processar teclas quando a tela de senha estiver visível
        if (passwordScreen.style.display !== 'none') {
            if (!isNaN(event.key) && event.key !== ' ') {
                input.value += event.key;
                console.log('Tecla física pressionada:', event.key);
            } else if (event.key === 'Enter') {
                verifyPassword();
                console.log('Enter físico pressionado');
            } else if (event.key === 'Backspace') {
                input.value = input.value.slice(0, -1);
                console.log('Backspace pressionado');
            }
        }
    });
    
    // Função para verificar a senha
    function verifyPassword() {
        console.log('Verificando: ', input.value);
        if (input.value === password) {
            console.log('Senha correta! Abrindo site...');
            // Adicionando transição suave entre a tela de senha e a página principal
            document.body.classList.add('transition-active');
            passwordScreen.style.opacity = '0';
            passwordScreen.style.transition = 'opacity 0.8s ease-out';
            
            // Esperamos a transição terminar antes de esconder completamente
            setTimeout(() => {
                passwordScreen.style.display = 'none';
                mainContent.style.opacity = '0';
                mainContent.style.display = 'flex';
                
                // Fade in do conteúdo principal
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    mainContent.style.transition = 'all 0.8s ease-in';
                    // Forçamos a animação do gradiente a continuar suavemente
                    document.body.style.animation = 'none';
                    document.body.offsetHeight; // Trigger reflow
                    document.body.style.animation = 'gradient-animation 15s ease infinite';
                    showY2KContent();  // Chamar a função para mostrar as imagens Y2K
                }, 100);
            }, 800);
        } else {
            alert('Senha incorreta. Tente novamente.');
            input.value = '';
        }
    }

    
    // Função de debounce para evitar cliques duplos
    let lastClickTime = 0;
    function debounce(callback, delay = 300) {
        const now = new Date().getTime();
        if (now - lastClickTime > delay) {
            lastClickTime = now;
            callback();
        }
    }
    
});