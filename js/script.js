document.addEventListener('DOMContentLoaded', () => {
  const books = []
  const RENDER_EVENT = 'render-book'

  const formSubmit = document.getElementById('inputBook')
  formSubmit.addEventListener('submit', (event) => {
    event.preventDefault()
    addBook()
  })

  const addBook = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const year = document.getElementById('year').value

    const bookID = generateId()
    const bookObj = generateBookObj(bookID, title, author, year, false)
    books.push(bookObj)
    console.log(bookObj)

    document.dispatchEvent(new Event(RENDER_EVENT))
  }

  const generateId = () => {
    return +new Date()
  }

  const generateBookObj = (id, title, author, year, isComplete) => {
    return {
      id, title, author, year, isComplete
    }
  }

  document.addEventListener(RENDER_EVENT, () => {
    const uncompleteBook = document.getElementById('books')
    uncompleteBook.innerHTML = ''

    const compeleteBook = document.getElementById('completed-books')
    compeleteBook.innerHTML = ''
    for (const bookItem of books) {
      const bookElement = makeBookItem(bookItem)
      if (!bookItem.isComplete) {
        uncompleteBook.append(bookElement)
      } else {
        compeleteBook.append(bookElement)
      }
    }

    const nothing = document.createElement('h4')
    if (uncompleteBook.innerHTML == '') {
      nothing.innerText = "Bagus semua buku telah kamu baca"
      uncompleteBook.append(nothing)
    } else {
      nothing.innerText = "come on"
      compeleteBook.append(nothing)
    }
  })

  const makeBookItem = (bookObj) => {
    const textTitle = document.createElement('h5')
    textTitle.innerText = bookObj.title

    const authorAndYear = document.createElement('p')
    authorAndYear.classList.add('text-muted', 'fs-5')
    authorAndYear.innerText = bookObj.author
    authorAndYear.innerText += ' • '
    authorAndYear.innerText += bookObj.year

    const textContainer = document.createElement('div')
    textContainer.classList.add('inner')
    textContainer.append(textTitle, authorAndYear)

    const container = document.createElement('div')
    container.append(textContainer)
    container.setAttribute('id', `book-${bookObj.id}`)
    console.log(container)
    if (bookObj.isComplete) {
      const undoButton = document.createElement('i')
      undoButton.classList.add('fa-solid', 'fa-rotate-left')

      undoButton.addEventListener('click', () => {
        undoBookFromComplete(bookObj.id)
      })

      const trashButton = document.createElement('i')
      trashButton.classList.add('fa-solid', 'fa-circle-minus')

      trashButton.addEventListener('click', () => {
        removeBookFromComplete(bookObj.id)
      })

      container.append(undoButton, trashButton)
    } else {
      const checkButton = document.createElement('i')
      checkButton.classList.add('fa-solid', 'fa-check')

      checkButton.addEventListener('click', () => {
        addBookToComplete(bookObj.id)
      })
      container.append(checkButton)
    }
    return container
  }
})