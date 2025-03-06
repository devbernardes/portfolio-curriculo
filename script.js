// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = themeToggle.querySelector('i');

// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme to document and update icon
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    moonIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', theme);
};

// Toggle theme function
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
};

// Initialize theme
applyTheme(getPreferredTheme());

// Add click event listener to theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Back to top button functionality
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize EmailJS with your public key
emailjs.init('YqajmXZPUr4DJ5XLF');

// Create a toast notification function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Contact form handling with EmailJS
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const countryCode = document.getElementById('country-code').value;

        // Get submit button and show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            // Format current date in São Paulo timezone
            const currentDate = new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                dateStyle: 'short',
                timeStyle: 'medium'
            });

            // Prepare template parameters with all information
            const templateParams = {
                to_name: 'Gabriel',
                from_name: name,
                reply_to: email,
                email: email,
                message: `Email: ${email}\nTelefone: ${countryCode}${phone}\n\nMensagem:\n${message}\n\nEnviado em: ${currentDate}`,
            };

            // Send email using EmailJS
            await emailjs.send('service_9j03stp', 'template_0huqg3d', templateParams);

            // Show success message
            showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS error:', error);
            showToast('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Import country data from libphonenumber-js
const countrySelect = document.getElementById('country_code');

// Function to get country name in Portuguese
function getCountryNamePt(code) {
    const countryNames = {
        'US': 'Estados Unidos',
        'CA': 'Canadá',
        'BR': 'Brasil',
        'PT': 'Portugal',
        'ES': 'Espanha',
        'FR': 'França',
        'DE': 'Alemanha',
        'IT': 'Itália',
        'GB': 'Reino Unido',
        'JP': 'Japão',
        'CN': 'China',
        'RU': 'Rússia',
        'MX': 'México',
        'AR': 'Argentina',
        'CL': 'Chile',
        'CO': 'Colômbia',
        'PE': 'Peru'
    };
    return countryNames[code] || code;
}

// Fetch country data from REST Countries API
async function populateCountryCodes() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');
        const countries = await response.json();

        // Format and sort countries
        const formattedCountries = countries
            .filter(country => country.idd.root && country.idd.suffixes) // Filter out countries without phone codes
            .map(country => {
                const code = country.idd.root + (country.idd.suffixes[0] || '');
                const alpha2 = country.cca2;
                return {
                    code: code,
                    name: getCountryNamePt(alpha2) || country.name.common,
                    alpha2: alpha2
                };
            })
            .sort((a, b) => a.name.localeCompare(b.name));

        // Clear existing options
        countrySelect.innerHTML = '<option value="" disabled>Selecione o país</option>';

        // Add new options
        formattedCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.name} (${country.code})`;
            countrySelect.appendChild(option);
        });

        // Set default to Brazil if available
        const brOption = Array.from(countrySelect.options).find(option => option.textContent.includes('Brasil'));
        if (brOption) {
            countrySelect.value = brOption.value;
        }
    } catch (error) {
        console.error('Error fetching country codes:', error);
        // Fallback to basic country selection if API fails
        const basicCountries = [
            { code: '+55', name: 'Brasil' },
            { code: '+1', name: 'Estados Unidos' },
            { code: '+351', name: 'Portugal' }
        ];

        basicCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = `${country.name} (${country.code})`;
            countrySelect.appendChild(option);
        });

        countrySelect.value = '+55'; // Default to Brazil
    }
}

// Initialize country codes
populateCountryCodes();



// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Estado global da aplicação
let state = {
    isLoading: true,
    error: null,
    activeFilters: new Set(),
    projects: [
        {
            title: 'amigo-secreto',
            description: 'Aplicação web interativa para o tradicional jogo de Amigo Secreto, que conta com uma tela de login e autenticação por senha, garantindo uma experiência segura e divertida. A plataforma possui sorteio manual básico entre os participantes, tornando o jogo mais prático e dinâmico.',
            github: 'https://github.com/devbernardes/challenge-amigo-secreto',
            demo: 'https://challenge-amigo-secreto-amber-chi.vercel.app/',
            image: './assets/images/amigo-secreto.png',
            technologies: ['HTML', 'CSS', 'JavaScript']
        },
        {
            title: 'Projeto-portfolio',
            description: 'Projeto para experiência de aprendizado, sendo a minha primeira página web criada utilizando HTML e CSS. O objetivo foi entender a estrutura básica de uma página e aprender a estilizar elementos para criar uma interface simples, porém funcional.',
            github: 'https://github.com/devbernardes/projeto-portfolio',
            demo: 'https://portfolio-gabriel-chi.vercel.app/',
            image: './assets/images/foto-portfolio-previa.png',
            technologies: ['HTML', 'CSS']
        }
    ]
};

// Função para filtrar projetos por tecnologia
function filterProjects() {
    const filteredProjects = state.activeFilters.size === 0
        ? state.projects
        : state.projects.filter(project =>
            project.technologies.some(tech => state.activeFilters.has(tech)));
    renderProjects(filteredProjects);
}

// Função para criar os filtros de tecnologia
function createTechnologyFilters() {
    const technologies = new Set();
    state.projects.forEach(project => {
        project.technologies.forEach(tech => technologies.add(tech));
    });

    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';

    technologies.forEach(tech => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter-btn';
        filterBtn.textContent = tech;
        filterBtn.addEventListener('click', () => {
            filterBtn.classList.toggle('active');
            if (state.activeFilters.has(tech)) {
                state.activeFilters.delete(tech);
            } else {
                state.activeFilters.add(tech);
            }
            filterProjects();
        });
        filtersContainer.appendChild(filterBtn);
    });

    const projectsSection = document.querySelector('.projects-section .container');
    projectsSection.insertBefore(filtersContainer, document.getElementById('projects-container'));
}

// Função para renderizar os projetos
function renderProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';

    if (state.error) {
        projectsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${state.error}</p>
            </div>
        `;
        return;
    }

    if (state.isLoading) {
        projectsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando projetos...</p>
            </div>
        `;
        return;
    }

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');

        projectCard.innerHTML = `
            <div class="project-content">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    ${project.demo ? `
                        <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        projectsContainer.appendChild(projectCard);
    });
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    try {
        createTechnologyFilters();
        // Simulate loading
        setTimeout(() => {
            state.isLoading = false;
            filterProjects();
        }, 1000);
    } catch (error) {
        state.error = 'Ocorreu um erro ao carregar os projetos. Por favor, tente novamente.';
        state.isLoading = false;
        renderProjects([]);
    }
});