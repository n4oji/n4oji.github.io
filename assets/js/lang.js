const translations = {
    en: 'assets/locale/en_us.json',
    pt: 'assets/locale/pt_br.json'
};

let currentLang = 'pt';
let swiperInstance;

document.getElementById('lang-toggle').addEventListener('click', function() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    loadLanguage(currentLang);
    this.textContent = currentLang === 'pt' ? 'EN' : 'PT';
});

function loadLanguage(lang) {
    fetch(translations[lang])
        .then(response => response.json())
        .then(data => {
            document.getElementById('home_button').textContent = data.home_button;
            document.getElementById('about_button').textContent = data.about_button;
            document.getElementById('resume_button').textContent = data.resume_button;
            document.getElementById('portfolio_button').textContent = data.portfolio_button;
            document.getElementById('services_button').textContent = data.services_button;

            document.getElementById('about_section').textContent = data.about_section;
            document.getElementById('about_text').textContent = data.about_text;
            document.getElementById('about_role').textContent = data.about_role;
            document.getElementById('about_desc').textContent = data.about_desc;
            document.getElementById('about_github').textContent = data.about_github;
            document.getElementById('about_github_text').textContent = data.about_github_text;
            document.getElementById('about_city').textContent = data.about_city;
            document.getElementById('about_city_text').textContent = data.about_city_text;
            document.getElementById('about_degree').textContent = data.about_degree;
            document.getElementById('about_degree_text').textContent = data.about_degree_text;
            document.getElementById('about_freelance').textContent = data.about_freelance;
            document.getElementById('about_freelance_text').textContent = data.about_freelance_text;
            document.getElementById('about_email').textContent = data.about_email;
            document.getElementById('about_email_text').textContent = data.about_email_text;

            document.getElementById('facts_section').textContent = data.facts_section;
            document.getElementById('facts_text').textContent = data.facts_text;
            document.getElementById('facts_products').textContent = data.facts_products;
            document.getElementById('facts_awards').textContent = data.facts_awards;
            document.getElementById('facts_awards_text').textContent = data.facts_awards_text;
            document.getElementById('facts_exp').textContent = data.facts_exp;
            document.getElementById('facts_brands').textContent = data.facts_brands;
            
            document.getElementById('skills_section').textContent = data.skills_section;
            document.getElementById('skills_text').textContent = data.skills_text;
            
            document.getElementById('resume_section').textContent = data.resume_section;
            document.getElementById('resume_title_text').textContent = data.resume_title_text;
            document.getElementById('resume_degree').textContent = data.resume_degree;
            document.getElementById('resume_degree_text').textContent = data.resume_degree_text;
            document.getElementById('resume_university').textContent = data.resume_university;
            document.getElementById('resume_text').textContent = data.resume_text;
            document.getElementById('resume_university').textContent = data.resume_university;
            document.getElementById('resume_degree_about').textContent = data.resume_degree_about;
            document.getElementById('resume_course_1').textContent = data.resume_course_1;
            document.getElementById('resume_course_1_desc').textContent = data.resume_course_1_desc;
            document.getElementById('resume_experience').textContent = data.resume_experience;
            document.getElementById('resume_experience_1').textContent = data.resume_experience_1;
            document.getElementById('resume_experience_1_1').textContent = data.resume_experience_1_1;
            document.getElementById('resume_experience_1_2').textContent = data.resume_experience_1_2;
            document.getElementById('resume_experience_1_3').textContent = data.resume_experience_1_3;
            document.getElementById('resume_experience_1_4').textContent = data.resume_experience_1_4;
            document.getElementById('resume_experience_1_5').textContent = data.resume_experience_1_5;
            document.getElementById('resume_experience_1_5_1').textContent = data.resume_experience_1_5_1;
            document.getElementById('resume_experience_2').textContent = data.resume_experience_2;
            document.getElementById('resume_experience_2_1').textContent = data.resume_experience_2_1;
            document.getElementById('resume_experience_2_2').textContent = data.resume_experience_2_2;
            
            document.getElementById('portfolio_section').textContent = data.portfolio_section;
            document.getElementById('portfolio_card').textContent = data.portfolio_card;

            document.getElementById('services_section').textContent = data.services_section;
            document.getElementById('services_text').textContent = data.services_text;
            document.getElementById('services_web').textContent = data.services_web;
            document.getElementById('services_web_text').textContent = data.services_web_text;
            document.getElementById('services_database').textContent = data.services_database;
            document.getElementById('services_database_text').textContent = data.services_database_text;
            document.getElementById('services_cloud').textContent = data.services_cloud;
            document.getElementById('services_cloud_text').textContent = data.services_cloud_text;
            document.getElementById('services_systems').textContent = data.services_systems;
            document.getElementById('services_systems_text').textContent = data.services_systems_text;
            document.getElementById('services_apps').textContent = data.services_apps;
            document.getElementById('services_apps_text').textContent = data.services_apps_text;
            document.getElementById('services_portfolio').textContent = data.services_portfolio;
            document.getElementById('services_portfolio_text').textContent = data.services_portfolio_text;

            document.getElementById('testimonial_section').textContent = data.testimonial_section;
            document.getElementById('testimonial_person1').textContent = data.testimonial_person1;
            document.getElementById('testimonial_person1_role').textContent = data.testimonial_person1_role;
            document.getElementById('testimonial_person1_text').textContent = data.testimonial_person1_text;
            document.getElementById('testimonial_person2').textContent = data.testimonial_person2;
            document.getElementById('testimonial_person2_role').textContent = data.testimonial_person2_role;
            document.getElementById('testimonial_person2_text').textContent = data.testimonial_person2_text;
            document.getElementById('testimonial_person3').textContent = data.testimonial_person3;
            document.getElementById('testimonial_person3_role').textContent = data.testimonial_person3_role;
            document.getElementById('testimonial_person3_text').textContent = data.testimonial_person3_text;
            
            document.getElementById('footer_text').textContent = data.footer_text;

            if (swiperInstance) {
                swiperInstance.destroy(true, true);
            }

            // Inicializar novamente o Swiper após a tradução
            swiperInstance = new Swiper('.testimonials-slider', {
                speed: 600,
                loop: true,
                autoplay: {
                delay: 5000,
                disableOnInteraction: true
                },
                slidesPerView: 'auto',
                pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
                },
                slidesPerView: 1,

            });
        
        })
        .catch(error => console.error('Error loading translation:', error));
}

// Load default language on page load
loadLanguage(currentLang);