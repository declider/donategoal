async function getDAData() {
    let res = await fetch('https://donategoal-1-y7341314.deta.app/dasocket?token='+datoken, {
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

    // centrifugeDA.on('error', (e) => {
    //     console.log("error",e)
    //     if(!centrifugeDA.isConnected()){
    //         centrifugeDA.connect()
    //     }
    // }) 
    // TEST

    centrifugeDA.on('disconnect', (e) => {
        console.log("DA отключён!")
        centrifugeDA.connect()
    })
    
    centrifugeDA.subscribe(channel, message => {
        let sum = message.data.amount_in_user_currency
        console.log(message)
        addSum(sum)
    })
  
    centrifugeDA.on('connect', (e) => { 
        console.log("Подключен DonationAlerts")
    })
    
    if(!centrifugeDA.isConnected()){
        centrifugeDA.connect()
    }
}

if( datoken && daid && !centrifugeDA.isConnected() ){
    startDA()
}
