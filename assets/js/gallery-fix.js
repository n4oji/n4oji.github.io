/**
 * Script para corrigir problemas com a galeria de imagens
 * Este arquivo resolve o problema de cliques na galeria dentro dos modais
 */

// Aguardar o carregamento do documento
document.addEventListener('DOMContentLoaded', function() {
    // Configurar observador de mutações para quando novos modais são adicionados
    setupModalObserver();
    
    // Corrigir eventos na galeria existente
    fixAllGalleryItems();
    
    // Certifique-se de que os botões de navegação do modal da galeria funcionem
    fixGalleryModalNavigation();
    
    // Adicionar event listeners para os botões da tab da galeria
    setupGalleryTabEventListeners();
});

// Configurar observador para detectar quando um modal com galeria é adicionado ao DOM
function setupModalObserver() {
    const bodyObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.classList && node.classList.contains('modal-overlay')) {
                        console.log('Novo modal detectado:', node.id);
                        
                        // Verificar se é um modal de galeria
                        if (node.querySelector('.gallery-wrapper') || node.id === 'modal-Galeria') {
                            console.log('Modal da galeria detectado, configurando eventos...');
                            
                            // Aplicar fixos para os cliques na galeria dentro do modal
                            setTimeout(function() {
                                fixGalleryItemsInModal(node);
                            }, 100);
                        }
                    }
                });
            }
        });
    });
    
    // Iniciar observação do DOM
    bodyObserver.observe(document.body, { childList: true });
}

// Corrigir todos os itens da galeria no documento
function fixAllGalleryItems() {
    const allGalleryItems = document.querySelectorAll('.gallery-item');
    
    if (allGalleryItems.length > 0) {
        console.log('Configurando', allGalleryItems.length, 'itens da galeria');
        
        allGalleryItems.forEach(function(item) {
            applyGalleryItemClickEvent(item);
        });
    }
}

// Corrigir itens da galeria dentro de um modal específico
function fixGalleryItemsInModal(modalElement) {
    const galleryItems = modalElement.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        console.log('Configurando', galleryItems.length, 'itens da galeria no modal');
        
        galleryItems.forEach(function(item) {
            item.style.cursor = 'pointer';
            
            // Forçar a recriação do evento de clique
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // Aplicar evento de clique ao item clonado
            applyGalleryItemClickEvent(newItem);
        });
    }
}

// Adicionar evento de clique a um item da galeria
function applyGalleryItemClickEvent(item) {
    const imgSrc = item.getAttribute('data-image');
    const caption = item.getAttribute('data-caption');
    
    if (!imgSrc) return;
    
    // Garantir que o cursor seja de ponteiro
    item.style.cursor = 'pointer';
    
    // Adicionar estilos para indicar clicabilidade
    item.classList.add('clickable');
    
    // Adicionar funções de clique
    const clickHandler = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Clique na imagem da galeria:', imgSrc);
        
        // Garantir que não haja duplicação do modal da galeria
        const existingModal = document.getElementById('gallery-modal');
        if (existingModal && existingModal.parentNode) {
            existingModal.parentNode.removeChild(existingModal);
        }
        
        // Chamar a função original de abrir o modal
        openGalleryModal(imgSrc, caption);
        return false;
    };
    
    // Adicionar evento usando diferentes métodos para garantir compatibilidade
    item.addEventListener('click', clickHandler);
    item.onclick = clickHandler;
    
    // Configurar a imagem dentro do item
    const img = item.querySelector('img');
    if (img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(e);
        });
        img.onclick = clickHandler;
    }
}

// Corrigir os botões de navegação do modal da galeria
function fixGalleryModalNavigation() {
    // Adicionar evento ao teclado para navegação
    document.addEventListener('keydown', function(e) {
        const galleryModal = document.getElementById('gallery-modal');
        if (galleryModal && galleryModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                changeGalleryImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeGalleryImage(1);
            } else if (e.key === 'Escape') {
                closeGalleryModal();
            }
        }
    });
    
    // Adicionar suporte para swipe em dispositivos móveis
    document.addEventListener('touchstart', function(e) {
        const galleryModal = document.getElementById('gallery-modal');
        if (galleryModal && galleryModal.style.display === 'block') {
            window._touchStartX = e.changedTouches[0].screenX;
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const galleryModal = document.getElementById('gallery-modal');
        if (galleryModal && galleryModal.style.display === 'block') {
            const touchEndX = e.changedTouches[0].screenX;
            const threshold = 50;
            
            if (window._touchStartX - touchEndX > threshold) {
                // Swipe esquerda - próxima imagem
                changeGalleryImage(1);
            } else if (touchEndX - window._touchStartX > threshold) {
                // Swipe direita - imagem anterior
                changeGalleryImage(-1);
            }
        }
    }, { passive: true });
}

// Adicionar event listeners para o botão da aba Galeria
function setupGalleryTabEventListeners() {
    const galeriaTab = document.querySelector('button.tab[onclick*="Galeria"]');
    if (galeriaTab) {
        const originalClickFn = galeriaTab.onclick;
        
        galeriaTab.addEventListener('click', function() {
            setTimeout(function() {
                const modalOverlay = document.getElementById('modal-Galeria');
                if (modalOverlay) {
                    fixGalleryItemsInModal(modalOverlay);
                }
            }, 200);
        });
    }
}

// Função para verificar e corrigir regularmente os cliques da galeria
setInterval(function() {
    const openedGaleriaModal = document.getElementById('modal-Galeria');
    if (openedGaleriaModal && openedGaleriaModal.classList.contains('active')) {
        fixGalleryItemsInModal(openedGaleriaModal);
    }
}, 1000);

// Tornar função disponível globalmente
window.fixGalleryItemsInModal = fixGalleryItemsInModal;
