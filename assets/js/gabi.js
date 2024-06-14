// script.js

document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photos img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('enlarged');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const password = '18062023';  
    const input = document.getElementById('password');
    const keypad = document.getElementById('keypad');
    const clearButton = document.getElementById('clear');
    const enterButton = document.getElementById('enter');
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');

    keypad.addEventListener('click', function(event) {
        if (event.target.classList.contains('key')) {
            input.value += event.target.textContent;
        }
    });

    document.addEventListener('keydown', function(event) {
        if (!isNaN(event.key)) {
            input.value += event.key;
        } else if (event.key === 'Enter') {
            verifyPassword();
        } else if (event.key === 'Backspace') {
            input.value = input.value.slice(0, -1);
        }
    });

    clearButton.addEventListener('click', function() {
        input.value = '';
    });

    enterButton.addEventListener('click', verifyPassword);

    function verifyPassword() {
        if (input.value === password) {
            passwordScreen.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            alert('Senha incorreta. Tente novamente.');
            input.value = '';
        }
    }
});


function openCity(evt, cityName) {
  var i, tabcontent, tab;
	
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
	
  tab = document.getElementsByClassName("tab");
  for (i = 0; i < tab.length; i++) {
    tab[i].className = tab[i].className.replace(" active", "");
  }
	
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
	
}