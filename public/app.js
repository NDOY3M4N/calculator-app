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
