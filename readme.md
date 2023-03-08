Кастомный донатгол.

Ссылка: https://declider.github.io/donategoal

Команды для модераторов: https://github.com/declider/donategoal/blob/main/commands.md

Как запустить несколько виджетов одновременно: https://github.com/declider/donategoal/blob/main/wid.md

Доделать:
- [x] Добавить интеграцию с Twitch чатом для управления модераторами
- [x] Добавить модерские команды на главную страницу
- [x] ~~Добавить настройки для расположения текста~~ Просто центрировать его
- [ ] ~~Добавить общую задоначенную сумму под виджет~~ Вряд ли это надо
- [ ] Проверить работу других валют на DonatePay.
- [x] Пофиксить отображение копеек
- [x] Пофиксить подключение двух виджетов одновременно с использованием DonatePay (ошибка 429 от DonatePay API)
  - [ ] Проверить работу фикса в деле
  - [x] ~~Разделить своё api /dp на /dpid и /dptoken~~ Возвращать в /dp только token, а id брать в другом месте
- [x] Проверить долгие подключения (10+ часов) UPD. DA работает вроде норм, DP вылетает после 5-6 часов
  - [x] Пофиксить отключения DonatePay после 5-6 часов (просто обновляю страницу при вылете 4Head )
- [x] Обновить логику загрузки и сохранения локальных данных
  - [x] ~~Добавить включение "уникальных" виджетов на основной странице~~ Это слишком узконаправленная штука, хватит выноски снизу.
  - [x] Генерировать wid для ссылки в виджете **по умолчанию 0**, **А надо ли?**
  - [x] Читать wid как "идентификатор" виджета чтобы загружать и сохранять его уникальные данные
  - [x] Если wid нет - ставить дефолтный
  - [x] Сделать нормальное сохранение данных одним "объектом", а не кучей ключей
- [x] Разделить кнопку "сброс" на "сброс виджета" и "сброс всего"
- [x] Сохранять локальные данные не только при ручном изменении данных
- [x] ~~Задуматься над резонностью использования DonatePay в духе "а может отрубиться от него нафиг? с ним только проблемы"~~ Проблемы Донатпей = проблемы тех, кто использует Донатпей, а не мои. Большую часть исправил.
- [x] ~~Donatty?~~ Лень
- [ ] Добавить картинки на главную страницу, для соответствующих "возможностей"
- [x] Добавить стили для области настроек в виджете
- [x] Переписать всякие непонятные надписи
- [x] Добавить кнопки "Обнулить" для значений "сейчас" и "счётчик"
- [x] Добавить автопереподключения при разрыве интернета
- [x] Ставить текст "загружаю" на кнопке "скопировать" пока идёт подключение к DonationAlerts
- [ ] Уйти со своего АПИ для удобства:
  - [X] DonatePay
  - [ ] DonationAlerts

P.S. коммитов много, ибо решил прям тут тестить, иначе лень
