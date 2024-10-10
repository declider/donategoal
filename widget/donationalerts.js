const datoken = params.get("daToken")

let centrifugeDA

async function getDAData() {
	// CORS аааааааааааааааааа
	let url = 'https://declider.helioho.st/api/da_data?access_token='+datoken
	let res = await fetch(url, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return (await res.json())
}


async function startDA() {
	let da_data = await getDAData()
	centrifugeDA.setToken(da_data.data.socket_connection_token)

	centrifugeDA.on('error', (e) => {
		console.log("error",e)
		if(!centrifugeDA.isConnected()){
			centrifugeDA.connect()
		}   
	})

	centrifugeDA.on('disconnect', (e) => {
		console.log("DA отключён!")
		centrifugeDA.connect()
	})

	centrifugeDA.on('subscribe', (e) => {
		console.log('subscribe', e)
	})

	centrifugeDA.on('connect', (e) => {
		console.log("Подключен DonationAlerts")
	})

	centrifugeDA.subscribe('$alerts:donation_'+da_data.data.id, message => {
		donate(message.data.amount_in_user_currency)
	})

	if(!centrifugeDA.isConnected()){
		centrifugeDA.connect()
	}
}

if (datoken && !centrifugeDA) {
	centrifugeDA = new Centrifuge('wss://centrifugo.donationalerts.com/connection/websocket', {
		websocket: WebSocket,
		subscribeEndpoint: 'https://www.donationalerts.com/api/v1/centrifuge/subscribe',
		subscribeHeaders: {
			'Authorization': `Bearer `+datoken
		}
	})
}


if (datoken && !centrifugeDA.isConnected()) {
	startDA()
}
