/**
 * Social Links Touch Interaction Fix
 * This script ensures that social links don't remain in the active state
 * after being clicked on touch devices.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Get all social links
    const socialLinks = document.querySelectorAll('.social-link');

    // Add touch event listeners to each social link
    socialLinks.forEach(link => {
        // Quando o usuário toca no ícone
        link.addEventListener('touchstart', function (e) {
            // Previne o comportamento padrão para evitar problemas
            e.preventDefault();

            // Aplica o efeito de background azul
            this.style.backgroundColor = 'var(--accent-color)';

            // Mantém a cor original do ícone
            const icon = this.querySelector('i');
            if (icon) {
                // Garante que o ícone permaneça com sua cor original
                icon.style.color = 'white';
                // Aplica um pequeno efeito de escala
                icon.style.transform = 'scale(1.2)';
            }
        });

        // Quando o usuário termina o toque
        link.addEventListener('touchend', function (e) {
            // Pequeno atraso para permitir que o feedback visual seja visto
            setTimeout(() => {
                // Remove o background azul
                this.style.backgroundColor = '';

                // Restaura o ícone ao estado original
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.color = '';
                    icon.style.transform = '';
                }

                // Garante que o pseudo-elemento volte ao estado original
                this.classList.add('reset-state');
                setTimeout(() => {
                    this.classList.remove('reset-state');
                }, 50);
            }, 300); // Tempo suficiente para o usuário ver o feedback visual
        });
    });
});