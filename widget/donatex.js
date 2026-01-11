const dxtoken = params.get("dxToken")

async function startDX() {
    let url = `https://donatex.gg/api/public-donations-hub?access_token=${encodeURIComponent(dxtoken)}`
    let connection = new signalR.HubConnectionBuilder()
        .withUrl(url)
        .withAutomaticReconnect()
        // .configureLogging(LogLevel.Information)
        .build();

    connection.on('DonationCreated', (donation) => {
        donate(donation.amountInRub)
    })

    await connection.start();
}

if (dxtoken) {
    startDX()
}