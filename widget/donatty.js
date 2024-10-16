const dttRef = params.get("dttRef")
const dttToken = params.get("dttToken")
let dttEventSource


async function getDTTData() {
	let url = "https://api-012.donatty.com/auth/tokens/" + dttToken
	let res = await fetch(url, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		}
	})
	return (await res.json())
}


async function startDTT() {
	let dttData = await getDTTData()
	let dttJWT = dttData.response.accessToken

	const url = `https://api-013.donatty.com/widgets/${dttRef}/sse?zoneOffset=-180&jwt=${dttJWT}`

	dttEventSource = new EventSource(url)

	dttEventSource.onmessage = function(event) {
		try {
			let data = JSON.parse(event.data)
			let currency = data.data.events[0].event.data.currency
			if (currency == "RUB") {
				let amount = data.data.events[0].event.data.amount
				donate(amount)
			}
		} catch {}
	}

	dttEventSource.onerror = function(e) {
		dttEventSource.close()
		setTimeout(function() {
			startDTT()
		}, 5000)
	}

	console.log("Подключен Donatty")
}


if (dttToken && dttRef) {
	startDTT()
	setInterval(() => {
		dttEventSource.close()
		startDTT()
	}, 30 * 60 * 1000)
}
