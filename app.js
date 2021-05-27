// === Theme Switcher logic here === //
const inputs = document.querySelectorAll('input')
const body = document.body

// Function for switching theme
const updateTheme = (theme) => {
  body.classList.add('theme-change')

  setTimeout(() => {
    body.classList.remove('theme-change')

    switch (theme) {
      case 'light':
        body.classList.remove('weird')
        body.classList.add('light')
        break
      case 'weird':
        body.classList.remove('light')
        body.classList.add('weird')
        break
      default:
        body.classList.remove('weird')
        body.classList.remove('light')
        break
    }
  }, 400)
}

// We cycle through the inputs
inputs.forEach((input) => {
  // We first check if an input was already checked.
  // If that's the case we update the theme accordingly
  if (input.checked) updateTheme(input.value)

  // We then listen for an input event (change) to update the theme
  input.addEventListener('change', () => {
    if (input.checked) updateTheme(input.value)
  })
})

// Detect user's color preferences (between dark and light theme)
const lightTheme = window.matchMedia('(prefers-color-scheme: light)')

if (lightTheme.matches) {
  // if the user's preferences is the light theme,
  // we grab the input with the value of light in our 'input' nodelist
  // and we check it
  const lightInput = inputs[1]
  lightInput.checked = true

  updateTheme('light')
}

// === Arithmetic Operations logic here === //
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
}

const updateDisplay = () => {
  const screen = document.querySelector('.screen')
  screen.innerText = calculator.displayValue
}

const inputNumber = (number) => {
  const { displayValue, waitingForSecondOperand } = calculator

  if (waitingForSecondOperand) {
    calculator.displayValue = number
    calculator.waitingForSecondOperand = false
  } else {
    calculator.displayValue =
      displayValue === '0' ? number : displayValue + number
  }
}

const inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot
  }
}

const inputOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator

  const inputValue = parseFloat(displayValue)

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator
    return
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator)

    // calculator.displayValue = String(result)
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`
    calculator.firstOperand = result
  }

  calculator.waitingForSecondOperand = true
  calculator.operator = nextOperator
}

const calculate = (firstOperand, secondOperand, operator) => {
  if (operator === '+') {
    return firstOperand + secondOperand
  } else if (operator === '-') {
    return firstOperand - secondOperand
  } else if (operator === 'x') {
    return firstOperand * secondOperand
  } else if (operator === '/') {
    return firstOperand / secondOperand
  }

  return secondOperand
}

const resetCalculator = () => {
  calculator.displayValue = '0'
  calculator.firstOperand = null
  calculator.waitingForSecondOperand = false
  calculator.operator = null
}

const deleteValue = () => {
  const { displayValue } = calculator
  if (displayValue === '0') return

  if (displayValue.length === 1) {
    calculator.displayValue = '0'
    return
  }

  calculator.displayValue = displayValue.slice(0, -1)
}

// Event Delegation used here
const btns = document.querySelector('.keypad')
btns.addEventListener('click', (evt) => {
  const { target } = evt

  if (!target.matches('button')) return

  switch (target.dataset.type) {
    case 'operator':
      inputOperator(target.innerText)
      break
    case 'decimal':
      inputDecimal(target.innerText)
      break
    case 'reset':
      resetCalculator()
      break
    case 'delete':
      deleteValue()
      break
    default:
      inputNumber(target.innerText)
  }

  updateDisplay()
})

updateDisplay()
