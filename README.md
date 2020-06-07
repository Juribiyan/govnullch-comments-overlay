# govnullch-comments-overlay
Использование треда на нульчабе в качестве комментов для OBS

## Использование
1. Внутри `/node-api/` произведите `npm install`, введите в `index.js` параметр `session` (получаем через `localStorage['sessionId']`), по необходимости смените URL `api`. После чего запустите `node index.js`.
2. Внутри `index.js` можно поменять тред по умолчанию.
3. Выбор треда: `http://your_local_url/?thread=9901`
