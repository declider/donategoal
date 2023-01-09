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
    centrifugeDA.setToken(await getDAData())

    centrifugeDA.on('error', (e) => {
        console.log('error', e)
    })

    centrifugeDA.on('subscribe', (e) => {
        console.log('subscribe', e)
    })

    centrifugeDA.on('connect', (e) => {
        console.log("Подключен DonationAlerts")
        centrifugeDA.subscribe('$alerts:donation_'+daid, message => {
            let sum = message.data.amount_in_user_currency
            console.log(message)
            add_sum(sum)
        })
    })

    centrifugeDA.connect()
}


if(datoken&&daid){
    console.log("2")
    startDA()
    console.log("3")
}
