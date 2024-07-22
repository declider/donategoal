# Кастомный донатгол.

---

Почему функции вроде "автоувеличение цели" работают только при включённом счётчике, что за духота?:
> Счётчик служит для того, чтобы считать сколько раз заполнялся донатгол. В зависимости от стримера, ситуации, самого донатгола и тд и тп скорость может быть разной. И если вдруг на один маленький донатгол налетит куча донатеров или придёт один большой, заполнив донатгол несколько раз (а то и десятки раз), то стример может потерять счёт и придётся сидеть думать __"А, так тут заполнилось один раз, тут ещё раз, тут сумма увеличилась, а, вот тут ещё донаты были... а как давно они были?"__
А данный донатгол как раз таки предназначен для того чтобы все эти подсчёты происходили автоматически. Так что у меня был выбор - либо разрешить функциям "автоувеличения" работать без счётчика и периодически приводить стримера к возможно редким, но чрезвычайно душным и долгим подсчётам денег по времени, платформам, валютам, количеству и прочим переменным, либо же сделать маааленькую циферку счётчика над донатголом и в случае больших/частых донатов перекинуть всю работу на технику, где всё работает и считается за тебя.

---
##### V2:
- [ ] Изменить вид виджета
  - [ ]  убрать проценты
  - [ ]  убрать 0
  - [ ]  разместить сумму и цель на полоске
- [ ] Полностью переделать лэндинговую страницу
  - [ ] Раскидать всё подключение по отдельным "слайдам"
  - [ ] Добавить простой конструктор стилей на основную страницу
    - [ ] Добавить выбор гугл шрифта
- [ ] Добавить опциональное подключение к указанному вебсокет-серверу для разработчиков (?)
- [ ] Добавить маленькие всплывающие уведомления о сумме доната в центр полоски (?)
- [ ] Добавить вкладку в виджете с историей и общей суммой донатов (?)
- [ ] Скрывать настройки счётчика если он не включён
- [ ] Переработать функцию "свои цели"
  - [ ] Переработать управление в виджете
  - [ ] Фикс конфликта "свои цели" и "автоувеличение цели"
- [ ] Добавить математические операции не только к цели, но и к сумме на которую цель увеличивается
- [ ] Поддержка донатов StreamElements
- [ ] Команда "!дг фикс" для чата

 (?) - подумать надо ли 

Дедлайн: 22 век

---

##### Доделать (v1):
- [x] Добавить интеграцию с Twitch чатом для управления модераторами
- [x] Добавить модерские команды на главную страницу
- [x] ~~Добавить настройки для расположения текста~~ Просто центрировать его
- [ ] ~~Добавить общую задоначенную сумму под виджет~~ Вряд ли это надо
- [ ] Проверить работу других валют на DonatePay.
- [x] Пофиксить отображение копеек
- [x] Пофиксить подключение двух виджетов одновременно с использованием DonatePay (ошибка 429 от DonatePay API)
  - [ ] Проверить работу фикса в деле (может это уже тестилось, но я не помню)
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
- [x] ~~Добавить картинки на главную страницу, для соответствующих "возможностей"~~ Лень
- [x] Добавить стили для области настроек в виджете
- [x] Переписать всякие непонятные надписи
- [x] Добавить кнопки "Обнулить" для значений "сейчас" и "счётчик"
- [x] Добавить автопереподключения при разрыве интернета
- [x] Ставить текст "загружаю" на кнопке "скопировать" пока идёт подключение к DonationAlerts
- [ ] Уйти со своего АПИ для удобства:
  - [X] DonatePay
  - [ ] DonationAlerts (пока что не знаю как это лучше сделать)
- [ ] Тесты с отключением onerror

P.S. коммитов много, ибо решил прям тут тестить, иначе лень

---

##### Использовано
ComfyJS - https://github.com/instafluff/ComfyJS  
Centrifugo - https://www.npmjs.com/package/centrifuge  
Roboto - https://fonts.google.com/specimen/Roboto  
