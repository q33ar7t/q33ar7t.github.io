# Найди своего жениха

Интерактивный свадебный квиз на React, собирается через [Vite](https://vite.dev).

## Запуск

```bash
npm install      # установить зависимости
npm run dev      # дев-сервер с hot-reload
npm run build    # production-сборка в dist/
npm run preview  # локальный предпросмотр собранного dist/
```

## Структура

```
index.html        — точка входа Vite
src/
  main.jsx        — bootstrap: шрифты, стили, рендер <App>
  App.jsx         — компоненты экранов (Home / Question / Result)
  data.js         — данные квиза (экспорт QUIZ)
  styles.css      — стили
public/
  img/, svg/      — статические ассеты (отдаются из корня /)
```

Все зависимости подключаются как npm-пакеты (раньше тянулись с CDN):
`react`, `react-dom`, а шрифты — через `@fontsource/*` (Caveat, Roboto Mono,
Source Serif 4) вместо Google Fonts CDN. Babel-in-browser больше не нужен —
JSX компилирует Vite.
