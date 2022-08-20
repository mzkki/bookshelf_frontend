const formSubmit = document.getElementById('inputBook')
const searchSubmit = document.getElementById('searchBook')
const darkMode = document.getElementById('darkMode')

formSubmit.addEventListener('submit', (event) => {
  event.preventDefault()
  addBook()
})

searchSubmit.addEventListener('submit', (event) => {
  event.preventDefault()
  searchBook()
})

searchSubmit.addEventListener('keyup', (event) => {
  event.preventDefault()
  searchBook()
})

darkMode.addEventListener('change', (event) => {
  event.preventDefault()
  darkModeToggle()
})
