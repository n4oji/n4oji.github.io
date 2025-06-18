// Arquivo de inicialização de tradução
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado, inicializando traduções');
    
    // Pequeno delay para garantir que todos os elementos estejam prontos
    setTimeout(function() {
        // Carregar o idioma padrão
        if (typeof loadLanguage === 'function') {
            console.log('Carregando idioma inicial');
            loadLanguage(currentLang || 'pt');
        } else {
            console.error('Função loadLanguage não encontrada!');
        }
        
        // Verificação específica para elementos de experiência 3
        setTimeout(function() {
            console.log('Verificação específica para elementos de experiência 3');
            // Usar a função específica para traduzir a experiência 3
            if (typeof translateExperience3 === 'function') {
                translateExperience3(currentLang || 'pt');
            } else {
                console.error('Função translateExperience3 não encontrada!');
                
                // Fallback se a função não existir
                const lang = currentLang || 'pt';
                fetch('assets/locale/' + (lang === 'pt' ? 'pt_br.json' : 'en_us.json'))
                    .then(response => response.json())
                    .then(data => {
                        const exp3 = document.getElementById('resume_experience_3');
                        const exp3_1 = document.getElementById('resume_experience_3_1');
                        const exp3_2 = document.getElementById('resume_experience_3_2');
                        const exp3_3 = document.getElementById('resume_experience_3_3');
                        
                        if (exp3) exp3.textContent = data.resume_experience_3;
                        if (exp3_1) exp3_1.textContent = data.resume_experience_3_1;
                        if (exp3_2) exp3_2.textContent = data.resume_experience_3_2;
                        if (exp3_3) exp3_3.textContent = data.resume_experience_3_3;
                    })
                    .catch(err => console.error('Erro ao carregar traduções específicas:', err));
            }
        }, 1000);
    }, 100);
});
