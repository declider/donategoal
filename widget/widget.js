const nowValue = document.getElementById("nowvalue")
const endValue = document.getElementById("endvalue")

const countStatus = document.getElementById("countstatus")
const countValue = document.getElementById("countvalue")
const countValueMax = document.getElementById("countvaluemax")
const autoIncrease = document.getElementById("autoincrease")
const autoSumValue = document.getElementById("autosumvalue")
const titleValue = document.getElementById("titlevalue")

const params = (new URL(document.location)).searchParams

let now = nowValue.valueAsNumber || 0
let end = endValue.valueAsNumber || 0
let count = countValue.valueAsNumber || 0


function change_percent() {
    end = endValue.valueAsNumber
    let percent = (100 - (now / end * 100)).toFixed(2)
    document.documentElement.style.setProperty('--percent', percent+"%")
    let text = now + " (" + Math.round(100 - percent) + "%)"
    document.getElementById("now").innerText = text
    document.getElementById("end").innerText = end
}


function change_now(number) {
    now = number
    end = endValue.valueAsNumber
    nowValue.value = now

    if(countStatus.checked) {

        while(now>=end) {
            let maxCount = countValueMax.valueAsNumber
            if(maxCount==0 || count<maxCount){
                now = Math.abs(end-now)
                nowValue.value = now
                change_count(count+=1)

                if(autoIncrease.checked) {
                    let addedSum = autoSumValue.valueAsNumber
                    end+=addedSum
                    endValue.value = end
                }
            } else {
                break
            }
            
        }
    }
    change_percent()
}


function change_count(number) {
    count = number
    countValue.value = count
    change_title()
}


function change_title() {
    let title = titleValue.value

    if(countStatus.checked) {
        let maxCount = countValueMax.valueAsNumber || 0
        if(maxCount==0) {
            title += " " + count
        } else {
            title += " ("+count+"/"+maxCount+")"
        }
    }

    document.getElementById("title").innerText = title
}



function change_colors() {
    document.documentElement.style.setProperty('--font-color', document.getElementById("fontcolor").value)
    document.documentElement.style.setProperty('--back-color-1', document.getElementById("backcolor1").value)
    document.documentElement.style.setProperty('--back-color-2', document.getElementById("backcolor2").value)
}


function add_sum(number) {
    now += number
    change_now(now)
}


function loadStorage() {
    nowValue.value = window.localStorage.getItem("now") || 0
    endValue.value = window.localStorage.getItem("end") || 500

    countValue.value = window.localStorage.getItem("count") || 0
    countStatus.checked = window.localStorage.getItem("countStatus") || true
    countValueMax.value = window.localStorage.getItem("maxCount") || 0
    autoIncrease.checked = window.localStorage.getItem("autoIncrease") || true
    autoSumValue.value = window.localStorage.getItem("autoSumValue") || 500
    titleValue.value = window.localStorage.getItem("titleValue") || "Сбор"

    document.getElementById("fontcolor").value = window.localStorage.getItem("fontcolor") || "#FFFFFF"
    document.getElementById("backcolor1").value = window.localStorage.getItem("backcolor1") || "#ffba52"
    document.getElementById("backcolor2").value = window.localStorage.getItem("backcolor2") || "#ffa05c"

    change_title()
    change_count(countValue.valueAsNumber)
    change_now(nowValue.valueAsNumber)
    change_colors()
}
loadStorage()


function saveStorage() {
    window.localStorage.setItem("now",nowValue.valueAsNumber)
    window.localStorage.setItem("end",endValue.valueAsNumber)
    window.localStorage.setItem("count",countValue.valueAsNumber)
    window.localStorage.setItem("countStatus",countStatus.checked)
    window.localStorage.setItem("maxCount",countValueMax.value)
    window.localStorage.setItem("autoIncrease",autoIncrease.checked)
    window.localStorage.setItem("autoSumValue",autoSumValue.valueAsNumber)
    window.localStorage.setItem("titleValue",titleValue.value)

    window.localStorage.setItem("fontcolor",document.getElementById("fontcolor").value)
    window.localStorage.setItem("backcolor1",document.getElementById("backcolor1").value)
    window.localStorage.setItem("backcolor2",document.getElementById("backcolor2").value)
}


function clearStorage() {
    window.localStorage.clear()
    loadStorage()
}
