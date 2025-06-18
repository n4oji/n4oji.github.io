const translations = {
    en: 'assets/locale/en_us.json',
    pt: 'assets/locale/pt_br.json'
};

let currentLang = 'pt';
let swiperInstance;

// Função específica para traduzir apenas a experiência 3
function translateExperience3(lang) {
    fetch(translations[lang])
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
            
            console.log('Traduções da experiência 3 aplicadas manualmente');
        })
        .catch(err => console.error('Erro ao traduzir experiência 3:', err));
}

document.getElementById('lang-toggle').addEventListener('click', function() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    loadLanguage(currentLang);
    // Traduzir experiência 3 separadamente para garantir
    setTimeout(() => translateExperience3(currentLang), 300);
    this.textContent = currentLang === 'pt' ? 'EN' : 'PT';
});

function loadLanguage(lang) {
    console.log('Carregando idioma:', lang);
    fetch(translations[lang])
        .then(response => response.json())
        .then(data => {
            // Função auxiliar para traduzir com segurança
            function safeTranslate(id, text) {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = text;
                } else {
                    console.warn(`Elemento com ID '${id}' não encontrado`);
                }
            }
            safeTranslate('home_button', data.home_button);
            safeTranslate('about_button', data.about_button);
            safeTranslate('resume_button', data.resume_button);
            safeTranslate('portfolio_button', data.portfolio_button);
            safeTranslate('services_button', data.services_button);

            safeTranslate('about_section', data.about_section);
            safeTranslate('about_text', data.about_text);
            safeTranslate('about_role', data.about_role);
            safeTranslate('about_desc', data.about_desc);
            safeTranslate('about_github', data.about_github);
            safeTranslate('about_github_text', data.about_github_text);
            safeTranslate('about_city', data.about_city);
            safeTranslate('about_city_text', data.about_city_text);
            safeTranslate('about_degree', data.about_degree);
            safeTranslate('about_degree_text', data.about_degree_text);
            safeTranslate('about_freelance', data.about_freelance);
            safeTranslate('about_freelance_text', data.about_freelance_text);
            safeTranslate('about_email', data.about_email);
            safeTranslate('about_email_text', data.about_email_text);

            safeTranslate('facts_section', data.facts_section);
            safeTranslate('facts_text', data.facts_text);
            safeTranslate('facts_products', data.facts_products);
            safeTranslate('facts_awards', data.facts_awards);
            safeTranslate('facts_awards_text', data.facts_awards_text);
            safeTranslate('facts_exp', data.facts_exp);
            safeTranslate('facts_brands', data.facts_brands);
            
            safeTranslate('skills_section', data.skills_section);
            safeTranslate('skills_text', data.skills_text);
            
            safeTranslate('resume_section', data.resume_section);
            safeTranslate('resume_title_text', data.resume_title_text);
            safeTranslate('resume_degree', data.resume_degree);
            safeTranslate('resume_degree_text', data.resume_degree_text);
            safeTranslate('resume_university', data.resume_university);
            safeTranslate('resume_text', data.resume_text);
            safeTranslate('resume_degree_about', data.resume_degree_about);
            safeTranslate('resume_course_1', data.resume_course_1);
            safeTranslate('resume_course_1_desc', data.resume_course_1_desc);
            safeTranslate('resume_course_2', data.resume_course_2);
            // O elemento resume_course_2_desc está comentado no HTML, então não precisamos traduzir aqui
            safeTranslate('resume_experience', data.resume_experience);
            safeTranslate('resume_experience_1', data.resume_experience_1);
            safeTranslate('resume_experience_1_1', data.resume_experience_1_1);
            safeTranslate('resume_experience_1_2', data.resume_experience_1_2);
            safeTranslate('resume_experience_1_3', data.resume_experience_1_3);
            safeTranslate('resume_experience_1_4', data.resume_experience_1_4);
            safeTranslate('resume_experience_1_5', data.resume_experience_1_5);
            safeTranslate('resume_experience_1_5_1', data.resume_experience_1_5_1);
            safeTranslate('resume_experience_2', data.resume_experience_2);
            safeTranslate('resume_experience_2_1', data.resume_experience_2_1);
            safeTranslate('resume_experience_2_2', data.resume_experience_2_2);
            // Aplicar traduções específicas para experiência 3 com verificação especial
            console.log('Traduzindo resume_experience_3:', data.resume_experience_3);
            
            // Verificação extra para os elementos da experiência 3
            setTimeout(function() {
                console.log('Verificação adicional para experiência 3');
                const exp3 = document.getElementById('resume_experience_3');
                const exp3_1 = document.getElementById('resume_experience_3_1');
                const exp3_2 = document.getElementById('resume_experience_3_2');
                const exp3_3 = document.getElementById('resume_experience_3_3');
                
                if (exp3) exp3.textContent = data.resume_experience_3;
                if (exp3_1) exp3_1.textContent = data.resume_experience_3_1;
                if (exp3_2) exp3_2.textContent = data.resume_experience_3_2;
                if (exp3_3) exp3_3.textContent = data.resume_experience_3_3;
            }, 500);
            
            safeTranslate('resume_experience_3', data.resume_experience_3);
            safeTranslate('resume_experience_3_1', data.resume_experience_3_1);
            safeTranslate('resume_experience_3_2', data.resume_experience_3_2);
            safeTranslate('resume_experience_3_3', data.resume_experience_3_3);
            
            safeTranslate('portfolio_section', data.portfolio_section);
            safeTranslate('portfolio_card', data.portfolio_card);

            safeTranslate('services_section', data.services_section);
            safeTranslate('services_text', data.services_text);
            safeTranslate('services_web', data.services_web);
            safeTranslate('services_web_text', data.services_web_text);
            safeTranslate('services_database', data.services_database);
            safeTranslate('services_database_text', data.services_database_text);
            safeTranslate('services_cloud', data.services_cloud);
            safeTranslate('services_cloud_text', data.services_cloud_text);
            safeTranslate('services_systems', data.services_systems);
            safeTranslate('services_systems_text', data.services_systems_text);
            safeTranslate('services_apps', data.services_apps);
            safeTranslate('services_apps_text', data.services_apps_text);
            safeTranslate('services_portfolio', data.services_portfolio);
            safeTranslate('services_portfolio_text', data.services_portfolio_text);

            safeTranslate('testimonial_section', data.testimonial_section);
            
            safeTranslate('footer_text', data.footer_text);

        
        })
        .catch(error => console.error('Error loading translation:', error));
}

// A inicialização do idioma agora é feita pelo arquivo translation-init.js
console.log('Script de tradução carregado, aguardando inicialização...');
// Não carregamos o idioma aqui para evitar problemas com elementos ainda não carregados no DOM