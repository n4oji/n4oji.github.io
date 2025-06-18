document.addEventListener('DOMContentLoaded', function () {
    const radioContainer = document.querySelector('.radio-container');
    const radioIndicator = document.querySelector('.radio-indicator');
    const nowPlaying = document.querySelector('.now-playing');
    const audio = document.getElementById('radio-player');
    const playBtn = document.getElementById('play-btn');
    const volumeControl = document.getElementById('volume-control');
  
    function togglePlay() {
      if (audio.paused) {
        audio.play();
        nowPlaying.textContent = 'Tocando agora';
        radioIndicator.style.backgroundColor = '#4eff4e';
        radioIndicator.style.boxShadow = '0 0 10px #4eff4e';
        radioContainer.classList.remove('paused');
        playBtn.textContent = '⏸️';
      } else {
        audio.pause();
        nowPlaying.textContent = 'Em pausa';
        radioIndicator.style.backgroundColor = '#ff4e4e';
        radioIndicator.style.boxShadow = '0 0 10px #ff4e4e';
        radioContainer.classList.add('paused');
        playBtn.textContent = '▶️';
      }
    }
  
    // Clique no botão play
    playBtn.addEventListener('click', togglePlay);
  
    // Controle de volume
    volumeControl.addEventListener('input', function () {
      audio.volume = parseFloat(this.value);
    });
  
    // Também alterna tocando ao clicar no cabeçalho
    document.querySelector('.radio-header').addEventListener('click', togglePlay);
  });
  