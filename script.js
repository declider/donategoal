window.location.hash = window.location.hash ? window.location.hash : "home"


// #region Кастомизация
const fonts = [
	'Roboto Slab:100,200,300,400,500,600,700,800,900',
	'Montserrat:100,200,300,400,500,600,700,800,900',
	'Inter:100,200,300,400,500,600,700,800,900',
	'Oswald:200,300,400,500,600,700',
	'Raleway:100,200,300,400,500,600,700,800,900',
	'Nunito:200,300,400,500,600,700,800,900',
	'Handjet:100,200,300,400,500,600,700,800,900',
	'Pacifico:400',
	'Caveat:400,500,600,700',
	'Amatic SC:400,700',
	'Russo One:400',
	'Sofia Sans Condensed:100,200,300,400,500,600,700,800,900',
	'Bad Script:400',
	'Tiny5:400'
]

fonts.forEach(font => {
	let option = document.createElement("option")
	option.value = font
	option.innerHTML = font.split(":")[0]
	document.querySelector("#customization-fonts").appendChild(option)
})



function applyFont() {
	// #region Выбор шрифта
	let font = document.querySelector("#customization-fonts").value.split(":")[0]
	document.documentElement.style.setProperty('--font-family', font)
	// #endregion Выбор шрифта

	// #region Размер шрифта
	let size = document.querySelector("#customization-sizes").value
	document.documentElement.style.setProperty('--font-size', `${size}px`)
	// #endregion Размер шрифта
	
	// #region Насыщенность шрифта
	let weightInput = document.querySelector("#customization-weights")
	let weights = document.querySelector("#customization-fonts").value.split(":")[1].split(",")
	weightInput.min = weights[0]
	if (weights.length > 1) {
		weightInput.max = weights[weights.length - 1]
		weightInput.step = weights[1] - weights[0]
	} else {
		weightInput.max = weights[0]
		weightInput.step = 100
	}

	if (weights.value > weightInput.max || weights.value < weightInput.min) {
		weightInput.value = weights[0]
	}

	if (weights.length == 1) {
		weightInput.disabled = true
	} else {
		weightInput.disabled = false
	}

	let weight = weightInput.value
	document.documentElement.style.setProperty('--font-weight', weight)
	// #endregion Насыщенность шрифта

	// #region Тень шрифта
	let shadow = document.querySelector("#customization-shadow").value
	document.documentElement.style.setProperty('--shadow', `var(--shadow-${shadow})`)
	// #endregion Тень шрифта

	// #region Цвета
	let color1 = document.querySelector("#customization-color-1").value
	let color2 = document.querySelector("#customization-color-2").value
	document.documentElement.style.setProperty('--bg-color', `linear-gradient(to right, ${color1}, ${color2})`)
	// #endregion Цвета

	let code = `@import url('https://fonts.googleapis.com/css2?family=${font.replace(" ", "+")}:wght@${weight}&display=swap');

:root {
	--bg-color: linear-gradient(to right, ${color1}, ${color2});
	--font-family: '${font}';
	--font-weight: ${weight};
	--font-size: ${size}px;
	--shadow: var(--shadow-${shadow});
}

body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }`
	document.querySelector("code").textContent = code
}

applyFont()

document.querySelector("#customization-fonts").addEventListener("input", applyFont)
document.querySelector("#customization-sizes").addEventListener("input", applyFont)
document.querySelector("#customization-weights").addEventListener("input", applyFont)
document.querySelector("#customization-shadow").addEventListener("input", applyFont)
document.querySelector("#customization-color-1").addEventListener("input", applyFont)
document.querySelector("#customization-color-2").addEventListener("input", applyFont)


function copyCSS() {
	let button = document.querySelector("#copy-css")
	let code = document.querySelector("code").textContent
	navigator.clipboard.writeText(code)
	button.textContent = "Скопировано!"

	setTimeout(() => {
		button.textContent = "Скопировать"
	}, 3000)

}
document.querySelector("#copy-css").addEventListener("click", copyCSS)
// #endregion Кастомизация



// #region Подключения
let daToken, dpToken, dpId, seToken, twitchChannel, wsUrl


function donationAlertsAuth() {
	window.open(
		"https://www.donationalerts.com/oauth/authorize?client_id=10375&response_type=token&scope=oauth-donation-subscribe+oauth-user-show+oauth-donation-index&force_verify=true&redirect_uri=http://127.0.0.1:3000/landing/index.html",
		"authWindow",
		"width=600,height=800"
	)
}
document.querySelector("#donationalerts-auth").addEventListener("click", donationAlertsAuth)


function donationAlertsAuthFinish(accessToken) {
	window.location.hash = "connect"
	daToken = accessToken
	document.querySelector("#donationalerts-title").dataset.connected = "true"
}


if (window.location.hash.startsWith("#access_token") && window.opener) {
	let hash = window.location.hash
	window.location.hash = "#donationalerts-auth"
	let accessToken = hash.split("#access_token=")[1].split("&")[0]
	window.opener.donationAlertsAuthFinish(accessToken)
	window.close()
}


// TODO ctrl+c ctrl+v, переделать
function donatePayAuth() {
	let token = document.querySelector("#donatepay-auth")
	let id_ = document.querySelector("#donatepay-id")
	if (token.value && token.value.length > 30 && id_.value) {
		document.querySelector("#donatepay-title").dataset.connected = "true"
		dpToken = token.value
		dpId = id_.value
		console.log(dpToken, dpId)
	} else {
		document.querySelector("#donatepay-title").dataset.connected = "false"
		dpToken = undefined
		dpId = undefined
	}
}
document.querySelector("#donatepay-auth").addEventListener("change", donatePayAuth)
document.querySelector("#donatepay-id").addEventListener("change", donatePayAuth)


function streamElementsAuth() {
	let input = document.querySelector("#streamelements-auth")
	if (input.value && input.value.length > 30) {
		document.querySelector("#streamelements-title").dataset.connected = "true"
		seToken = input.value
	} else {
		document.querySelector("#streamelements-title").dataset.connected = "false"
		seToken = undefined
	}
}
document.querySelector("#streamelements-auth").addEventListener("change", streamElementsAuth)



function twitchAuth() {
	let input = document.querySelector("#twitch-channel")
	if (input.value && input.value.length > 2) {
		document.querySelector("#twitch-title").dataset.connected = "true"
		twitchChannel = input.value
	} else {
		document.querySelector("#twitch-title").dataset.connected = "false"
		twitchChannel = undefined
	}
}
document.querySelector("#twitch-channel").addEventListener("change", twitchAuth)


function wsUrlAuth() {
	let input = document.querySelector("#ws-url")
	if (input.value && input.value.length > 6) {
		document.querySelector("#ws-title").dataset.connected = "true"
		wsUrl = input.value
	} else {
		document.querySelector("#ws-title").dataset.connected = "false"
		wsUrl = undefined
	}
}
document.querySelector("#ws-url").addEventListener("change", wsUrlAuth)


function copyLink() {
	let url = new URL("https://declider.github.io/donategoal/widget")
	let button = document.querySelector("#copy-link")

	url.searchParams.set("v", "2")

	if (daToken) {
		url.searchParams.set("daToken", daToken)
	}
	if (dpToken && dpId) {
		url.searchParams.set("dpToken", dpToken)
		url.searchParams.set("dpId", dpId)
	}
	if (seToken) {
		url.searchParams.set("seToken", seToken)
	}
	if (twitchChannel) {
		url.searchParams.set("twitchChannel", twitchChannel)
	}
	if (wsUrl) {
		url.searchParams.set("wsUrl", wsUrl)
	}

	navigator.clipboard.writeText(url.toString())
	button.textContent = "Скопировано!"

	setTimeout(() => {
		button.textContent = "Скопировать ссылку"
	}, 3000)
}
document.querySelector("#copy-link").addEventListener("click", copyLink)
// #endregion Подключения




function showCommands() {
	document.querySelector("dialog#mod-commands").showModal()
}
document.querySelector("#show-commands").addEventListener("click", showCommands)


function showRules() {
	document.querySelector("dialog#rules").showModal()
}
document.querySelector("#show-rules").addEventListener("click", showRules)