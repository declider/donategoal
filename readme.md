Кастомный донатгол.

Ссылка: https://declider.github.io/donategoal

Известные баги:
- DonatePay может отрубаться после долгого подключения (5+ часов). Был фикс, но проверки фикса не было, поэтому пока в багах.
- Невозможно добавить два виджета с разными данные одновременно, ибо они загружают одинаковые данные.
- При частом обновлении виджета DonatePay не подключается (ошибка 429)

Доделать:
- [ ] Добавить интеграцию с Twitch чатом для управления модераторами
- [ ] Добавить модерские команды на главную страницу
- [x] ~~Добавить настройки для расположения текста~~ Просто центрировать его
- [ ] Добавить общую задоначенную сумму под виджет
- [ ] Проверить работу других валют на DonatePay
- [x] Пофиксить отображение копеек
- [ ] Пофиксить подключение двух виджетов одновременно с использованием DonatePay (ошибка 429 от DonatePay API)
- [x] Проверить долгие подключения (10+ часов) UPD. DA работает вроде норм, DP вылетает после 5-6 часов
  - [x] Пофиксить отключения DonatePay после 5-6 часов (просто обновляю страницу при вылете 4Head )
- [ ] Обновить логику загрузки и сохранения локальных данных
  - [ ] Генерировать wid для ссылки в виджете
  - [ ] Читать wid как "идентификатор" виджета чтобы загружать и сохранять его уникальные данные
  - [ ] Если wid нет - ставить дефолтный
  - [ ] Сделать нормальное сохранение данных одним "объектом", а не кучей ключей
- [ ] Разделить кнопку "сброс" на "сброс виджета" и "сброс всего"
- [x] Сохранять локальные данные не только при ручном изменении данных
- [ ] Задуматься над резонностью использования DonatePay в духе "а может отрубиться от него нафиг? с ним только проблемы"
- [ ] Donatty?
- [ ] Добавить картинки на главную страницу, для соответствующих "возможностей"
- [x] Добавить стили для области настроек в виджете
- [x] Переписать всякие непонятные надписи
- [x] Добавить кнопки "Обнулить" для значений "сейчас" и "счётчик"
- [x] Добавить автопереподключения при разрыве интернета
- [x] Ставить текст "загружаю" на кнопке "скопировать" пока идёт подключение к DonationAlerts


P.S. коммитов много, ибо решил прям тут тестить, иначе лень
