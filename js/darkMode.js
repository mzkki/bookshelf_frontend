const darkModeToggle = () => {
  const body = document.getElementById('body')

  const darkMode = document.getElementById('darkMode')
  const darkToggle = document.getElementById('darkToggle')
  const navbar = document.getElementById('navbar')

  const cardBody = document.getElementsByClassName('card')
  const cardTitle = document.getElementsByClassName('card-title')

  const isCompletedToggle = document.getElementById('isCompleted')

  const buttonInput = document.getElementById('buttonInput')
  const buttonSearch = document.getElementById('buttonSearch')

  const footer = document.getElementById('footer')
  const footerText = document.getElementById('footer-text')
  const footerLink = document.getElementById('footer-link')

  if (darkMode.checked) {
    body.classList.add('dark-body')

    navbar.classList.replace('bg-light', 'bg-dark')
    navbar.classList.add('navbar-dark')
    darkToggle.classList.add('text-white')

    for (const cardItem of cardBody) {
      cardItem.classList.replace('bg-light', 'bg-grey')
    }

    for (const cardTitleItem of cardTitle) {
      cardTitleItem.classList.add('text-white')
    }

    isCompletedToggle.classList.add('text-white')

    buttonInput.classList.replace('btn-outline-success', 'btn-success')
    buttonSearch.classList.replace('btn-outline-primary', 'btn-primary')

    footer.classList.replace('bg-light', 'bg-dark')
    footerText.classList.add('text-white')
    footerLink.classList.replace('text-dark', 'text-white')
  }
  if (!darkMode.checked) {
    body.classList.remove('dark-body')

    navbar.classList.replace('bg-dark', 'bg-light')
    navbar.classList.remove('navbar-dark')
    darkToggle.classList.remove('text-white')

    for (const cardItem of cardBody) {
      cardItem.classList.replace('bg-grey', 'bg-light')
    }

    for (const cardTitleItem of cardTitle) {
      cardTitleItem.classList.remove('text-white')
    }

    isCompletedToggle.classList.remove('text-white')

    buttonInput.classList.replace('btn-success', 'btn-outline-success')
    buttonSearch.classList.replace('btn-primary', 'btn-outline-primary')

    footer.classList.replace('bg-dark', 'bg-light')
    footerText.classList.remove('text-white')
    footerLink.classList.replace('text-white', 'text-dark')
  }
}