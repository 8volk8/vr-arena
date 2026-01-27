# VR Fusion — Маркетинговый гид

Интерактивный сайт с результатами маркетингового исследования для команды VR Fusion.

## Функции

- 14 разделов с подробной информацией о маркетинге
- Пошаговые инструкции по настройке рекламных каналов
- Защита паролем для безопасного доступа
- Адаптивный дизайн (мобильные + десктоп)
- Навигация между разделами

## Доступ

**Пароль по умолчанию:** `vrfusion2026`

---

## Деплой на GitHub Pages

### Шаг 1: Создание репозитория

1. Перейдите на [github.com](https://github.com)
2. Нажмите **"+"** → **"New repository"**
3. Название: `vr-fusion-marketing` (или любое другое)
4. **Важно:** Выберите **Private** для безопасности
5. Нажмите **"Create repository"**

### Шаг 2: Загрузка файлов

#### Вариант A: Через терминал (рекомендуется)

```bash
# Откройте терминал и перейдите в папку deployment
cd "/Users/andrey/Documents/projects/Vr arena/marketing-research/deployment"

# Инициализируйте git
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: VR Fusion Marketing Guide"

# Подключите удалённый репозиторий (замените USERNAME на ваш логин GitHub)
git remote add origin https://github.com/USERNAME/vr-fusion-marketing.git

# Отправьте файлы
git branch -M main
git push -u origin main
```

#### Вариант B: Через интерфейс GitHub

1. На странице созданного репозитория нажмите **"uploading an existing file"**
2. Перетащите ВСЕ файлы из папки `deployment/`:
   - `index.html`
   - папку `css/`
   - папку `js/`
   - папку `sections/`
3. Нажмите **"Commit changes"**

### Шаг 3: Включение GitHub Pages

1. В репозитории перейдите в **Settings** (шестерёнка)
2. В левом меню выберите **Pages**
3. В разделе **"Build and deployment"**:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
4. Нажмите **Save**
5. Подождите 1-2 минуты

### Шаг 4: Доступ к сайту

После деплоя сайт будет доступен по адресу:
```
https://USERNAME.github.io/vr-fusion-marketing/
```

Замените `USERNAME` на ваш логин GitHub.

---

## Смена пароля

### Способ 1: Через консоль браузера

1. Откройте сайт в браузере
2. Нажмите **F12** (Developer Tools)
3. Перейдите во вкладку **Console**
4. Введите:
   ```javascript
   generatePasswordHash('новый_пароль')
   ```
5. Скопируйте полученный хеш
6. Откройте файл `js/auth.js`
7. Замените значение `PASSWORD_HASH` на новый хеш
8. Сохраните и загрузите файл на GitHub

### Способ 2: Вручную

1. Откройте [SHA-256 онлайн-генератор](https://emn178.github.io/online-tools/sha256.html)
2. Введите желаемый пароль
3. Скопируйте результат
4. Откройте `js/auth.js`
5. Замените значение `PASSWORD_HASH`
6. Загрузите изменения на GitHub

---

## Структура файлов

```
deployment/
├── index.html              # Главная страница
├── css/
│   └── styles.css          # Стили сайта
├── js/
│   └── auth.js             # Авторизация и навигация
├── sections/
│   ├── 00-summary.html     # Резюме
│   ├── 01-market.html      # Обзор рынка
│   ├── 02-competitors.html # Конкуренты
│   ├── 03-channels.html    # Каналы продвижения
│   ├── 04-segments.html    # Целевые сегменты
│   ├── 05-content.html     # Контент-стратегия
│   ├── 06-crm.html         # CRM и лояльность
│   ├── 07-partnerships.html # Партнёрства
│   ├── 08-seasonality.html # Сезонность
│   ├── 09-analytics.html   # Аналитика и KPI
│   ├── 10-tournaments.html # Турниры
│   ├── 11-premium.html     # Премиум-каналы
│   ├── 12-recommendations.html # Рекомендации
│   └── sources.html        # Источники
└── README.md               # Эта инструкция
```

---

## Обновление контента

Чтобы обновить контент:

1. Отредактируйте нужный HTML-файл в папке `sections/`
2. Загрузите изменения на GitHub:
   ```bash
   git add .
   git commit -m "Update: описание изменений"
   git push
   ```
3. GitHub Pages автоматически обновит сайт (1-2 минуты)

---

## Локальный просмотр

Для просмотра сайта локально:

```bash
# Перейдите в папку deployment
cd "/Users/andrey/Documents/projects/Vr arena/marketing-research/deployment"

# Запустите локальный сервер
python3 -m http.server 8000

# Откройте в браузере
# http://localhost:8000
```

---

## Поддержка

При возникновении проблем:

1. Убедитесь, что все файлы загружены
2. Проверьте настройки GitHub Pages
3. Очистите кеш браузера (Ctrl+Shift+R)
4. Проверьте консоль браузера на ошибки (F12)

---

**Дата создания:** Январь 2026
**Исследование подготовлено для:** [VR Fusion](https://vrfusion.ru/)
