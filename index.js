// Your code here
function createEmployeeRecord(employeeInfo) {
  const employeeRecord = {
    "firstName": employeeInfo[0],
    "familyName": employeeInfo[1],
    "title": employeeInfo[2],
    "payPerHour": employeeInfo[3],
    "timeInEvents": [],
    "timeOutEvents": []
  }
  return employeeRecord
}

function createEmployees(arrayOfEmployeeInfo) {
  const arrayOfEmployeeRecords = []
  arrayOfEmployeeInfo.map(employeeInfo => {
    arrayOfEmployeeRecords.push(createEmployeeRecord(employeeInfo))
  })
  return arrayOfEmployeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const timeInEvent = {
    "type": "TimeIn",
    "date": dateStamp.split(' ')[0],
    "hour": parseInt(dateStamp.split(' ')[1])
  }
  employeeRecord.timeInEvents.push(timeInEvent)

  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const timeOutEvent = {
    "type": "TimeOut",
    "date": dateStamp.split(' ')[0],
    "hour": parseInt(dateStamp.split(' ')[1])
  }
  employeeRecord.timeOutEvents.push(timeOutEvent)

  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(function(event) {
    return (event.date === date)
  }).hour
  const timeOut = employeeRecord.timeOutEvents.find(function(event) {
    return (event.date === date)
  }).hour

  const hoursWorked = (timeOut - timeIn) / 100

  return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  const payPerHour = employeeRecord.payPerHour

  const wagesEarned = hoursWorked * payPerHour

  return wagesEarned
}

function allWagesFor(employeeRecord) {
  const arrayOfDates = []
  employeeRecord.timeInEvents.map(event => {
    arrayOfDates.push(event.date)
  })

  const totalWagesEarned = arrayOfDates.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date)
  }, 0)

  return totalWagesEarned
}

function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce((total, record) => {
    return total + allWagesFor(record)
  }, 0)

  return totalPayroll
}

function createEmployeeRecords(arrayOfEmployeeInfo) {
  const arrayOfEmployeeRecords = []
  arrayOfEmployeeInfo.map(employeeInfo => {
    arrayOfEmployeeRecords.push(createEmployeeRecord(employeeInfo))
  })
  return arrayOfEmployeeRecords
}

function findEmployeebyFirstName(scrArray, firstName) {
  const employee = scrArray.find(function(employee) {
    return (employee.firstName === firstName)
  })

  return employee
}
