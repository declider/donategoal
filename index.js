async function auth() {
    
    let res = await fetch('https://donategoal-1-y7341314.deta.app/da?code='+code, {
        method: "get"
    })
    return await res.json()
    
}

let url = new URL("https://declider.github.io/donategoal/widget/")

let params = (new URL(document.location)).searchParams
let code = params.get("code") || undefined

let copyBtn = document.getElementById("copy")

if(code!==undefined) {
    copy.textContent = "Загружаю..."
    auth().then(data => {
        url.searchParams.set("daid", data["id"])
        url.searchParams.set("datoken", data["token"])
        
        document.getElementById("link").value = url.toString()
        copy.textContent = "Скопировать"
    })
}

function addDPToken() {
    let dptoken = document.getElementById("dptoken").value
    url.searchParams.set("dptoken", dptoken)

    document.getElementById("link").value = url.toString()
}


function addDPid() {
    let dpid = document.getElementById("dpid").value
    url.searchParams.set("dpid", dpid)

    document.getElementById("link").value = url.toString()
}


function copyLink() {
    let link = document.getElementById("link").value
    navigator.clipboard.writeText(link)
    navigator.clipboard.writeText(link)
    alert("Ссылка для OBS скопирована!")
}

function addChannel(){
    let channel = document.getElementById("channel").value
    url.searchParams.set("channel", channel)
    link.value = url.toString()
}


function openInfo(el){
    document.getElementById(el).style.visibility = "visible"
}

function closeInfo(el){
    document.getElementById(el).style.visibility = "hidden"
}
