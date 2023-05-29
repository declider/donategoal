# Кастомный донатгол.

Ссылка: https://declider.github.io/donategoal

---

Почему функции вроде "автоувеличение цели" работают только при включённом счётчике, что за духота?:
> Счётчик служит для того, чтобы считать сколько раз заполнялся донатгол. В зависимости от стримера, ситуации, самого донатгола и тд и тп скорость может быть разной. И если вдруг на один маленький донатгол налетит куча донатеров или придёт один большой, заполнив донатгол несколько раз (а то и десятки раз), то стример может потерять счёт и придётся сидеть думать __"А, так тут заполнилось один раз, тут ещё раз, тут сумма увеличилась, а, вот тут ещё донаты были... а как давно они были?"__
А данный донатгол как раз таки предназначен для того чтобы все эти подсчёты происходили автоматически. Так что у меня был выбор - либо разрешить функциям "автоувеличения" работать без счётчика и периодически приводить стримера к возможно редким, но чрезвычайно душным и долгим подсчётам денег по времени, платформам, валютам, количеству и прочим переменным, либо же сделать маааленькую циферку счётчика над донатголом и в случае больших/частых донатов перекинуть всю работу на технику, где всё работает и считается за тебя.

---

##### Доделать:
- [x] Добавить интеграцию с Twitch чатом для управления модераторами
- [x] Добавить модерские команды на главную страницу
- [x] ~~Добавить настройки для расположения текста~~ Просто центрировать его
- [ ] ~~Добавить общую задоначенную сумму под виджет~~ Вряд ли это надо
- [ ] Проверить работу других валют на DonatePay.
- [x] Пофиксить отображение копеек
- [x] Пофиксить подключение двух виджетов одновременно с использованием DonatePay (ошибка 429 от DonatePay API)
  - [ ] Проверить работу фикса в деле
  - [x] ~~Разделить своё api /dp на /dpid и /dptoken~~ id теперь вписывается стримером, а token берётся прямо по DonatePay API
- [x] Проверить долгие подключения (10+ часов) UPD. DA работает вроде норм, DP вылетает после 5-6 часов
  - [x] Пофиксить отключения DonatePay после 5-6 часов (просто обновляю страницу при вылете 4Head )
- [x] Обновить логику загрузки и сохранения локальных данных
  - [x] ~~Добавить включение "уникальных" виджетов на основной странице~~ Это слишком узконаправленная штука, хватит выноски снизу.
  - [x] Генерировать wid для ссылки в виджете **по умолчанию 0**
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

---

##### Использовано
ComfyJS - https://github.com/instafluff/ComfyJS
Centrifugo - https://www.npmjs.com/package/centrifuge
Roboto - https://fonts.google.com/specimen/Roboto
