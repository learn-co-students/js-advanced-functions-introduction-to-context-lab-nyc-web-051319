// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: new Array(),
    timeOutEvents: new Array(),
  }
}

function createEmployees(array) {
  return array.map(ele => {
   return createEmployeeRecord(ele)
  })
}

function createTimeInEvent(object, date) {
  let time = {
    type: "TimeIn",
    date: date.split(' ')[0],
    hour: parseInt(date.split(' ')[1])
  }
  object.timeInEvents.push(time)
  return object
}

function createTimeOutEvent(object, date) {
  let time = {
    type: "TimeOut",
    date: date.split(' ')[0],
    hour: parseInt(date.split(' ')[1])
  }
  object.timeOutEvents.push(time)
  return object
}

function hoursWorkedOnDate(object, date) {
  let timeIn, timeOut
  timeIn = object.timeInEvents.find(el => {
    return el.date === date
  })
  timeOut = object.timeOutEvents.find(el => {
    return el.date === date
  })
  return Math.abs(timeIn.hour - timeOut.hour) / 100
}

function wagesEarnedOnDate(object, date){
    let hours = hoursWorkedOnDate(object, date)
    let wage = hours  * object.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(object){
    let dates = object.timeInEvents.map(function(el){
        return el.date
    })
    let payment = dates.reduce(function(total, date){
        return total + wagesEarnedOnDate(object, date)
    }, 0)
    return payment
}

function createEmployeeRecords(array) {
  return array.map(function(row){
    return createEmployeeRecord(row)
  })
}

function findEmployeebyFirstName(array, firstName) {
  return array.find(function(el){
    return el.firstName === firstName
  })
}

function calculatePayroll(array) {
  return array.reduce(function(total, employee){
      return total + allWagesFor(employee)
  }, 0)
}
