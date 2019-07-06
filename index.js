const createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []        
    }
}

const createEmployees = function(arrays) {
    return arrays.map(function(array) {
        return createEmployeeRecord(array)
    })
}

const createTimeInEvent = function(employee, timeIn) {
    let timeDateSplit = timeIn.split(" ")
    let date = timeDateSplit[0]
    let time = timeDateSplit[1]

    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10)
    })
    return employee
}

const createTimeOutEvent = function(employee, timeOut) {
    let timeDateSplit = timeOut.split(" ")
    let date = timeDateSplit[0]
    let time = timeDateSplit[1]

    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10)
    })
    return employee
}

const hoursWorkedOnDate = function(employee, date) {
    const timeOut = employee.timeOutEvents.find(function(timeOutEvent) {
        return timeOutEvent.date === date
    })

    const timeIn = employee.timeInEvents.find(function(timeInEvent) {
        return timeInEvent.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = function(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

const allWagesFor = function(employee) {
    let totalWages = 0
    employee.timeInEvents.forEach(function(event) {
        totalWages += wagesEarnedOnDate(employee, event.date)
    })
    return totalWages
}

const calculatePayroll = function(employees) {
    let payroll = 0
    employees.forEach(function(employee) {
        payroll += allWagesFor(employee)
    })
    return payroll
}

const createEmployeeRecords = function(arrays) {
    return arrays.map(function(array) {
        return createEmployeeRecord(array)
    })
}

const findEmployeebyFirstName = function(employees, name) {
    return employees.find(function(employee) {
        return employee.firstName === name
    })
}
