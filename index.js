// Your code here
function createEmployeeRecord(infoArr){
  const newEmployee = {
    firstName: infoArr[0],
    familyName: infoArr[1],
    title: infoArr[2],
    payPerHour: infoArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return newEmployee
}

function createEmployees(arrOfArr){
  let newArr = arrOfArr.map((employeeArr) => {
    return createEmployeeRecord(employeeArr)
  })
  return newArr
}

function createTimeInEvent(empObj, date){
  let empHour = parseInt(date.split(" ")[1])
  let empDate = date.split(" ")[0]
  let timeInObj = {
    type: "TimeIn",
    hour: empHour,
    date: empDate
  }
  empObj.timeInEvents.push(timeInObj)
  return empObj
}

function createTimeOutEvent(empObj, date){
  let empHour = parseInt(date.split(" ")[1])
  let empDate = date.split(" ")[0]
  let timeOutObj = {
    type: "TimeOut",
    hour: empHour,
    date: empDate
  }
  empObj.timeOutEvents.push(timeOutObj)
  return empObj
}

function hoursWorkedOnDate(empObj, date){
  let timeInHour = empObj.timeInEvents.find((event) => {
    return event.date === date
  })
  let timeOutHour = empObj.timeOutEvents.find((event) => {
    return event.date === date
  })
  return timeOutHour.hour/100 - timeInHour.hour/100
}

function wagesEarnedOnDate(empObj, date){
  let hoursWorked = hoursWorkedOnDate(empObj, date)
  return hoursWorked * empObj.payPerHour
}

function allWagesFor(empObj){
  let dates = empObj.timeInEvents.map((events) => {
    return events.date
  })
  let totalWages = dates.reduce((accumulator, currentValue) => {
    return accumulator + wagesEarnedOnDate(empObj, currentValue)
  }, 0)
  return totalWages
}

function createEmployeeRecords(arrOfArr){
  let newArray = arrOfArr.map((employeeObj) => {
    return createEmployeeRecord(employeeObj)
  })
  return newArray
}

function findEmployeebyFirstName(src, firstName){
  let results = src.find((employeeObj) => {
    return employeeObj.firstName === firstName
  })
  if (results === -1) {
    return undefined
  } else {
    return results
  }
}

function calculatePayroll(employees){
  let total = employees.reduce((accumulator, currentValue) => {
    return accumulator + allWagesFor(currentValue)
  }, 0)
  return total
}
