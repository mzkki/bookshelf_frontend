const generateId = () => {
  return +new Date()
}

const generateBookObj = (id, title, author, year, isComplete) => {
  return {
    id, title, author, year, isComplete
  }
}

const SAVED_EVENT = 'saved-book'
const STORAGE_KEY = 'BOOK_APPS'

const saveData = () => {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books)
    localStorage.setItem(STORAGE_KEY, parsed)
    document.dispatchEvent(new Event(SAVED_EVENT))
  }
}

const isStorageExist = () => {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage')
    return false
  } else {
    return true
  }
}

document.addEventListener(SAVED_EVENT, () => {
  const x = document.getElementById('snackbar')
  x.innerText = 'Berhasil Mengubah Data'
  x.className = 'show'
  setTimeout(() => {
    x.className = x.className.replace('show', '')
  }, 3000)
})

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY)
  let data = JSON.parse(serializedData)

  if (data !== null) {
    for (const book of data) {
      books.push(book)
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT))
}

if (isStorageExist()) {
  loadDataFromStorage()
}
