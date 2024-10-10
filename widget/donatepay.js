const dptoken = params.get("dpToken")
const dpid = params.get("dpId")
let centrifugeDP

//TODO - может починить 429?
async function getDPToken() {
	let res = await fetch('https://donatepay.ru/api/v2/socket/token', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"access_token": dptoken
		})
	})
	return (await res.json()).token
}


// CORS аааааааааааааааааа
// async function getDPid() {
// 	let res = await fetch('https://donatepay.ru/api/v1/user?access_token='+dptoken, {
// 		method: 'get',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		}
// 	})
// 	return (await res.json()).data.id
// }


async function startDP() {
	let token = await getDPToken()
	// let id = await getDPid()
	centrifugeDP.setToken(token)
	// const nickname = data.nickname

	centrifugeDP.on('error', (e) => {
		console.log("error",e)
		if(e.reason=="expired") {
			window.location.reload(true)
		}
		if(!centrifugeDP.isConnected()){
			centrifugeDP.connect()
		}
	})

	centrifugeDP.on('disconnect', (e) => {
		console.log("DP отключён!")
		console.log(e)
		centrifugeDP.connect()
	})

	centrifugeDP.on('subscribe', (e) => {
		console.log('subscribe', e)
	})

	centrifugeDP.on('connect', (e) => {
		// centrifugeDP.subscribe("$public:"+id, function (message) {
		centrifugeDP.subscribe("$public:"+dpid, function (message) {
			donate(message.data.notification.vars.sum)
		})
		console.log("Подключен DonatePay")
	})

	if(!centrifugeDP.isConnected()){
		centrifugeDP.connect()
	}
}


if (dptoken && !centrifugeDP) {
	centrifugeDP = new Centrifuge('wss://centrifugo.donatepay.ru:43002/connection/websocket', {
		subscribeEndpoint: 'https://donatepay.ru/api/v2/socket/token',
		subscribeParams:   {
			access_token: dptoken
		},
		disableWithCredentials: true
	})
}


if (dptoken && !centrifugeDP.isConnected()) {
	startDP()
}