/**
 * VR Fusion Marketing Guide - Authentication
 *
 * Простая защита паролем для GitHub Pages.
 * Пароль по умолчанию: vrfusion2026
 *
 * Чтобы изменить пароль:
 * 1. Откройте консоль браузера (F12)
 * 2. Введите: generatePasswordHash('новый_пароль')
 * 3. Скопируйте результат и замените значение PASSWORD_HASH ниже
 */

// SHA-256 хеш пароля "vrfusion2026"
const PASSWORD_HASH = 'c0907fbb2bbf56f021149e746a82dd790b785a1052dd4058db19ba3f9e02faa0';

// Ключ для localStorage
const AUTH_KEY = 'vr_fusion_auth';

// Время сессии (24 часа в миллисекундах)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

/**
 * Генерация SHA-256 хеша
 */
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Функция для генерации хеша нового пароля (использовать в консоли)
 */
window.generatePasswordHash = async function(password) {
    const hash = await sha256(password);
    console.log('Хеш пароля:', hash);
    console.log('Замените значение PASSWORD_HASH в auth.js на это значение.');
    return hash;
};

/**
 * Проверка авторизации
 */
function checkAuth() {
    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return false;

    try {
        const { timestamp, hash } = JSON.parse(authData);
        const now = Date.now();

        // Проверяем срок действия сессии
        if (now - timestamp > SESSION_DURATION) {
            localStorage.removeItem(AUTH_KEY);
            return false;
        }

        // Проверяем хеш
        return hash === PASSWORD_HASH;
    } catch (e) {
        localStorage.removeItem(AUTH_KEY);
        return false;
    }
}

/**
 * Сохранение авторизации
 */
function saveAuth() {
    const authData = {
        timestamp: Date.now(),
        hash: PASSWORD_HASH
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

/**
 * Выход из системы
 */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    showAuthScreen();
}

/**
 * Показать экран авторизации
 */
function showAuthScreen() {
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('main-container').classList.remove('visible');
}

/**
 * Показать главный контент
 */
function showMainContent() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('main-container').classList.add('visible');
}

/**
 * Обработка формы входа
 */
async function handleLogin(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('password-input');
    const errorElement = document.getElementById('auth-error');
    const password = passwordInput.value;

    // Генерируем хеш введённого пароля
    const inputHash = await sha256(password);

    if (inputHash === PASSWORD_HASH) {
        saveAuth();
        showMainContent();
        errorElement.style.display = 'none';
        passwordInput.value = '';
    } else {
        errorElement.style.display = 'block';
        errorElement.textContent = 'Неверный пароль. Попробуйте ещё раз.';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

/**
 * Загрузка контента раздела
 */
async function loadSection(sectionFile) {
    const contentArea = document.getElementById('section-content');

    try {
        const response = await fetch(`sections/${sectionFile}`);
        if (!response.ok) throw new Error('Section not found');

        const html = await response.text();

        // Извлекаем только содержимое body
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('.section-content');

        if (content) {
            contentArea.innerHTML = content.innerHTML;
        } else {
            contentArea.innerHTML = html;
        }

        // Обновляем активный пункт меню
        updateActiveNavItem(sectionFile);

        // Прокручиваем наверх
        window.scrollTo(0, 0);

        // Закрываем мобильное меню
        document.querySelector('.sidebar').classList.remove('open');

    } catch (error) {
        contentArea.innerHTML = `
            <div class="card">
                <h2>Ошибка загрузки</h2>
                <p>Не удалось загрузить раздел. Попробуйте обновить страницу.</p>
            </div>
        `;
    }
}

/**
 * Обновление активного пункта меню
 */
function updateActiveNavItem(sectionFile) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionFile) {
            item.classList.add('active');
        }
    });
}

/**
 * Переключение мобильного меню
 */
function toggleMobileMenu() {
    document.querySelector('.sidebar').classList.toggle('open');
}

/**
 * Инициализация при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    if (checkAuth()) {
        showMainContent();
    } else {
        showAuthScreen();
    }

    // Обработчик формы входа
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Обработчики навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                loadSection(section);
            }
        });
    });

    // Обработчик выхода
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Обработчик мобильного меню
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Закрытие меню при клике вне его (мобильная версия)
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.getElementById('menu-toggle');

        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // Загружаем первый раздел по умолчанию
    if (checkAuth()) {
        loadSection('00-summary.html');
    }
});

// Глобальные функции для использования в HTML
window.loadSection = loadSection;
window.logout = logout;
