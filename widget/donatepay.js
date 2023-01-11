async function getDPData() {
    let res = await fetch('https://donategoalforhuman.deta.dev/dp?apikey='+dptoken, {
        method: 'get'
    })
    return await res.json()
}


async function startDP() {
    let data = await getDPData()
    let channel = "$public:"+data.id
    centrifugeDP.setToken(data.token)

    centrifugeDP.on('error', (e) => {
        console.log("error",e)
        if(!centrifugeDP.isConnected()){
            centrifugeDP.connect()
        }
    })

    centrifugeDP.on('disconnect', (e) => {
        console.log("DP отключён!")
        centrifugeDP.connect()
    })
    
    centrifugeDP.subscribe("$public:"+data.id, function (message) {
        let sum = message.data.notification.vars.sum
        console.log(message)
        add_sum(sum)
    })
    
    centrifugeDP.on('connect', (e) => {
        console.log("Подключен DonatePay")
    })

    // Метод фактического подключения к серверу
    if(!centrifugeDP.isConnected()){
        centrifugeDP.connect()
    }
}


if( dptoken && !centrifugeDP.isConnected() ){
    startDP()
}
