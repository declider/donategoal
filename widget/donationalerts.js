async function getDAData() {
    let res = await fetch('https://donategoalforhuman.deta.dev/dasocket?token='+datoken, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return (await res.json()).socket_connection_token
}


async function startDA() {
    let channel = '$alerts:donation_'+daid
    centrifugeDA.setToken(await getDAData())

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
    
    let subDP = centrifugeDA.subscribe(channel, function (message) {
        console.log("Подписан на DonationAlerts")
        let sum = message.data.notification.vars.sum
        console.log(message)
        add_sum(sum)
    })

    centrifugeDA.on('connect', (e) => {
        if(subDA._status!=3) {
            subDP = centrifugeDA.subscribe(channel, function (message) {
                console.log("Подписан на DonationAlerts")
                let sum = message.data.notification.vars.sum
                console.log(message)
                add_sum(sum)
            })
        }
        console.log("Подключен DonationAlerts")
    })
    
   
    if(!centrifugeDA.isConnected()){
        centrifugeDA.connect()
    }
}


if( datoken && daid && !centrifugeDA.isConnected() ){
    startDA()
}
