function command_handler(message) {
    console.log("Сообщение "+message)
    let args = message.split(" ")

    let error = args.indexOf("")
    if (error > -1) {
        args.splice(error, 1)
    }

    args.length = 2
    console.log(args)

    if(args.length>=2) {
        let target = args[0].toLowerCase().trim()
        let value = args[1].trim()

        if(isNaN(value)) {
            console.log("Не число")
            return
        }

        switch (target) {
            case "счётчик":
            case "счетчик":
                count = do_math(count, value)
                change_count(count)
                break
            case "цель":
                end = endValue.valueAsNumber
                end = do_math(end, value)
                endValue.value = end
                change_percent()
                break
            case "сумма":
                now = do_math(now, value)
                change_now(now)
                break
            default:
                console.log("Неверное использование команды в чате.")
                return
        }

    }
}

function do_math(old, value){
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
