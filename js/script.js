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

    const nothing = document.createElement('p')
    nothing.classList.add('p-3', 'shadow-sm', 'rounded', 'bg-body', 'mb-2')

    if (uncompleteBook.innerHTML == '') {
      nothing.innerText = "Tambahkan sebuah buku yang ingin kamu baca"
      uncompleteBook.append(nothing)
    } else if (compeleteBook.innerHTML == '' || uncompleteBook.innerHTML !== '') {
      nothing.innerText = "come on"
      compeleteBook.append(nothing)
    }

  })

  const makeBookItem = (bookObj) => {
    const textTitle = document.createElement('h5')
    textTitle.innerText = bookObj.title

    const authorAndYear = document.createElement('p')
    authorAndYear.classList.add('text-muted', 'fs-6')
    authorAndYear.innerText = bookObj.author
    authorAndYear.innerText += ' • '
    authorAndYear.innerText += bookObj.year

    const textContainer = document.createElement('div')
    textContainer.classList.add('col-sm-9')
    textContainer.append(textTitle, authorAndYear)

    const rowContainer = document.createElement('div')
    rowContainer.classList.add('row')


    const container = document.createElement('div')
    container.classList.add('p-3', 'shadow-sm', 'rounded', 'bg-body', 'mb-2')

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('col-sm-3')

    if (bookObj.isComplete) {
      const undoButton = document.createElement('i')
      undoButton.classList.add('fa-solid', 'fa-rotate-left', 'm-2')

      undoButton.addEventListener('click', () => {
        undoBookFromComplete(bookObj.id)
      })

      const trashButton = document.createElement('i')
      trashButton.classList.add('fa-solid', 'fa-circle-minus', 'm-2')

      trashButton.addEventListener('click', () => {
        removeBookFromComplete(bookObj.id)
      })

      buttonContainer.append(undoButton, trashButton)
      // container.append(undoButton, trashButton)

    } else {
      const checkButton = document.createElement('i')
      checkButton.classList.add('fa-solid', 'fa-check', 'm-2')

      checkButton.addEventListener('click', () => {
        addBookToComplete(bookObj.id)

      })

      const trashButton = document.createElement('i')
      trashButton.classList.add('fa-solid', 'fa-circle-minus', 'm-2')

      trashButton.addEventListener('click', () => {
        removeBookFromComplete(bookObj.id)
      })

      buttonContainer.append(checkButton, trashButton)
      // container.append(checkButton)
    }

    const addBookToComplete = (bookId) => {
      const bookTarget = findBook(bookId)

      if (bookTarget == null) return

      bookTarget.isComplete = true
      document.dispatchEvent(new Event(RENDER_EVENT))
    }

    const findBook = (bookId) => {
      for (const book of books) {
        if (book.id === bookId) {
          return book
        }
      }
      return null
    }

    const removeBookFromComplete = (bookId) => {
      const bookTarget = findBookIndex(bookId)

      if (bookTarget === -1) return

      books.splice(bookTarget, 1)
      document.dispatchEvent(new Event(RENDER_EVENT))
    }

    const undoBookFromComplete = (bookId) => {
      const bookTarget = findBook(bookId)

      if (bookTarget == null) return

      bookTarget.isComplete = false
      document.dispatchEvent(new Event(RENDER_EVENT))
    }

    const findBookIndex = (bookId) => {
      for (const index in books) {
        if (books[index].id === bookId) {
          return index
        }
      }
      return -1
    }

    rowContainer.append(textContainer, buttonContainer)
    container.append(rowContainer)
    container.setAttribute('id', `book-${bookObj.id}`)

    return container
  }

  document.dispatchEvent(new Event(RENDER_EVENT))
})