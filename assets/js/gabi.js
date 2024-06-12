// script.js

document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photos img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('enlarged');
        });
    });
});
