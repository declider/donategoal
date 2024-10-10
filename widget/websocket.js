let wsUrl = params.get("wsUrl")

let ws, elements, wsSafeTimer


function startWs() {

	if (!wsUrl) {return}
	

	// Если подключение не WSS - то только к локальным серврам
	if (wsUrl.startsWith("ws://")) {
		if (!wsUrl.startsWith("ws://localhost") && !wsUrl.startsWith("ws://127.0.0.1")) {
			return
		}
	}
	console.log(wsUrl)
	ws = new WebSocket(wsUrl)

	// Смотри wsGetAllData()
	elements = {
		titleValue: titleValue, // Название
		sumValue: sumValue, // Сумма
		goalValue: goalValue, // Цель

		countValue: countValue, // Счётчик
		countLimitValue: countLimitValue, // Лимит счётчика

		stepMode: stepMode, // Шаг автоувеличения 
		stepValue: stepValue, // Режим автоувеличения 

		boostMode: boostMode, // Шаг роста автоувеличения
		boostValue: boostValue, // Режим роста автоувеличения

		goalLimitValue: goalLimitValue // Лимит цели
	}


	ws.onopen = function() {
		let data = wsGetAllData()
		let msg = {event: "donategoal_ws_open", data: data}
		ws.send(JSON.stringify(msg))
		console.log("Подключено к WebSocket")
	}


	ws.onclose = function() {
		let data = wsGetAllData()
		let msg = {event: "donategoal_ws_close", data: data}
		ws.send(JSON.stringify(msg))
		console.log("Отключено от WebSocket")
	}


	ws.onmessage = function(event) {
		let msg = JSON.parse(event.data)
		if (msg.event != "update") { return }
		let data = msg["data"] || {}
		wsUpdateData(data)
	}
}
startWs()



// Эта функция срабатывает в основном скрипте в самом конце updateData()
// Сама же updateData() срабатывает при любом донате или при любом изменении стримером какого-то поля
// Отправляются только текущие значения
//
// Есть таймер в 3 секунды, чтобы не спамить сообщениями.
// Он запускается после updateData и сообщение отправляется только после таймера
// Если во время активного таймера пришло ещё одно сообщение - он перезапускается
//
// Если за один большой донат донатгол заполнился несколько раз
// всё равно отправится только 1 сообщение с итоговыми значениями
function wsNewEvent() {
	if (!ws) return
	if (wsSafeTimer) {
		clearTimeout(wsSafeTimer)
	}

	wsSafeTimer = setTimeout(function() {
		let data = wsGetAllData()
		let msg = {event: "donategoal_ws_update", data: data}
		ws.send(JSON.stringify(msg))
	}, 3000)
}




function wsGetAllData() {
	if (!ws) return
	let data = { // Вся data из сообщений
		titleValue: elements.titleValue.value, // Название
		sumValue: elements.sumValue.valueAsNumber, // Сумма
		goalValue: elements.goalValue.valueAsNumber, // Цель

		countValue: elements.countValue.valueAsNumber, // Счётчик
		countLimitValue: elements.countLimitValue.valueAsNumber, // Лимит счётчика

		stepMode: elements.stepMode.value, // Шаг автоувеличения 
		stepValue: elements.stepValue.valueAsNumber, // Режим автоувеличения (add/multiply)

		boostMode: elements.boostMode.value, // Шаг роста автоувеличения
		boostValue: elements.boostValue.valueAsNumber, // Режим роста автоувеличения (add/multiply)

		goalLimitValue: elements.goalLimitValue.valueAsNumber // Лимит цели
	}
	return data
}



// Обновление значений
// Нужно отправить этому клиенту такой же json, который он отправляет сам при каждом обновлении
// {"event": "update", "data": data}
// ключ-значение в функции wsGetAllData() выше
// не обязательно отправлять все ключи, можно только нужное, например
// {"event": "update", "data": {"sumValue": 1200, "stepMode": "add", "boostValue": 0}}
function wsUpdateData(data) {
	for (const key in data) {
		if (data.hasOwnProperty(key) && elements[key]) {
			const element = elements[key]
			if (element.type == "checkbox") {
				element.checked = Boolean(data[key])
			} else if (element.type == "number" || element.type == "text" || element.tagName == "SELECT") {
				element.value = data[key]
			}
		}
	}
	updateData()
}