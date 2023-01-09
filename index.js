async function auth() {
    
    let res = await fetch('https://donategoalforhuman.deta.dev/da?code='+code, {
        method: "get"
    })
    return await res.json()
    
}

let url = new URL("https://declider.github.io/somestuff/donategoal/widget/widget.html")

let params = (new URL(document.location)).searchParams
let code = params.get("code") || undefined

if(code!==undefined) {
    auth().then(data => {
        url.searchParams.set("daid", data["id"])
        url.searchParams.set("datoken", data["token"])
        
        document.getElementById("link").value = url.toString()
    })
}

function addDPToken() {
    let dptoken = document.getElementById("dptoken").value
    url.searchParams.set("dptoken", dptoken)

    document.getElementById("link").value = url.toString()
}

function copy_link() {
    let link = document.getElementById("link").value
    navigator.clipboard.writeText(link)
    alert("Ссылка для OBS скопирована!")
}
