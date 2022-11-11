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
    e.preventDefault()
  }
})

let tbody = document.querySelector('tbody')
let confirm = document.querySelector('#confirm')
let tr, td0, td1, td2, td3, key, value, edit, remove

document.addEventListener('DOMContentLoaded', () => {
  // Load Data from local storage
  for (let i = 0; i < localStorage.length; i++) {
    // Dynamically add data to the table
    counter = document.createTextNode(i)
    key = document.createTextNode(localStorage.key(i))
    value = document.createTextNode(localStorage.getItem(localStorage.key(i)))

    // Print Values on table
    tr = document.createElement('tr')
    td0 = document.createElement('td')
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
    edit = document.createElement('button')
    edit.setAttribute('class', 'edit')
    edit.setAttribute('id', 'edit')
    edit.setAttribute('value', `${i}`)
    edit.innerHTML = 'Edit'
    td3.appendChild(edit)

    remove = document.createElement('button')
    remove.setAttribute('class', 'remove')
    remove.setAttribute('id', 'remove')
    remove.setAttribute('value', `${i}`)
    remove.setAttribute('data-bs-toggle', 'modal')
    remove.setAttribute('data-bs-target', '#exampleModal')
    remove.innerHTML = 'Delete'
    td3.appendChild(remove)
    tr.appendChild(td3)
    tbody.appendChild(tr)
  }

  // remove data from local storage
  const remove_list = document.querySelectorAll('#remove')
  let msg = document.querySelector('#modalbody')

  for (const element of remove_list) {
    element.addEventListener('click', e => {
      msg.innerHTML = `Are you sure you want to delete ${localStorage.key(
        element.value
      )}`
      confirm.addEventListener('click', () => {
        localStorage.removeItem(localStorage.key(element.value))
        window.location.reload()
      })
    })
  }
})

// Check if transporter already in Local storage
function duplicate (transporter) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === transporter) {
      return true
    }
  }
  return false
}
// Save data to local Storage
save.addEventListener('click', e => {
  e.preventDefault()
  if (trans.value !== '' && gst.value !== '' && !duplicate(trans.value)) {
    localStorage.setItem(`${trans.value}`, `${gst.value}`)
    window.location.reload()
  }
})
