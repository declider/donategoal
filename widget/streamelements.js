const jwt = params.get("seToken")

const se = io('https://realtime.streamelements.com', {
	transports: ['websocket']
})

se.on('connect', onConnect)

se.on('event', (data) => {
	if (data.type != "tip") { return }
	if (data.data.currency != "RUB") { return }
	donate(data.data.amount)
})

se.on('event:test', (data) => {
	if (data.type != "tip") { return }
	if (data.data.currency != "RUB") { return }
	donate(data.data.amount)
})

function onConnect() {
	se.emit('authenticate', {method: 'jwt', token: jwt})
	console.log("Подключен Streamelements")
}

