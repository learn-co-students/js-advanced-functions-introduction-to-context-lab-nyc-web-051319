// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployees(arr) {
  return arr.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, timeString) {
  const timeSplit = timeString.split(" ")
  employee.timeInEvents.push(
    { type: "TimeIn",
      date: timeSplit[0],
      hour: parseInt(timeSplit[1])
    })
  return employee
}

function createTimeOutEvent(employee, timeString) {
  const timeSplit = timeString.split(" ")
  employee.timeOutEvents.push(
    { type: "TimeOut",
      date: timeSplit[0],
      hour: parseInt(timeSplit[1])
    })
    return employee
}

function hoursWorkedOnDate(employee, dateString) {
  const timeIn = employee.timeInEvents.find(x => x.date === dateString).hour
  const timeOut = employee.timeOutEvents.find(x => x.date === dateString).hour
  return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, dateString) {
  return hoursWorkedOnDate(employee, dateString) * employee.payPerHour
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((accum, timeInEvent) =>
    accum + wagesEarnedOnDate(employee, timeInEvent.date), 0
  )
}

function calculatePayroll(employees) {
  return employees.reduce((accum, employee) => accum + allWagesFor(employee), 0)
}


function createEmployeeRecords(csv) {
  return createEmployees(csv)
}

function findEmployeebyFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}
