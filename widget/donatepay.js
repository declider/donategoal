async function getDPData() {
    let data = JSON.stringify({"access_token": dptoken})
    let res = await fetch('https://donatepay.ru/api/v2/socket/token', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    })

    let token = await res.json()
    return token.token
}


async function startDP() {
    let token = await getDPData()
    centrifugeDP.setToken(token)

    // centrifugeDP.on('error', (e) => {
    //     console.log("error",e)
        
    //     if(!centrifugeDP.isConnected()){
    //         centrifugeDP.connect()
    //     }
    // })
    // TEST

    centrifugeDP.on('disconnect', (e) => {
        console.log("DP отключён!")
        
        // После 5-6 часов донатпей "заканчивается" с соответствущим статуслм и не может подключиться обратно (адрес /cengrifuge/refresh)
        // Хз как это поправить, как минимум потому что хз как это тестить
        // Так что виджет тупо перезагружается если ошибка возвращает expired
        if(e.reason=="expired") { 
            window.location.reload(true)
        }
        
        centrifugeDP.connect()
    })
    
    centrifugeDP.subscribe("$public:"+dpid, function (message) {
        let sum = message.data.notification.vars.sum
        console.log(message)
        addSum(sum)
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
