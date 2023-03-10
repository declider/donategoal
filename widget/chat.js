function commandHandler(message) {
    let args = message.split(" ")

    let error = args.indexOf("")
    if (error > -1) {
        args.splice(error, 1)
    }

    args.length = 2 // что за херь я тут написал. потом поправлю

    if(args.length>=2) {
        let target = args[0].toLowerCase().trim()
        let value = args[1].trim()

        if(isNaN(value)) {
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
