function commandHandler(message) {
    let args = message.replace("  "," ").replace(/[\uD800-\uDFFF]/gi, []).trim().split(" ")

    // let error = args.indexOf("")
    // if (error > -1) {
    //     args.splice(error, 1)
    // }

    if(args.length>=2) {
        let target = args[0].toLowerCase().trim()
        let value = args[1].trim()

        if(isNaN(value) && target!="цели") {
            console.log("Не число")
            return
        }

        switch (target) {
            case "счётчик":
            case "счетчик":
                count = doMath(count, value)
                changeCount(count)
                break
            case "цель":
                end = endValue.valueAsNumber
                end = doMath(end, value)
                endValue.value = end
                changePercent()
                break
            case "сумма":
                now = doMath(now, value)
                changeNow(now)
                break
            case "цели":
                if(value=="-"){
                    customGoalsValue.value = ""
                } else {
                    customGoalsValue.value = value
                }
                changeGoals()
                break
            default:
                console.log("Неверное использование команды в чате.")
                return
        }

    }
}

function doMath(old, value){
    let sum = Math.abs(parseFloat(value))

    switch (value.charAt(0)) {
        case "+":
            old += sum
            break
        case "-":
            old -= sum
            break
        default:
            old = sum
    }
    
    return Math.max(old, 0)
}
