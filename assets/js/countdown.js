document.addEventListener('DOMContentLoaded', function() {
    // Data do terceiro aniversário (18 de junho de 2025)
    // Substitua esta data pela data real do seu aniversário de 3 anos
    const anniversaryDate = new Date('June 18, 2026 00:00:00').getTime();
    
    // Elemento que exibirá o contador
    const countdownElement = document.getElementById('countdown-timer');
    
    if (countdownElement) {
        // Função para atualizar o contador
        function updateCountdown() {
            // Data atual
            const now = new Date().getTime();
            
            // Diferença entre a data atual e o aniversário
            const distance = anniversaryDate - now;
            
            // Cálculo de dias, horas, minutos e segundos
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Atualizar o elemento HTML
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">dias</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">horas</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">minutos</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">segundos</span>
                </div>
            `;
            
            // Se já tiver passado a data do aniversário
            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "Feliz 3 anos de namoro! ❤️";
            }
        }
        
        // Atualizar a cada segundo
        updateCountdown();
        const countdownTimer = setInterval(updateCountdown, 1000);
    }
});
