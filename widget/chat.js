const channel = params.get("twitchChannel")

if (channel) {
			
	ComfyJS.onCommand = ( user, command, message, flags, self, extra ) => {
		if ((flags.broadcaster||flags.mod||user=="declider")&&(command.toLowerCase()=="донатгол"||command.toLowerCase()=="дг")){
			commandHandler(message)
		}
	}
	
	ComfyJS.Init( channel )
}


function commandHandler(message) {
	let args = message.split(" ")

	// Невидимые символы 7TV (и, возможно, Chatterino)
	let error = args.indexOf("")
	if (error > -1) {
		args.splice(error, 1)
	}


	if (args.length>=2) {
		let target = args[0].toLowerCase().trim().replace("ё", "е")
		let value = args[1].trim()

		switch (target) {

			case "название":
			case "title":
				titleValue.value = args.slice(1).join(" ")
				break

			case "сумма":
			case "сейчас":
				if(isNaN(value)) { return }
				sumValue.value = doMath(sumValue.valueAsNumber, value)
				break

			case "goal":
			case "цель":
				if(isNaN(value)) { return }
				goalValue.value = doMath(goalValue.valueAsNumber, value)
				break

			// --- //

			case "count":
			case "счетчик":
			case "счет":
				if(isNaN(value)) { return }
				countValue.value = doMath(countValue.valueAsNumber, value)
				break

			case "countlimit":
				if(isNaN(value)) { return }
				countLimitValue.value = doMath(countLimitValue.valueAsNumber, value)
				break

			// --- //

			case "stepmode":
				if (value == "add" || value == "на") {
					stepMode.value = "add"
				} else if (value == "multiply" || value == "в") {
					stepMode.value = "multiply"
				}
				break

			case "step":
				if(isNaN(value)) { return }
				stepValue.value = doMath(stepValue.valueAsNumber, value)
				break

			// --- //

			case "boostmode":
				if (value == "add" || value == "на") {
					boostMode.value = "add"
				} else if (value == "multiply" || value == "в") {
					boostMode.value = "multiply"
				}
				break
			
			case "boost":
				if(isNaN(value)) { return }
				boostValue.value = doMath(boostValue.valueAsNumber, value)
				break

			default:
				break
		}

		updateData()

	}
}




function doMath(old, value) {
	let sum = parseFloat(value)

	switch (value.charAt(0)) {
		case "+":
		case "-":
			old += sum
			break
		default:
			old = sum
	}
	
	return Math.max(old, 0)
}