const formSubmit = document.getElementById('inputBook')
const searchSubmit = document.getElementById('searchBook')

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
