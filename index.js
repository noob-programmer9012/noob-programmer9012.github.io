let save = document.querySelector('#save')
let trans = document.querySelector('#trans')
let gst = document.querySelector('#gst')

trans.addEventListener('keydown', e => {
  if (
    (e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= 'z') ||
    e.key === ' ' ||
    e.key === 'Enter'
  ) {
    return
  } else {
    // trans.style.borderColor = '#0a690a'
    // trans.style.boxShadow =
    //   'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(138, 216, 118, 0.6)'

    e.preventDefault()
  }
})

let tbody = document.querySelector('tbody')
let tr
let td0
let td1
let td2
let td3
let counter
let key
let value
let edit
let deleteData

save.addEventListener('click', e => {
  e.preventDefault()
  if (trans.value !== '' && gst.value != '' && save.id === 'save') {
    let length = localStorage.length
    let counter = document.createTextNode(length + 1)
    let key = document.createTextNode(trans.value)
    let value = document.createTextNode(gst.value)

    tr = document.createElement('tr')
    td0 = document.createElement('th')
    td1 = document.createElement('td')
    td2 = document.createElement('td')
    td3 = document.createElement('td')
    edit = document.createElement('button')
    edit.innerHTML = 'Edit'
    edit.setAttribute('class', 'edit')
    edit.setAttribute('id', 'edit')
    edit.setAttribute('value', `${i}`)
    deleteData = document.createElement('button')
    deleteData.innerHTML = 'Delete'
    deleteData.setAttribute('class', 'deleteData')
    deleteData.setAttribute('id', 'deleteData')
    deleteData.setAttribute('value', `${i}`)
    deleteData.setAttribute('data-bs-toggle', 'modal')
    deleteData.setAttribute('data-bs-target', '#exampleModal')

    td3.appendChild(edit)
    td3.appendChild(deleteData)
    td0.setAttribute('scope', 'row')
    td0.appendChild(counter)
    td1.appendChild(key)
    td2.appendChild(value)
    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tbody.appendChild(tr)

    localStorage.setItem(`${trans.value}`, `${gst.value}`)
    trans.value = ''
    gst.value = ''

    // window.location.reload()
  }
  if (save.id === 'editb') {
    localStorage.setItem(`${trans.value}`, `${gst.value}`)
    localStorage.removeItem(localStorage.getItem(trans.value))
    window.location.reload()
  }
})

for (i = 0; i < localStorage.length; i++) {
  counter = document.createTextNode(i + 1)
  key = document.createTextNode(localStorage.key(i))
  value = document.createTextNode(localStorage.getItem(localStorage.key(i)))

  tr = document.createElement('tr')
  td0 = document.createElement('th')
  td1 = document.createElement('td')
  td2 = document.createElement('td')
  td3 = document.createElement('td')
  edit = document.createElement('button')
  edit.innerHTML = 'Edit'
  edit.setAttribute('class', 'edit')
  edit.setAttribute('id', 'edit')
  edit.setAttribute('value', `${i}`)
  deleteData = document.createElement('button')
  deleteData.innerHTML = 'Delete'
  deleteData.setAttribute('class', 'deleteData')
  deleteData.setAttribute('id', 'deleteData')
  deleteData.setAttribute('value', `${i}`)
  deleteData.setAttribute('data-bs-toggle', 'modal')
  deleteData.setAttribute('data-bs-target', '#exampleModal')

  td3.appendChild(edit)
  td3.appendChild(deleteData)
  td0.setAttribute('scope', 'row')
  td0.appendChild(counter)
  td1.appendChild(key)
  td2.appendChild(value)
  tr.appendChild(td0)
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tbody.appendChild(tr)
}

// Edit values
edit = document.querySelectorAll('#edit')

edit.forEach(item => {
  item.addEventListener('click', e => {
    trans.value = localStorage.key(item.value)
    gst.value = localStorage.getItem(localStorage.key(item.value))
    save.setAttribute('id', 'editb')
    save.innerHTML = 'Edit'
  })
})

let modalbody = document.querySelector('#modalbody')
let confirm = document.querySelector('#confirm')

// Delete values
deleteData = document.querySelectorAll('#deleteData')
deleteData.forEach(item => {
  item.addEventListener('click', () => {
    modalbody.innerHTML = `Are you sure you want to delete ${localStorage.key(
      item.value
    )}?`
    confirm.setAttribute('value', `${item.value}`)
  })
})

confirm.addEventListener('click', e => {
  localStorage.removeItem(localStorage.key(e.target.value))
  window.location.reload()
})
