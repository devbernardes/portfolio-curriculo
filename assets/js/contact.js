document.addEventListener('DOMContentLoaded', function () {
    const messageTextarea = document.getElementById('message');
    const form = document.getElementById('contactForm');

    if (messageTextarea) {
        // Create character counter element
        const counterContainer = document.createElement('div');
        counterContainer.className = 'character-counter';
        counterContainer.innerHTML = '<span id="char-count">0</span>/200 caracteres';
        counterContainer.style.fontSize = '0.8rem';
        counterContainer.style.textAlign = 'right';
        counterContainer.style.marginTop = '5px';
        counterContainer.style.color = '#666';

        // Insert counter after textarea
        messageTextarea.parentNode.insertBefore(counterContainer, messageTextarea.nextSibling);

        const charCount = document.getElementById('char-count');

        // Update character count on input
        messageTextarea.addEventListener('input', function () {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;

            // Change color when approaching limit
            if (currentLength >= 180) {
                charCount.style.color = '#ff9800'; // Orange warning
            } else {
                charCount.style.color = '#666'; // Default color
            }

            // Prevent typing more than 200 characters
            if (currentLength > 200) {
                this.value = this.value.substring(0, 200);
                charCount.textContent = 200;
                charCount.style.color = '#f44336'; // Red when limit reached
            }
        });

        // Validate form on submit
        if (form) {
            form.addEventListener('submit', function (e) {
                if (messageTextarea.value.length > 200) {
                    e.preventDefault();
                    alert('A mensagem não pode exceder 200 caracteres.');
                }
            });
        }
    }
});