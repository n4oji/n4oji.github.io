document.addEventListener("DOMContentLoaded", function() {
    const disciplinasList = document.querySelector(".disciplinas-list");

    // Crie um objeto para rastrear o estado de cada disciplina
    const state = {};

    disciplinasList.addEventListener("click", function(e) {
        e.preventDefault();
        if (e.target.tagName === "A") {
            const disciplina = e.target.getAttribute("data-disciplina");
            const videosContainer = document.querySelector(`.videos-container[data-disciplina="${disciplina}"]`);

            // Verifique o estado atual da disciplina
            if (!state[disciplina] || state[disciplina] === "fechado") {
                // Se a disciplina estiver fechada, abra-a e atualize o estado para "aberto"
                state[disciplina] = "aberto";

                // Substitua os vídeos abaixo pelos vídeos reais para a disciplina selecionada
                const videos = {
                    "Matemática": [
                        { title: "Livro de matemática do Manual do Mundo", url: "https://www.youtube.com/watch?v=ZX1WSLhqTgw&pp=ygUbbWF0ZW1hdGljYSAgbWFudWFsIGRvIG11bmRv" },
                        { title: "Regra de 3", url: "https://www.youtube.com/watch?v=ls6YLVn4_1o&pp=ygUbbWF0ZW1hdGljYSAgbWFudWFsIGRvIG11bmRv" },
                    ],
                    "Física": [
                        { title: "Usina Nuclear", url: "https://www.youtube.com/watch?v=ZsR-2zkEwCM&pp=ygUXZmlzaWNhICBtYW51YWwgZG8gbXVuZG8%3D" },
                        { title: "Ímãs", url: "https://www.youtube.com/watch?v=jCL2dLh5MME&pp=ygUXZmlzaWNhICBtYW51YWwgZG8gbXVuZG8%3D" },
                    ],
                    "Química": [
                        { title: " Tabela Periódica", url: "https://www.youtube.com/watch?v=-NV-P6-yVZU&pp=ygUYcXVpbWljYSAgbWFudWFsIGRvIG11bmRv" },
                        { title: "Bateria de Latinhas", url: "https://www.youtube.com/watch?v=-NV-P6-yVZU&pp=ygUYcXVpbWljYSAgbWFudWFsIGRvIG11bmRv" },
                    ],
                    // Adicione mais disciplinas e vídeos conforme necessário
                };

                if (videos[disciplina]) {
                    videosContainer.innerHTML = "";
                    videos[disciplina].forEach(video => {
                        const videoElement = document.createElement("a");
                        videoElement.href = video.url;
                        videoElement.textContent = video.title;
                        videoElement.target = "_blank"; // Adicione target="_blank" aos links de vídeo
                        videosContainer.appendChild(videoElement);
                    });
                    videosContainer.style.display = "block";
                }
            } else {
                // Se a disciplina estiver aberta, feche-a e atualize o estado para "fechado"
                state[disciplina] = "fechado";
                videosContainer.style.display = "none";
            }
        }
    });
});