const titleValue = document.getElementById("title-value")
const sumValue = document.getElementById("sum-value")
const goalValue = document.getElementById("goal-value")
// --- //
const countStatus = document.getElementById("count-status")
const countValue = document.getElementById("count-value")
const countLimitValue = document.getElementById("count-limit-value")
// --- //
const stepMode = document.getElementById("step-mode")
const stepValue = document.getElementById("step-value")
// --- //
const boostMode = document.getElementById("boost-mode")
const boostValue = document.getElementById("boost-value")
// --- //
const goalLimitValue = document.getElementById("goal-limit-value")


const params = (new URL(document.location)).searchParams
const wid = params.get("wid") || "0"
const version = parseInt(params.get("v")) || 0


if (version < 2) {
	document.body.innerHTML = `Донатгол обновился до версии 2. Пройдите авторизацию заново.`
	document.body.style.color = "black"
	document.body.style.fontFamily = "sans-serif"
	document.body.style.fontWeight = 700
	document.body.style.fontSize = "20px"
}




function updateData() {
	let sum = sumValue.valueAsNumber || 0
	let goal = parseInt(goalValue.valueAsNumber) || 500

	let count = countValue.valueAsNumber || 0
	let step = stepValue.valueAsNumber || 0

	// Расширенный режим (включён счётчик)
	if (countStatus.checked) {
		
		let countLimit = countLimitValue.valueAsNumber || 0
		let boost = boostValue.valueAsNumber || 0
		let goalLimit = goalLimitValue.valueAsNumber || 0

		

		while (sum >= goal) {
			if (countLimit > 0 && count >= countLimit) {
				break
			}

			if (goalLimit != 0 && goal >= goalLimit) {
				goal = goalLimitValue.valueAsNumber
				break
			}
			
			sum = Math.abs(goal - sum)
			count += 1
			
			if (step != 0) {
				if (stepMode.value == "add") {
					goal += step
				} else if (stepMode.value == "multiply") {
					goal *= step
				}
			}

			if (boost != 0) {
				if (boostMode.value == "add") {
					step += boost
				} else if (boostMode.value == "multiply") {
					step *= boost
				}
			}

			if (goalLimit && goalLimit != 0 && goal >= goalLimit) {
				goal = goalLimitValue.valueAsNumber
				break
			}
		}
	}
	sum = parseFloat(Math.abs(sum).toFixed(2))

	// Процент
	let percent = (100 - (sum / goal * 100)).toFixed(2)
	document.getElementById("background2").style.clipPath = `inset(0px ${percent}% 0px 0px)`
	document.getElementById("sum").innerText = sum
	document.getElementById("goal").innerText = goal


	// Название
	document.getElementById("title-text").textContent = titleValue.value
	if (countStatus.checked) {
		let countLimit = countLimitValue.valueAsNumber || 0
		document.getElementById("title-count").textContent = countLimit <= 0 ? `(${count})` : `(${count}/${countLimit})`
	} else {
		document.getElementById("title-count").textContent = ""
	}


	// Сохранение
	countValue.value = count
	stepValue.value = step
	sumValue.value = sum
	goalValue.value = goal
	saveStorage()

	document.querySelector("#count-settings").style.display = countStatus.checked ? "block" : "none"

	wsNewEvent()
}
document.querySelector("#title-value").addEventListener("change", updateData)
document.querySelector("#sum-value").addEventListener("change", updateData)
document.querySelector("#goal-value").addEventListener("change", updateData)
document.querySelector("#count-status").addEventListener("change", updateData)
document.querySelector("#count-value").addEventListener("change", updateData)
document.querySelector("#count-limit-value").addEventListener("change", updateData)
document.querySelector("#step-mode").addEventListener("change", updateData)
document.querySelector("#step-value").addEventListener("change", updateData)
document.querySelector("#boost-mode").addEventListener("change", updateData)
document.querySelector("#boost-value").addEventListener("change", updateData)
document.querySelector("#goal-limit-value").addEventListener("change", updateData)




document.querySelector("#sum-add").addEventListener("keydown", (event) => {
	if(event.key === 'Enter' || event.keyCode === 13) {
		let sum = sumValue.valueAsNumber
		let added = event.target.valueAsNumber || 0
		sum += added
		sum = Math.max(sum, 0)
		sumValue.value = sum
		event.target.value = ""
		updateData()
	}
})



function donate(value) {
	let sum = sumValue.valueAsNumber
	sum += value
	sum = Math.max(sum, 0)
	sumValue.value = sum
	updateData()
}



function loadStorage() {
	let data = JSON.parse(window.localStorage.getItem("donategoal"+wid)) || {}

	titleValue.value = data["titleValue"] || "Сбор"
	sumValue.value = data["sumValue"] || 0
	goalValue.value = data["goalValue"] || 500

	countStatus.checked = data["countStatus"] || true
	countValue.value = data["countValue"] || 0
	countLimitValue.value = data["countLimitValue"] || 0

	stepMode.value = data["stepMode"] || "add"
	stepValue.value = data["stepValue"] || 0

	boostMode.value = data["boostMode"] || "add"
	boostValue.value = data["boostValue"] || 0

	goalLimitValue.value = data["goalLimitValue"] || 0

	updateData()
}
loadStorage()




function saveStorage() {
	let data = JSON.parse(window.localStorage.getItem("donategoal"+wid)) || {}

	data["titleValue"] = titleValue.value
	data["sumValue"] = sumValue.valueAsNumber
	data["goalValue"] = goalValue.valueAsNumber

	data["countStatus"] = countStatus.checked
	data["countValue"] = countValue.valueAsNumber
	data["countLimitValue"] = countLimitValue.valueAsNumber

	data["stepMode"] = stepMode.value
	data["stepValue"] = stepValue.valueAsNumber

	data["boostMode"] = boostMode.value
	data["boostValue"] = boostValue.value
	
	data["goalLimitValue"] = goalLimitValue.valueAsNumber

	window.localStorage.setItem("donategoal"+wid, JSON.stringify(data))
}




function clearItem() {
	window.localStorage.removeItem("donategoal"+wid)
	loadStorage()
}




function clearStorage() {
	window.localStorage.clear()
	loadStorage()
}
