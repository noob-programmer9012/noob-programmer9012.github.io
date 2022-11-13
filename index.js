let save = document.querySelector('#save')
let trans = document.querySelector('#trans')
let gst = document.querySelector('#gst')
let allowed = /^[a-zA-Z ]*$/
let error = document.querySelector('.error')

trans.addEventListener('keydown', e => {
  if (e.key.match(allowed)) {
    error.style.display = 'none'
    return
  } else {
    e.preventDefault()
    error.style.display = 'block'
    error.innerHTML = 'No numbers allowed'
  }
})

gst.addEventListener('keydown', () => {
  if (error.style.display === 'block') {
    error.style.display = 'none'
  }
})

let tbody = document.querySelector('tbody')
let confirm = document.querySelector('#confirm')
let tr, td0, td1, td2, td3, key, value, edit, remove
let form = document.querySelector('form')
let modalbody = document.querySelector('#modalbody')

function setAttributes (elem, attr) {
  for (let key in attr) {
    elem.setAttribute(key, attr[key])
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load Data from local storage
  for (let i = 0; i < localStorage.length; i++) {
    // Dynamically add data to the table
    counter = document.createTextNode(i + 1)
    key = document.createTextNode(localStorage.key(i))
    value = document.createTextNode(localStorage.getItem(localStorage.key(i)))

    // Print Values on table
    tr = document.createElement('tr')
    td0 = document.createElement('th')
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')

    td0.appendChild(counter)
    td1.appendChild(key)
    td2.appendChild(value)
    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)

    // Add control to the table
    edit = document.createElement('span')
    edit.innerText = 'edit'
    setAttributes(edit, {
      class: 'material-symbols-outlined edit',
      id: 'edit',
      title: `${i}`
    })
    td3.appendChild(edit)

    remove = document.createElement('span')
    remove.innerText = 'delete'
    setAttributes(remove, {
      class: 'material-symbols-outlined delete',
      id: 'remove',
      title: `${i}`,
      'data-bs-toggle': 'modal',
      'data-bs-target': '#exampleModal'
    })
    td3.appendChild(remove)
    tr.appendChild(td3)
    tbody.appendChild(tr)
  }
  // Give modal delete button value
  remove = document.querySelectorAll('#remove')
  remove.forEach(element => {
    element.addEventListener('click', e => {
      confirm.setAttribute('value', `${e.target.title}`)
      modalbody.innerHTML = `Are you sure you want to delete ${localStorage.key(
        e.target.title
      )}`
    })
  })

  // Edit Data
  edit = document.querySelectorAll('#edit')
  edit.forEach(element => {
    element.addEventListener('click', e => {
      save.innerText = 'Change'
      save.setAttribute('value', e.target.title)
      trans.value = localStorage.key(e.target.title)
      gst.value = localStorage.getItem(localStorage.key(e.target.title))
    })
  })
  // End of DOM
})

// Check if transporter already in Local storage
function duplicate (transporter, gst) {
  for (let i = 0; i < localStorage.length; i++) {
    if (
      localStorage.key(i) === transporter &&
      localStorage.getItem(localStorage.key(i)) === gst
    ) {
      return true
    }
  }
  return false
}
// Save data to local Storage
save.addEventListener('click', e => {
  e.preventDefault()
  if (save.innerText === 'Submit') {
    if (
      trans.value !== '' &&
      gst.value !== '' &&
      !duplicate(trans.value, gst.value)
    ) {
      localStorage.setItem(`${trans.value}`, `${gst.value}`)
      form.reset()
      window.location.reload()
    } else {
      error.style.display = 'block'
      error.innerHTML = 'Duplicate entry found.'
    }
  }
  if (save.innerText === 'Change') {
    if (
      trans.value !== '' &&
      gst.value !== '' &&
      !duplicate(trans.value, gst.value)
    ) {
      localStorage.removeItem(localStorage.key(e.target.value))
      localStorage.setItem(trans.value, gst.value)
      form.reset()
      window.location.reload()
    } else {
      error.style.display = 'block'
      error.innerHTML = 'Duplicate entry found.'
    }
  }
  if (trans.value === '' || gst.value === '') {
    error.style.display = 'block'
    error.innerHTML = 'Input values must not be blank.'
  }
})

// Delete Data
confirm.addEventListener('click', e => {
  localStorage.removeItem(localStorage.key(e.target.value))
  window.location.reload()
})
