// Alarm sound for the alarm
let AlarmSound = new Audio('audio/Alarm.mp3')
AlarmSound.loop = true

let alarmTime = null
let alarmTimeout = null

const myList = document.querySelector('#myList')
const addAlarm = document.querySelector('.setAlarm')

const alarmList = []

//  format time function
function formatTime(time) {
  if (time < 10 && time.length != 2) {
    return '0' + time
  }
  return time
}

// setting the Digital clock
setInterval(showTime, 1000)
function showTime() {
  let time = new Date()
  let hour = formatTime(time.getHours())
  let min = formatTime(time.getMinutes())
  let sec = formatTime(time.getSeconds())
  let currentTime = `${hour}:${min}:${sec}`
  document.getElementById('clock').innerText = `${hour}:${min}:${sec}`
  if (alarmList.includes(currentTime)) {
    ringingAlarm(currentTime)
  }
}
showTime()

// function  to play the alarm
function ringingAlarm(currentTime) {
  AlarmSound.play()
}

//  showing alarm in List
function showNewAlarm(newAlarmTime) {
  const alarmListView = `
 <li class="listOfAlarms">
					<span class="time"> ${newAlarmTime} </span>
					<button class="deleteAlarm time-control" id="delete-button" onclick="remove(this.value)"
						value="${newAlarmTime}">Delete Alarm
					</button>
	</li>
 `
  myList.innerHTML += alarmListView
}

//  Delete alarm button function
myList.addEventListener('click', (e) => {
  console.log('removing alarm ')
  if (e.target.classList.contains('deleteAlarm')) {
    e.target.parentElement.remove()
  }
})

remove = (value) => {
  let newAlarmList = alarmList.filter((time) => time != value)
  alarmList.length = 0
  alarmList.push.apply(alarmList, newAlarmList)
  console.log(alarmList)
  console.log(newAlarmList)
}

//  take alarm input
addAlarm.addEventListener('click', (e) => {
  e.preventDefault()
  let hourInput = formatTime(document.getElementById('a_hour').value)
  let minuteInput = formatTime(document.getElementById('a_min').value)
  let secondInput = formatTime(document.getElementById('a_sec').value)
  let newAlarmTime = `${hourInput}:${minuteInput}:${secondInput}`
  console.log(newAlarmTime)
  document.querySelector('.hourInputField').value = ''
  document.querySelector('.minutesInputField').value = ''
  document.querySelector('.secondsInputField').value = ''

  if (isNaN(newAlarmTime)) {
    if (!alarmList.includes(newAlarmTime)) {
      alarmList.push(newAlarmTime)
      console.log(alarmList)
      console.log(alarmList.length)
      showNewAlarm(newAlarmTime)
    }
  } else {
    alert('invalid alarm time')
  }
})

//  function to delete or clear the alarm
function deleteAlarm() {
  AlarmSound.pause()
}
