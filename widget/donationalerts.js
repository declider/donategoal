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
        subDA.unsubscribe()
        centrifugeDA.connect()
    })
    
   
    centrifugeDA.on('connect', (e) => {
        let subDA = centrifugeDA.subscribe('$alerts:donation_'+daid, message => {
            let sum = message.data.amount_in_user_currency
            console.log(message)
            add_sum(sum)
        })
        console.log("Подключен DonationAlerts")
    })
    
   
    if(!centrifugeDA.isConnected()){
        centrifugeDA.connect()
    }
}


if( datoken && daid && !centrifugeDA.isConnected() ){
    startDA()
}
