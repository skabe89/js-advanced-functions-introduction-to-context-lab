// Your code here

function createEmployeeRecord(array){
  let employeeInfo = {firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
  return employeeInfo
}

function createEmployeeRecords(array){
  let newEmployeesInfo = array.map(createEmployeeRecord)
  return newEmployeesInfo
}

function createTimeInEvent(employee, event){
  let date = event.split(" ")[0]
  let hour = parseInt(event.split(" ")[1])
  let newEvent = {
    type: "TimeIn",
    date: date,
    hour: hour
  }
  employee.timeInEvents.push(newEvent)
  return employee
}

function createTimeOutEvent(employee, event){
  let date = event.split(" ")[0]
  let hour = parseInt(event.split(" ")[1])
  let newEvent = {
    type: "TimeOut",
    date: date,
    hour: hour
  }
  employee.timeOutEvents.push(newEvent)
  return employee
}

function hoursWorkedOnDate(employee, date){
  let n = employee.timeInEvents.filter(e => e.date == date)[0].hour
  let o = employee.timeOutEvents.filter(e => e.date == date)[0].hour
  return (o - n)/100
}

function wagesEarnedOnDate(employee, date){
  return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

function allWagesFor(employee){
  console.log(employee)
  let allDatesWorked = employee.timeInEvents.map(e => e.date)
  let total = 0
  allDatesWorked.forEach(function(date) {
    total = total + wagesEarnedOnDate(employee, date)
  })
  return total
}

function calculatePayroll(array){
  let wages = array.map(e => allWagesFor(e))
  return wages.reduce(addWages)
}

function addWages(total, num){
  return total + num
}

function findEmployeeByFirstName(employees, name){
  return employees.filter(e => e.firstName == name)[0]
}