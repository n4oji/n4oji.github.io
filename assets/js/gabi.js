document.addEventListener('DOMContentLoaded', function() {
    // Ajusta a altura da página para garantir que o gradiente seja consistente
    function adjustHeight() {
        const windowHeight = window.innerHeight;
        const bodyElement = document.querySelector('.boddy');
        bodyElement.style.minHeight = `${windowHeight}px`;
        
        // Não sobrescrevemos mais o gradiente, para manter consistência com o password-screen
    }
    
    // Função para detectar dispositivos de baixa performance
    function isLowPerformanceDevice() {
        const memory = navigator.deviceMemory;
        const cpuCores = navigator.hardwareConcurrency;
        
        // Se essas APIs não estiverem disponíveis ou indicarem limitações de hardware
        if ((memory !== undefined && memory < 4) || 
            (cpuCores !== undefined && cpuCores < 4)) {
            return true;
        }
        
        return false;
    }
    
    // Ajusta a altura inicialmente e quando a janela for redimensionada
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    
    // Modo de exibição de fotos
    const photos = document.querySelectorAll('.photos img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('enlarged');
        });
    });

    // Proteção por senha - código completamente reescrito para garantir o funcionamento
    const password = '18062023';  
    const input = document.getElementById('password');
    const keypad = document.getElementById('keypad');
    const clearButton = document.getElementById('clear');
    const enterButton = document.getElementById('enter');
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');
    
    // Verificação inicial para depuração
    console.log('Inicializando sistema de senha...');
    console.log('Input:', input ? 'encontrado' : 'não encontrado');
    console.log('Keypad:', keypad ? 'encontrado' : 'não encontrado');
    console.log('Clear button:', clearButton ? 'encontrado' : 'não encontrado');
    console.log('Enter button:', enterButton ? 'encontrado' : 'não encontrado');
    
    // Verificar se todos os elementos necessários existem
    if (!input || !keypad || !clearButton || !enterButton || !passwordScreen || !mainContent) {
        console.error('Elementos de senha não encontrados!');
        // Se estiverem faltando elementos, mostrar o conteúdo principal diretamente
        if (mainContent) {
            mainContent.style.display = 'flex';
            mainContent.style.opacity = '1';
        }
        if (passwordScreen) {
            passwordScreen.style.display = 'none';
        }
        return; // Encerrar a função para evitar erros
    }
    
    // Limpar quaisquer eventos anteriores para evitar duplicação
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


    // Tabs
    function openCity(evt, cityName) {
        // Marcar a aba como ativa
        var tab = document.getElementsByClassName("tab");
        for (var i = 0; i < tab.length; i++) {
            tab[i].className = tab[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";
        
        // Obter o conteúdo da aba
        var tabContent = document.getElementById(cityName);
        
        // Criar elementos do modal
        var modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.id = 'modal-' + cityName;
        
        var modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        var modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        
        var modalTitle = document.createElement('h3');
        modalTitle.textContent = cityName;
        
        var closeButton = document.createElement('div');
        closeButton.className = 'modal-close';
        closeButton.textContent = 'X';
        closeButton.onclick = function() {
            closeModal('modal-' + cityName);
        };
        
        var modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        // Clonar o conteúdo da aba para o modal
        if (cityName === "Galeria") {
            // Tratamento especial para a galeria
            // Primeiro criamos uma cópia do HTML
            modalBody.innerHTML = tabContent.querySelector('.inside').innerHTML;
            
            // Reinicializar os ouvintes de eventos para os itens da galeria
            var galleryItems = modalBody.querySelectorAll('.gallery-item');
            if (galleryItems && galleryItems.length > 0) {
                galleryItems.forEach(function(item) {
                    // Certifique-se de que a imagem é clicável
                    item.style.cursor = 'pointer';
                    
                    // Remova qualquer listener existente e adicione um novo
                    item.onclick = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var imgSrc = this.getAttribute('data-image');
                        var caption = this.getAttribute('data-caption');
                        openGalleryModal(imgSrc, caption);
                    };
                    
                    // Também torne a imagem dentro do item clicável
                    var img = item.querySelector('img');
                    if (img) {
                        img.style.cursor = 'pointer';
                        img.onclick = function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            var imgSrc = item.getAttribute('data-image');
                            var caption = item.getAttribute('data-caption');
                            openGalleryModal(imgSrc, caption);
                        };
                    }
                });
            }
        } else {
            // Comportamento padrão para outros conteúdos
            modalBody.innerHTML = tabContent.querySelector('.inside').innerHTML;
        }
        
        // Montar estrutura do modal
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContainer.appendChild(modalHeader);
        modalContainer.appendChild(modalBody);
        modalOverlay.appendChild(modalContainer);
        
        // Adicionar modal ao DOM
        document.body.appendChild(modalOverlay);
        
        // Exibir o modal com animação
        setTimeout(function() {
            modalOverlay.classList.add('active');
        }, 10);
        
        // Adicionar evento de fechar clicando fora do modal
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal('modal-' + cityName);
            }
        });
        
        // Adicionar evento de tecla Escape para fechar
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('modal-' + cityName)) {
                closeModal('modal-' + cityName);
            }
        });
    }
    
    // Função para fechar o modal
    function closeModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('fade-out');
            
            // Remover o modal do DOM após a animação terminar
            setTimeout(function() {
                if (modal && modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    }

    // Tornar funções disponíveis globalmente
    window.openCity = openCity;
    window.closeModal = closeModal;
});


// Data do evento (substitua com sua data desejada no formato 'YYYY-MM-DD')
const dataEvento = new Date('2026-06-18T00:00:00-03:00').getTime();
let contagemRegressiva; // Corrige o escopo da variável

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
contagemRegressiva = setInterval(atualizarContagemRegressiva, 1000);


function fecharPopup() {
    const popup = document.querySelector('.popup');
    const overlay = document.querySelector('div[style*="backdrop-filter"]');
    
    if (popup) {
        // Adicionamos uma animação de saída
        popup.style.animation = 'popup-exit 0.3s forwards';
        
        // Removemos após a animação terminar
        setTimeout(() => {
            popup.remove();
            if (overlay) overlay.remove();
        }, 300);
    } else if (overlay) {
        overlay.remove();
    }
}

// Adicionamos a keyframe da animação de saída
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes popup-exit {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -70%);
            }
        }
    </style>
`);

// Funções para a galeria modal
let currentImageIndex = 0;
const galleryImages = [
    {src: 'assets/img/gabi/1.jpg', caption: 'Nosso primeiro encontro'},
    {src: 'assets/img/gabi/2.jpg', caption: 'Aquele dia especial'},
    {src: 'assets/img/gabi/3.jpg', caption: 'Momentos felizes'},
    {src: 'assets/img/gabi/4.jpg', caption: 'Te amando'},
    {src: 'assets/img/gabi/5.jpg', caption: 'Juntos sempre'},
    {src: 'assets/img/gabi/6.jpg', caption: 'Para sempre'}
];

// Função para abrir o modal da galeria
function openGalleryModal(imageSrc, caption) {
    // Verificar se temos um modal da galeria no DOM, se não, criamos um
    let modal = document.getElementById('gallery-modal');
    if (!modal) {
        // Criar um novo modal da galeria se não existir
        modal = createGalleryModal();
    }
    
    const modalImage = document.getElementById('gallery-modal-image');
    const modalCaption = document.querySelector('.gallery-modal-caption');
    const loadingIndicator = document.querySelector('.loading-indicator');
    
    if (!modalImage || !modalCaption || !loadingIndicator) {
        console.error('Elementos do modal da galeria não encontrados');
        return;
    }
    
    // Encontrar o índice da imagem atual
    currentImageIndex = galleryImages.findIndex(img => img.src === imageSrc);
    console.log("Opening modal with image index:", currentImageIndex);
    
    // Inicialmente, esconde a imagem e mostra o indicador de carregamento
    modalImage.style.opacity = '0';
    loadingIndicator.style.display = 'block';
    
    // Define a legenda imediatamente para melhor experiência do usuário
    modalCaption.textContent = caption;
    
    // Ocultar elementos Y2K quando o modal estiver aberto
    const y2kElements = document.querySelectorAll('#y2k-content');
    y2kElements.forEach(el => {
        el.style.visibility = 'hidden';
    });
    
    // Adicionar efeito de fade in com animação
    modal.style.display = 'block';
    modal.style.zIndex = '2000'; // Garantir que o modal da galeria fique acima dos outros modais
    
    // Forçar um reflow antes de alterar a opacidade
    modal.offsetWidth;
    
    // Atualizar o indicador de página
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');
    
    if (currentPageEl) {
        currentPageEl.textContent = (currentImageIndex + 1);
    }
    
    if (totalPagesEl) {
        totalPagesEl.textContent = galleryImages.length;
    }
    
    setTimeout(() => {
        modal.style.opacity = '1';
        
        // Configurar a imagem para carregar
        modalImage.src = imageSrc;
    }, 10);
    
    // Remover eventos anteriores para evitar duplicação
    document.removeEventListener('keydown', handleGalleryKeyPress);
    
    // Adicionar tecla Escape para fechar o modal
    document.addEventListener('keydown', handleGalleryKeyPress);
    
    // Atualizar os eventos dos botões sem clonar o modal
    const closeButton = modal.querySelector('.gallery-modal-close');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    
    if (closeButton) {
        // Remover eventos antigos
        closeButton.removeEventListener('click', closeGalleryModal);
        // Adicionar novo evento
        closeButton.addEventListener('click', closeGalleryModal);
    }
    
    if (prevButton) {
        // Remover eventos antigos
        const prevClone = prevButton.cloneNode(true);
        prevButton.parentNode.replaceChild(prevClone, prevButton);
        // Adicionar novo evento
        prevClone.addEventListener('click', function(e) {
            e.stopPropagation();
            changeGalleryImage(-1);
        });
    }
    
    if (nextButton) {
        // Remover eventos antigos
        const nextClone = nextButton.cloneNode(true);
        nextButton.parentNode.replaceChild(nextClone, nextButton);
        // Adicionar novo evento
        nextClone.addEventListener('click', function(e) {
            e.stopPropagation();
            changeGalleryImage(1);
        });
    }
    
    // Adicionar evento de clique no fundo para fechar o modal
    const galleryModalRef = document.getElementById('gallery-modal');
    if (galleryModalRef) {
        galleryModalRef.addEventListener('click', function(event) {
            if (event.target === galleryModalRef) {
                closeGalleryModal();
            }
        });
    }
}

// Função para fechar o modal da galeria
function closeGalleryModal() {
    const galleryModal = document.getElementById('gallery-modal');
    if (!galleryModal) return;
    
    // Adicionar efeito de fade out
    galleryModal.style.opacity = '0';
    setTimeout(() => {
        galleryModal.style.display = 'none';
        
        // Limpar a imagem atual para evitar que ela persista
        const galleryModalImage = document.getElementById('gallery-modal-image');
        if (galleryModalImage) {
            galleryModalImage.src = '';
        }
        
        // Restaurar elementos Y2K quando o modal estiver fechado
        const y2kElements = document.querySelectorAll('#y2k-content');
        y2kElements.forEach(el => {
            el.style.visibility = 'visible';
        });
    }, 300);
    
    // Remover o event listener da tecla
    document.removeEventListener('keydown', handleGalleryKeyPress);
}

// Navegação pelo teclado na galeria
function handleGalleryKeyPress(event) {
    if (event.key === 'Escape') {
        closeGalleryModal();
    } else if (event.key === 'ArrowLeft') {
        changeGalleryImage(-1);
    } else if (event.key === 'ArrowRight') {
        changeGalleryImage(1);
    }
}

// Navegação entre as imagens da galeria
function changeGalleryImage(direction) {
    // Impedir que rápidos cliques múltiplos causem problemas
    if (window._isChangingImage) {
        console.log("Mudança de imagem em andamento, ignorando clique");
        return;
    }
    
    window._isChangingImage = true;
    
    // Verificar se o modal da galeria existe
    let modal = document.getElementById('gallery-modal');
    if (!modal) {
        console.error("Modal da galeria não encontrado!");
        window._isChangingImage = false;
        return;
    }
    
    // Calcular o novo índice com loop circular
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    
    console.log("Changing to image index:", currentImageIndex);
    console.log("New image:", galleryImages[currentImageIndex].src);
    
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const galleryModalCaption = document.querySelector('.gallery-modal-caption');
    const loadingIndicator = document.querySelector('.loading-indicator');
    
    if (!galleryModalImage || !galleryModalCaption || !loadingIndicator) {
        console.error("Elementos da galeria não encontrados!");
        window._isChangingImage = false;
        return;
    }
    
    // Garantir que o modal esteja visível
    const galleryModalElem = document.getElementById('gallery-modal');
    if (!galleryModalElem) {
        console.error("Modal da galeria não encontrado!");
        return;
    }
    
    galleryModalElem.style.display = 'block';
    galleryModalElem.style.zIndex = '2000';
    
    // Desabilitar os botões de navegação temporariamente
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    
    // Aumentar feedback visual
    if (direction > 0) {
        document.body.classList.add('gallery-next');
        setTimeout(() => document.body.classList.remove('gallery-next'), 500);
    } else {
        document.body.classList.add('gallery-prev');
        setTimeout(() => document.body.classList.remove('gallery-prev'), 500);
    }
    
    // Mostrar o indicador de carregamento
    loadingIndicator.style.display = 'block';
    
    // Adicionar uma pequena animação de transição
    galleryModalImage.style.opacity = '0';
    
    // Garantir que o modal esteja bem posicionado e visível
    const galleryModalDisplay = document.getElementById('gallery-modal');
    if (galleryModalDisplay) {
        galleryModalDisplay.style.display = 'block';
        galleryModalDisplay.style.opacity = '1';
    }
    
    // Definir um timeout curto para garantir que a transição ocorra
    setTimeout(() => {
        try {
            // Atualizar imediatamente o indicador de página (melhor UX)
            const currentPageEl = document.getElementById('current-page');
            const totalPagesEl = document.getElementById('total-pages');
            
            if (currentPageEl) {
                currentPageEl.textContent = (currentImageIndex + 1);
            }
            
            if (totalPagesEl) {
                totalPagesEl.textContent = galleryImages.length;
            }
            
            // Pré-carrega a imagem
            const newImage = new Image();
            newImage.onload = function() {
                try {
                    // A imagem carregou com sucesso
                    const modalImageRef = document.getElementById('gallery-modal-image');
                    const modalCaptionRef = document.querySelector('.gallery-modal-caption');
                    
                    if (modalImageRef) modalImageRef.src = newImage.src;
                    if (modalCaptionRef) modalCaptionRef.textContent = galleryImages[currentImageIndex].caption;
                    
                    // Forçar a opacidade, não confiando apenas no evento onload do HTML
                    setTimeout(() => {
                        const modalImageDisplay = document.getElementById('gallery-modal-image');
                        if (modalImageDisplay) modalImageDisplay.style.opacity = '1';
                        if (loadingIndicator) loadingIndicator.style.display = 'none';
                        
                        // Habilitar os botões novamente
                        if (prevBtn) {
                            prevBtn.disabled = false;
                            prevBtn.style.animation = "pulse 2s infinite";
                        }
                        if (nextBtn) {
                            nextBtn.disabled = false;
                            nextBtn.style.animation = "pulse 2s infinite";
                        }
                        
                        window._isChangingImage = false;
                    }, 100);
                } catch (err) {
                    console.error("Erro ao definir a imagem carregada:", err);
                    window._isChangingImage = false;
                    
                    if (prevBtn) prevBtn.disabled = false;
                    if (nextBtn) nextBtn.disabled = false;
                }
            };
            
            newImage.onerror = function() {
                // Em caso de erro, usar uma imagem alternativa
                console.warn("Erro ao carregar imagem:", galleryImages[currentImageIndex].src);
                modalImage.src = 'assets/img/gabi/heart.gif';
                modalCaption.textContent = 'Imagem não disponível';
                modalImage.style.opacity = '1';
                loadingIndicator.style.display = 'none';
                
                // Habilitar os botões novamente
                if (prevBtn) prevBtn.disabled = false;
                if (nextBtn) nextBtn.disabled = false;
                
                window._isChangingImage = false;
            };
            
            // Iniciar carregamento da imagem
            newImage.src = galleryImages[currentImageIndex].src;
        } catch (error) {
            console.error("Erro ao trocar imagem:", error);
            loadingIndicator.style.display = 'none';
            
            // Habilitar os botões novamente
            if (prevBtn) prevBtn.disabled = false;
            if (nextBtn) nextBtn.disabled = false;
            
            window._isChangingImage = false;
        }
    }, 200);
}

// Funções adicionais para o preload das imagens da galeria
document.addEventListener('DOMContentLoaded', function() {
    // Após carregar o documento, vamos carregar todas as imagens da galeria em segundo plano
    preloadGalleryImages();
});

// Função para pré-carregar as imagens da galeria
function preloadGalleryImages() {
    if (!galleryImages || galleryImages.length === 0) return;
    
    // Criar uma array para armazenar as imagens pré-carregadas
    const preloadedImages = [];
    
    // Para cada imagem da galeria, vamos criar um novo objeto Image
    galleryImages.forEach((image, index) => {
        preloadedImages[index] = new Image();
        
        // Quando a imagem carregar, adicione uma classe para indicar isso
        preloadedImages[index].onload = function() {
            // Poderia adicionar uma marca visual para indicar que a imagem está pronta
            const galleryItems = document.querySelectorAll('.gallery-item');
            if (galleryItems[index]) {
                galleryItems[index].classList.add('image-ready');
            }
        };
        
        // Configurar a fonte da imagem
        preloadedImages[index].src = image.src;
    });
}

// Tornar as funções da galeria disponíveis globalmente
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
window.changeGalleryImage = changeGalleryImage;

// Adicionando event listeners diretamente para cada item da galeria
document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar evento de clique a todos os itens da galeria
    function setupGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item) => {
            // Obter os dados de atributos
            const imgSrc = item.getAttribute('data-image');
            const caption = item.getAttribute('data-caption');
            
            if (!imgSrc) {
                console.error('Item da galeria sem atributo data-image:', item);
                return;
            }
            
            console.log('Configurando item da galeria:', imgSrc, caption);
            
            // Adicionar evento de clique diretamente ao item
            item.addEventListener('click', function(e) {
                console.log("Gallery item clicked:", imgSrc);
                e.preventDefault();
                openGalleryModal(imgSrc, caption);
                return false;
            });
            
            // Garantir que a imagem dentro do item também tenha o evento
            const img = item.querySelector('img');
            if (img) {
                img.addEventListener('click', function(e) {
                    console.log("Image inside gallery item clicked:", imgSrc);
                    e.preventDefault();
                    e.stopPropagation();
                    openGalleryModal(imgSrc, caption);
                    return false;
                });
            }
            
            // Destacar visualmente como clicável
            item.style.cursor = 'pointer';
            if (img) img.style.cursor = 'pointer';
        });
    }
    
    // Inicialização - usar um pequeno atraso para garantir que tudo carregou
    setTimeout(setupGalleryItems, 300);
    
    // Adicionar também no evento de carregamento da janela para garantir
    window.addEventListener('load', setupGalleryItems);
});

// Função para garantir que os cliques nas imagens funcionem
function fixGalleryItemClicks() {
    console.log('Aplicando fix para os cliques da galeria');
    
    // Selecionar todos os itens da galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Para cada item, adicionar evento de clique diretamente usando múltiplas abordagens
    galleryItems.forEach(item => {
        const imgSrc = item.getAttribute('data-image');
        const caption = item.getAttribute('data-caption');
        
        if (!imgSrc) {
            console.error('Item sem data-image:', item);
            return;
        }
        
        // Remover eventos antigos (se houver)
        item.onclick = null;
        
        // Método 1: Use addEventListener para melhor compatibilidade
        const clickHandler = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Item clicado:', imgSrc);
            openGalleryModal(imgSrc, caption);
            return false;
        };
        
        // Remove event listeners existentes (para evitar duplicação)
        item.removeEventListener('click', clickHandler);
        item.removeEventListener('touchend', clickHandler);
        
        // Adicionar novos event listeners
        item.addEventListener('click', clickHandler);
        item.addEventListener('touchend', function(e) {
            // Verifica se o evento foi um toque simples, não um swipe
            if (!window._isSwiping) {
                clickHandler(e);
            }
        });
        
        // Método 2: Usa também o handler onclick direto para máxima compatibilidade
        item.onclick = clickHandler;
        
        // Adicionar também ao click da imagem
        const img = item.querySelector('img');
        if (img) {
            img.removeEventListener('click', clickHandler);
            img.removeEventListener('touchend', clickHandler);
            
            img.addEventListener('click', clickHandler);
            img.addEventListener('touchend', clickHandler);
            img.onclick = clickHandler; // Abordagem redundante para garantir
        }
        
        // Adicionar atributo aria para acessibilidade
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Ver imagem: ${caption}`);
        item.setAttribute('tabindex', '0');
        
        // Permitir uso de teclado
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                clickHandler(e);
            }
        });
    });
}

// Chamar esta função no carregamento do documento
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(fixGalleryItemClicks, 500);
    
    // Também chamar quando a aba Galeria for clicada
    const galeriaTab = document.querySelector('button.tab[onclick="openCity(event, \'Galeria\')"]');
    if (galeriaTab) {
        galeriaTab.addEventListener('click', function() {
            setTimeout(fixGalleryItemClicks, 100);
        });
    }
});

// Chamar no carregamento completo da janela também
window.addEventListener('load', fixGalleryItemClicks);

// Função para criar o modal da galeria dinamicamente
function createGalleryModal() {
    // Verificar se já existe um modal e removê-lo para evitar duplicações
    let existingModal = document.getElementById('gallery-modal');
    if (existingModal) {
        existingModal.parentNode.removeChild(existingModal);
    }
    
    // Criar o elemento do modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.id = 'gallery-modal';
    modal.style.zIndex = '2000'; // Garantir que fique acima de tudo
    
    const modalContent = `
        <span class="gallery-modal-close" onclick="closeGalleryModal()">&times;</span>
        <div class="gallery-modal-content">
            <div class="loading-indicator"></div>
            <img id="gallery-modal-image"
                onload="this.style.opacity='1'; document.querySelector('.loading-indicator').style.display='none';"
                onerror="this.src='assets/img/gabi/heart.gif'; this.onerror=null;">
            <div class="gallery-modal-caption"></div>
            <div class="gallery-page-indicator">
                <span id="current-page">1</span>/<span id="total-pages">6</span>
            </div>
            <div class="gallery-modal-navigation">
                <button class="gallery-nav-btn prev" id="prev-btn"
                    onclick="event.stopPropagation(); changeGalleryImage(-1);">❮</button>
                <button class="gallery-nav-btn next" id="next-btn"
                    onclick="event.stopPropagation(); changeGalleryImage(1);">❯</button>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    
    // Configurar eventos diretamente
    const closeButton = modal.querySelector('.gallery-modal-close');
    const prevButton = modal.querySelector('#prev-btn');
    const nextButton = modal.querySelector('#next-btn');
    
    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeGalleryModal();
    });
    
    prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        changeGalleryImage(-1);
    });
    
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        changeGalleryImage(1);
    });
    
    // Adicionar evento para fechar ao clicar no fundo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });
    
    return modal;
}


