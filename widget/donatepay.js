async function getDPData() {
    let res = await fetch('https://donategoalforhuman.deta.dev/dp?apikey='+dptoken, {
        method: 'get'
    })
    return await res.json()
}

async function startDP() {
    let data = await getDPData()
    centrifugeDP.setToken(data.token)

    centrifugeDP.subscribe("$public:"+data.id, function (message) {
        let sum = message.data.notification.vars.sum
        console.log(message)
        add_sum(sum)
    });

    centrifugeDP.on('error', (e) => {
        console.log('error', e)
    })

    centrifugeDP.on('subscribe', (e) => {
        console.log('subscribe', e)
    })

    centrifugeDP.on('connect', (e) => {
        console.log(e)
        console.log("Подключен DonatePay")
    })

    // Метод фактического подключения к серверу
    centrifugeDP.connect()
}


if(dptoken){
    startDP()
}
