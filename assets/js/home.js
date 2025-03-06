// Typing animation for hero section with repeat functionality
document.addEventListener('DOMContentLoaded', function () {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const text = typingText.textContent;
    typingText.innerHTML = '';

    // Create text span element
    const textSpan = document.createElement('span');
    textSpan.className = 'typed-text';
    typingText.appendChild(textSpan);

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '|';
    cursor.style.fontSize = '0.8em';
    cursor.style.position = 'relative';
    cursor.style.top = '9px';
    typingText.appendChild(cursor);

    let i = 0;
    const typingSpeed = 100; // milliseconds per character
    const resetDelay = 3000; // 3 seconds delay before restarting animation
    const backspaceSpeed = 50; // milliseconds per character for backspace effect
    let isDeleting = false;

    function typeWriter() {
        if (!isDeleting && i < text.length) {
            // Typing forward
            textSpan.textContent = text.substring(0, i + 1);
            i++;
            // Garantir que o cursor esteja visível durante a digitação
            cursor.style.display = 'inline-block';
            setTimeout(typeWriter, typingSpeed);
        } else if (!isDeleting && i >= text.length) {
            // When typing is complete, wait then start deleting
            isDeleting = true;
            setTimeout(typeWriter, resetDelay);
        } else if (isDeleting && i > 0) {
            // Backspace effect - remove one character at a time
            i--;
            textSpan.textContent = text.substring(0, i);
            setTimeout(typeWriter, backspaceSpeed);
        } else {
            // When deletion is complete, reset and start typing again
            isDeleting = false;
            textSpan.textContent = '';
            setTimeout(typeWriter, 500);
        }
    }


    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
});

// Particles animation for hero background
document.addEventListener('DOMContentLoaded', function () {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Configuration for particles
    const particlesConfig = {
        particleCount: 50,
        colors: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'],
        minSize: 2,
        maxSize: 5,
        minSpeed: 0.5,
        maxSpeed: 2
    };

    // Create particles
    for (let i = 0; i < particlesConfig.particleCount; i++) {
        createParticle(particlesContainer, particlesConfig);
    }
});

// Function to create a single particle
function createParticle(container, config) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    const posX = Math.random() * 100; // percentage
    const posY = Math.random() * 100; // percentage

    // Random size
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;

    // Random color
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];

    // Random speed
    const speedX = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
    const speedY = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);

    // Set particle styles
    particle.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: ${posY}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;

    // Add particle to container
    container.appendChild(particle);

    // Animate particle
    animateParticle(particle, speedX, speedY, container);
}

// Function to animate a particle
function animateParticle(particle, speedX, speedY, container) {
    let posX = parseFloat(particle.style.left);
    let posY = parseFloat(particle.style.top);

    function move() {
        // Update position
        posX += speedX * 0.1;
        posY += speedY * 0.1;

        // Boundary check and bounce
        if (posX <= 0 || posX >= 100) {
            speedX *= -1;
            posX = Math.max(0, Math.min(100, posX));
        }

        if (posY <= 0 || posY >= 100) {
            speedY *= -1;
            posY = Math.max(0, Math.min(100, posY));
        }

        // Apply new position
        particle.style.left = posX + '%';
        particle.style.top = posY + '%';

        // Continue animation
        requestAnimationFrame(move);
    }

    // Start animation
    requestAnimationFrame(move);
}