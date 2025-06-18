document.addEventListener('DOMContentLoaded', function() {
    // Elementos da tela de senha
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password');
    const keypadButtons = document.querySelectorAll('.key');
    const clearButton = document.getElementById('clear');
    const enterButton = document.getElementById('enter');
    
    // Senha correta (data de aniversário de namoro: 18/06/2022)
    // Você pode alterar para a data real
    const correctPassword = "18062022";
    
    // Adicionar event listeners aos botões do teclado
    keypadButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Adicionar o valor ao campo de senha
            passwordInput.value += button.textContent;
        });
    });
    
    // Botão Clear
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            passwordInput.value = '';
        });
    }
    
    // Botão Enter
    if (enterButton) {
        enterButton.addEventListener('click', function() {
            // Verificar se a senha está correta
            if (passwordInput.value === correctPassword) {
                // Senha correta, mostrar conteúdo principal
                passwordScreen.style.opacity = '0';
                setTimeout(() => {
                    passwordScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Pequeno delay para tornar a transição mais suave
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 50);
                }, 800);
            } else {
                // Senha incorreta, limpar o campo e adicionar efeito de erro
                passwordInput.classList.add('error');
                passwordInput.value = '';
                
                // Remover a classe de erro após a animação
                setTimeout(() => {
                    passwordInput.classList.remove('error');
                }, 500);
            }
        });
    }
});
