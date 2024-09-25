document.addEventListener('DOMContentLoaded', () => {
    const body = document.getElementById('body');
    const container = createContainer();
    body.appendChild(container);

    const header = createHeader();
    const section = createSection();
    const footer = createFooter();

    container.append(header, section, footer);
    setupThemeToggle(header, body, container);
    animateElements();
});

function createContainer() {
    const container = document.createElement('main');
    container.className = 'bg-white shadow-md rounded-lg p-8 max-w-md text-center transition-colors duration-300';
    return container;
}

function createHeader() {
    const header = document.createElement('header');
    header.className = 'icon-container flex justify-center mb-5';
    ['light', 'dark'].forEach(mode => {
        header.appendChild(createIcon(`Светлый режим`, mode, `fas fa-${mode === 'light' ? 'sun' : 'moon'}`));
    });
    return header;
}

function createSection() {
    const section = document.createElement('section');
    section.innerHTML = `
        <h1 class="text-3xl font-bold text-gray-700 transition-all">Привет!</h1>
        <p class="mt-4 text-gray-600 font-bold transition-all">Я начинающий DevOps-Engineer.</p>
        <div class="flex items-center justify-center mt-4">
            <p class="mr-3 text-3xl font-bold gradient-text transition-all">LaiMicK</p>
            <img src="./avatars.jpg" alt="Ваше имя" class="ml-3 h-16 w-16 rounded-full shadow-lg transition-transform transform hover:scale-110 fade-in" loading="lazy">
        </div>
        <p class="mt-2 text-gray-500 transition-all">Я занимаюсь автоматизацией и оптимизацией процессов разработки и развертывания.</p>
        <a href="https://t.me/sqlinked" class="mt-6 inline-block bg-blue-500 text-white rounded-lg px-4 py-2 opacity-0 translate-y-5 transition-opacity transform transition-transform duration-200 hover:scale-105 button-animate">Связаться со мной</a>
    `;
    return section;
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'mt-8 flex justify-center space-x-4';
    ['docker', 'python', 'kubernetes'].forEach(name => {
        footer.appendChild(createSocialImage(`./${name}.png`, name.charAt(0).toUpperCase() + name.slice(1)));
    });
    return footer;
}

function createIcon(label, mode, iconClass) {
    const icon = document.createElement('div');
    icon.className = `icon ${mode} transition-transform transform hover:scale-110`;
    icon.setAttribute('role', 'button');
    icon.setAttribute('aria-label', label);
    icon.setAttribute('tabindex', '0');
    icon.dataset.mode = mode;

    const iconElement = document.createElement('i');
    iconElement.className = iconClass;
    icon.appendChild(iconElement);
    icon.appendChild(createIconBackground());

    return icon;
}

function createIconBackground() {
    const background = document.createElement('div');
    background.className = 'icon-background';
    return background;
}

function createSocialImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'h-10 w-10 transition-transform transform hover:scale-110 fade-in';
    img.loading = 'lazy';
    return img;
}

function setupThemeToggle(header, body, container) {
    header.addEventListener('click', (event) => {
        const icon = event.target.closest('.icon');
        if (icon) {
            const isLightMode = icon.dataset.mode === 'light';
            toggleTheme(isLightMode, body, container);
            moveIcons(isLightMode ? 'light' : 'dark');
            updateAriaPressed(isLightMode);
            updateIconColors(); 
        }
    });
}

function toggleTheme(isLightMode, body, container) {
    body.classList.toggle('bg-custom-dark', !isLightMode);
    body.classList.toggle('bg-custom', isLightMode);
    container.classList.toggle('bg-gray-800', !isLightMode);
    container.classList.toggle('bg-white', isLightMode);
    container.querySelectorAll('h1, p').forEach(el => {
        el.classList.toggle('text-custom-dark', !isLightMode);
        el.classList.toggle('text-gray-800', isLightMode);
    });
}

function moveIcons(mode) {
    document.querySelectorAll('.icon').forEach(icon => {
        icon.classList.toggle('inactive', icon.dataset.mode === 'light' && mode === 'dark');
        icon.classList.toggle('active', icon.dataset.mode === mode);
    });
}

function updateAriaPressed(isLightMode) {
    document.querySelectorAll('.icon').forEach(icon => {
        icon.setAttribute('aria-pressed', icon.dataset.mode === (isLightMode ? 'light' : 'dark'));
    });
}

function updateIconColors() {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        const iconElement = icon.querySelector('i');
        if (icon.dataset.mode === 'light') {
            iconElement.style.color = icon.classList.contains('active') ? 'orange' : ''; // Цвет для солнца
        } else {
            iconElement.style.color = icon.classList.contains('active') ? 'lightblue' : ''; // Цвет для луны
        }
    });
}

function animateElements() {
    const elements = document.querySelectorAll('.transition-all');
    elements.forEach((element, index) => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }, 500 + index * 100); 
    });

    const buttons = document.querySelectorAll('.button-animate');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.remove('opacity-0', 'translate-y-5'); // Убираем классы для анимации
            button.classList.add('opacity-100', 'translate-y-0'); // Добавляем классы для анимации
        }, 1000 + index * 200); // Задержка для анимации кнопки
    });

    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon, index) => {
        icon.style.transform = 'scale(0)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 1000 + index * 200); 
    });

    const images = document.querySelectorAll('img.fade-in');
    images.forEach((image, index) => {
        setTimeout(() => {
            image.classList.add('fade-in-active');
        }, 500 + index * 300); 
    });
}
