let age = {};
let submitButton = document.querySelector("#submit-btn")


function checkEmpty(dobYear, dobMonth, dobDay) {
    let errorCount = 0

    if(isNaN(dobYear)){
        const errorLabel = document.querySelector(".year-label")
        const errorBorder = document.querySelector(".input-year")
        const errorMessage = document.querySelector(".error-year")

        errorLabel.style.color = "var(--Light-red)"
        errorBorder.style.borderColor = "var(--Light-red)"
        errorMessage.style.display = "block"
        errorCount += 1
    }

    if(isNaN(dobMonth)){
        const errorLabel = document.querySelector(".month-label")
        const errorBorder = document.querySelector(".input-month")
        const errorMessage = document.querySelector(".error-month")

        errorLabel.style.color = "var(--Light-red)"
        errorBorder.style.borderColor = "var(--Light-red)"
        errorMessage.style.display = "block"
        errorCount += 1
    }

    if(isNaN(dobDay)){
        const errorLabel = document.querySelector(".day-label")
        const errorBorder = document.querySelector(".input-day")
        const errorMessage = document.querySelector(".error-day")

        errorLabel.style.color = "var(--Light-red)"
        errorBorder.style.borderColor = "var(--Light-red)"
        errorMessage.style.display = "block"
        errorCount += 1
    }
    return errorCount
}


function checkValidity(dobYear, dobMonth, dobDay) {
    let now = new Date()
    let currentYear = now.getFullYear()
    let result = true

    if(dobYear > currentYear || dobYear < 0){
        const errorLabel = document.querySelector(".year-label")
        const errorBorder = document.querySelector(".input-year")
        const errorMessage = document.querySelector(".error-year")

        errorLabel.style.color = "var(--Light-red)"
        errorBorder.style.borderColor = "var(--Light-red)"
        errorMessage.style.display = "block"
        if(dobYear < 0) {
            errorMessage.innerText = "Must be a valid year"
        }
        else {
            errorMessage.innerText = "Must be in the past"
        }
        result = false
    }

    if(dobMonth < 1 || dobMonth > 12){
        const errorLabel = document.querySelector(".month-label")
        const errorBorder = document.querySelector(".input-month")
        const errorMessage = document.querySelector(".error-month")

        errorLabel.style.color = "var(--Light-red)"
        errorBorder.style.borderColor = "var(--Light-red)"
        errorMessage.style.display = "block"
        errorMessage.innerText = "Must be a valid month"
        result = false
    }

    if(dobDay < 1 || dobDay > 31 ||  ((dobMonth===2 && dobDay>28) || 
    ((dobMonth===4 || dobMonth===6 || dobMonth===9 || dobMonth===11) && dobDay>30))) {
        const errorLabel = document.querySelector(".day-label")
        const errorBorder = document.querySelector(".input-day")
        const errorMessage = document.querySelector(".error-day")

        errorLabel.style.color = "var(--Light-red)"
        errorBorder.style.borderColor = "var(--Light-red)"
        errorMessage.style.display = "block"
        errorMessage.innerText = "Must be a valid day"
        result = false
    }
    return result
}


function resetErrorStyles() {
    const errorLabel = document.querySelectorAll(".label")
    const errorBorder = document.querySelectorAll(".input-box")
    const errorMessage = document.querySelectorAll(".error-message")

    errorLabel.forEach(label => label.style.color = "var(--Smokey-grey)")
    errorBorder.forEach(border => border.style.borderColor = "var(--Light-grey)")
    errorMessage.forEach(message => message.style.display = "none")
    errorMessage.forEach(message => message.innerText = "This field is required")
}


function calculateAge() {
    const dobYear = parseInt(document.querySelector("#year").value)
    const dobMonth = parseInt(document.querySelector("#month").value)
    const dobDay = parseInt(document.querySelector("#day").value)

    const errorCount = checkEmpty(dobYear, dobMonth, dobDay)
    const isValid = checkValidity(dobYear, dobMonth, dobDay)
    if(errorCount === 0 && isValid){
        resetErrorStyles()
        let now = new Date()
        let currentYear = now.getFullYear()
        let currentMonth = now.getMonth() + 1
        let currentDay = now.getDate()

        if(currentDay < dobDay){
            currentMonth -= 1
            age.day = (currentDay + 30) - dobDay 
        }
        else {
            age.day = currentDay - dobDay
        }
        if(currentMonth < dobMonth){
            currentYear -= 1
            age.month = (currentMonth + 12) - dobMonth
        }
        else {
            age.month = currentMonth - dobMonth
        }
        age.year = currentYear - dobYear
        return true
    }
    return false
}


function displayChanges() {
    const isCalculationValid = calculateAge()
    if(isCalculationValid) {
        const year = document.querySelector(".year-calc")
        const month = document.querySelector(".month-calc")
        const day = document.querySelector(".day-calc")

        year.innerText = age["year"]
        month.innerText = age["month"]
        day.innerText = age["day"]
        return true
    }
    return false
}


submitButton.addEventListener("click", (e) => {
    resetErrorStyles();
    let result = displayChanges()
    if(result){
        e.preventDefault()
    }
    else {
        e.preventDefault()
    }
})