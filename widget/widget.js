const nowValue = document.getElementById("nowvalue")
const endValue = document.getElementById("endvalue")

const countStatus = document.getElementById("countstatus")
const countValue = document.getElementById("countvalue")
const countValueMax = document.getElementById("countvaluemax")
const autoIncrease = document.getElementById("autoincrease")
const autoSumValue = document.getElementById("autosumvalue")
const titleValue = document.getElementById("titlevalue")
const maxGoalValue = document.getElementById("maxgoalvalue")

const customGoalsStatus = document.getElementById("customgoalsstatus")
const customGoalsValue = document.getElementById("customgoalsvalue")

const params = (new URL(document.location)).searchParams
const wid = params.get("wid") || "0"
const channel = params.get("channel") || false
const version = params.get("v") || "1"

let customGoals = []

let now = nowValue.valueAsNumber || 0
let end = endValue.valueAsNumber || 500
let count = countValue.valueAsNumber || 0


function changePercent() {
    end = endValue.valueAsNumber || 500
    let percent = (100 - (now / end * 100)).toFixed(2)
    document.documentElement.style.setProperty('--percent', percent+"%")
    let text = now + " (" + Math.round(100 - percent) + "%)"
    document.getElementById("now").innerText = text
    document.getElementById("end").innerText = end
}


function changeNow(number) {
    now = number
    end = endValue.valueAsNumber || 500
    nowValue.value = now

    if(countStatus.checked) {

        while(now>=end) {
            let maxCount = countValueMax.valueAsNumber || 0
            if(maxCount==0 || count<maxCount){
                now = parseFloat(Math.abs(end-now).toFixed(2))
                nowValue.value = now
                changeCount(count+=1)

                if(autoIncrease.checked) {
                    let maxGoal = maxGoalValue.valueAsNumber || 0
                    let addedSum = autoSumValue.valueAsNumber || 0
                    end+=addedSum
                    
                    if(maxGoal) {
                        if(end>maxGoal) {
                            end=maxGoal
                            if(end>now) {
                                break
                            }
                        }
                    }

                    endValue.value = end
                    
                } else if (customGoalsStatus.checked && customGoals.length) {
                    end = customGoals.shift()
                    endValue.value = end
                    customGoalsValue.value = customGoals.join(",")
                }
            } else {
                break
            }
            
        }
    }
    now = parseFloat(Math.abs(now).toFixed(2))
    nowValue.value = now
    changePercent()
    saveStorage()
}


function changeCount(number) {
    number = number || 0
    count = number
    countValue.value = count
    changeTitle()
}


function changeTitle() {
    let title = titleValue.value || ""
    document.getElementById("title").firstChild.data = title

    if(countStatus.checked) {
        let maxCount = countValueMax.valueAsNumber || 0
        if(maxCount==0) {
            title = " ("+count+")"
        } else {
            title = " ("+count+"/"+maxCount+")"
        }
        document.getElementById("titlecount").innerText = title
    }
}



function changeColors() {
    document.documentElement.style.setProperty('--font-color',   document.getElementById("fontcolor").value  || "#FFFFFF")
    document.documentElement.style.setProperty('--back-color-1', document.getElementById("backcolor1").value || "#F57507")
    document.documentElement.style.setProperty('--back-color-2', document.getElementById("backcolor2").value || "#F59C07")
    document.documentElement.style.setProperty('--count-color',  document.getElementById("countcolor").value || "#f58807")
}


function addSum(number) {
    now += number
    changeNow(now)
}


function changeGoals(){
    customGoals = []
    let value = customGoalsValue.value
    if(!value){return}
    value = value.replaceAll(" ","").split(",")
    let status = value.every(element => {return Number(element)})
    if(!status){return}
    value.forEach(element => {
        customGoals.push(Number(element))
    })
}


function loadStorage() {
    let data = JSON.parse(window.localStorage.getItem("goal"+wid)) || {}
    console.log(data)

    nowValue.value = data["now"] || 0
    endValue.value = data["end"] || 500
    countValue.value = data["count"] || 0
    countStatus.checked = data["countStatus"] || false
    countValueMax.value = data["maxCount"] || 0
    autoIncrease.checked = data["autoIncrease"] || false
    autoSumValue.value = data["autoSumValue"] || 500
    titleValue.value = data["titleValue"] || "Сбор"
    maxGoalValue.value = data["maxGoalValue"] || undefined
    customGoalsStatus.checked = data["customGoalsStatus"] || false
    customGoalsValue.value = data["customGoalsValue"] || ""
    customGoals = data["customGoals"] || []

    document.getElementById("fontcolor").value = data["fontcolor"] || "#FFFFFF"
    document.getElementById("backcolor1").value = data["backcolor1"] || "#ffba52"
    document.getElementById("backcolor2").value = data["backcolor2"] || "#ffa05c"
    document.getElementById("backcolor2").value = data["countcolor"] || "#f58807"

    changeTitle()
    changeCount(countValue.valueAsNumber)
    changeNow(nowValue.valueAsNumber)
    changeColors()
}

loadStorage()

function saveStorage() {
    let data = JSON.parse(window.localStorage.getItem("goal"+wid)) || {}

    data["now"] = nowValue.valueAsNumber
    data["end"] = endValue.valueAsNumber
    data["count"] = countValue.valueAsNumber
    data["countStatus"] = countStatus.checked
    data["maxCount"] = countValueMax.value
    data["autoIncrease"] = autoIncrease.checked
    data["autoSumValue"] = autoSumValue.valueAsNumber
    data["titleValue"] = titleValue.value
    data["maxGoalValue"] = maxGoalValue.value
    data["customGoalsStatus"] = customGoalsStatus.checked
    data["customGoalsValue"] = customGoalsValue.value
    data["customGoals"] = customGoals

    data["fontcolor"] = document.getElementById("fontcolor").value
    data["backcolor1"] = document.getElementById("backcolor1").value
    data["backcolor2"] = document.getElementById("backcolor2").value
    data["countcolor"] = document.getElementById("countcolor").value

    window.localStorage.setItem("goal"+wid, JSON.stringify(data))
}

function clearItem() {
    window.localStorage.removeItem("goal"+wid)
    loadStorage()
}

function clearStorage() {
    window.localStorage.clear()
    loadStorage()
}

window.addEventListener('online', (event) => {
    window.location.reload(true)
})
