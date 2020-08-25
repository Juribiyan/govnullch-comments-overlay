# govnullch-comments-overlay
Использование треда на нульчабе в качестве комментов для OBS

## Использование
1. Внутри `/node-api/` произведите `npm install`
2. Введите в `node-api/index.js` и `/api.js/` настройки используемых борд (поддерживаются говнульч и instant 0chan).

2.1 Параметр `session` для говнульча получаем через `localStorage['sessionId']`.

2.2 Для onion-досок используем socks-прокси (tor должен быть запущен).
3. Внутри `index.js` можно поменять тред по умолчанию.
4. Выбор треда: `http://your_local_url?threads=chan_id/board_id-thread_id` (для говнульча `http://your_local_url?threads=chan_id/thread_id`).

4.1 Выбор нескольких тредов производится через запятую: `http://your_local_url?threads=chan_id/board_id-thread_id,other_chan_id/thread_id` и так далее.