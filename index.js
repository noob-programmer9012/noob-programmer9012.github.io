const toggleNav = document.querySelector('#mobile')
const sidebar = document.querySelector('.sidebar')
const main = document.querySelector('.main')
const modal = document.querySelector('#modal')
const confirm = document.querySelector('#confirm')
const closeModal = document.querySelectorAll('#modal-close')
const nav = document.querySelector('.navbar')
const mobileView = window.matchMedia('(max-width: 840px)')
let li = document.querySelectorAll('.li')
let icons = document.querySelectorAll('.navicons > .fa')
let errorSection = document.querySelector('.error-section')
let error = document.querySelector('.error')
let formControl = document.querySelectorAll('.form-control')
let closeError = document.querySelector('#closeError')

closeError.addEventListener('mousedown', () => {
  errorSection.style.visibility = 'hidden'
  errorSection.style.width = '0px'
  errorSection.style.height = '0px'
  errorSection.style.opacity = '0'
  error.style.width = '0px'
  closeError.style.opacity = '0'
  error.style.opacity = '0'
  error.style.visibility = 'hidden'
})

formControl.forEach(item => {
  item.addEventListener('keydown', () => {
    errorSection.style.opacity = '0'
    errorSection.style.width = '0px'
    errorSection.style.height = '0px'
    errorSection.style.visibility = 'hidden'
    closeError.style.opacity = '0'
    error.style.width = '0px'
    error.style.opacity = '0'
    error.style.visibility = 'hidden'
  })
})

closeModal.forEach(item => {
  item.addEventListener('click', () => {
    modal.classList.remove('show-modal')
  })
})

function filterTable () {
  let input, filter, table, tr, td, i, txtValue
  input = document.getElementById('search')
  filter = input.value.toUpperCase()
  table = document.getElementById('myTable')
  tr = table.getElementsByTagName('tr')

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0]
    if (td) {
      txtValue = td.textContent || td.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
  }
}

function clicked () {
  if (mobileView.matches) {
    sidebar.classList.add('show')
    main.style.opacity = 0.2
    nav.style.opacity = 0.2
    li.forEach(item => {
      item.style.display = ''
    })
  }
  if (!mobileView.matches) {
    if (sidebar.style.width === '220px') {
      sidebar.style.width = '60px'
      li.forEach(item => {
        item.style.display = 'none'
      })
    } else {
      sidebar.style.width = '220px'
      li.forEach(item => {
        item.style.display = ''
      })
    }
  }
}

function mobileBehave (e) {
  if (mobileView.matches && sidebar.classList.contains('show')) {
    if (!sidebar.contains(e.target)) {
      sidebar.classList.remove('show')
      main.style.opacity = 1
      nav.style.opacity = 1
    }
  }

  if (
    mobileView.matches &&
    (e.target.id == 'mobile' || e.target.className === 'sticks')
  ) {
    clicked()
  }
}

document.addEventListener('click', mobileBehave)
toggleNav.addEventListener('click', clicked)

function setAttributes (elem, attr) {
  for (let key in attr) {
    elem.setAttribute(key, attr[key])
  }
}

let obj = new Object()
for (let i = 0; i < localStorage.length; i++) {
  obj[localStorage.key(i)] = localStorage.getItem(localStorage.key(i))
}

let tbody = document.querySelector('tbody')
const save = document.querySelector('#save')

function duplicateTrans (transporter, tempTrans) {
  let keys = []
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i))
  }
  keys.sort()

  for (let i = 0; i < keys.length; i++) {
    if (tempTrans.toUpperCase().trim() === keys[i].toUpperCase().trim()) {
      continue
    } else if (
      keys[i].toUpperCase().trim() === transporter.toUpperCase().trim()
    ) {
      return true
    }
  }
  return false
}

function duplicateGst (gst) {
  let keys = []
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i))
  }
  keys.sort()

  for (let i = 0; i < keys.length; i++) {
    // alert(localStorage.getItem(keys[i]))
    if (tempGst === localStorage.getItem(keys[i])) {
      continue
    } else if (
      localStorage.getItem(keys[i]).toUpperCase().trim() ===
      gst.toUpperCase().trim()
    ) {
      return true
    }
  }
  return false
}

let temp = []
let tempTrans, tempGst

save.addEventListener('click', saveData)
function saveData (e) {
  e.preventDefault()
  if (trans.value !== '' && gst.value !== '') {
    if (e.target.innerText === 'Submit') {
      if (!duplicateTrans(trans.value, '') && !duplicateGst(gst.value, '')) {
        localStorage.setItem(
          trans.value.toUpperCase().trim(),
          gst.value.toUpperCase().trim()
        )
        window.location.reload()
      } else {
        errorSection.style.visibility = 'visible'
        errorSection.style.opacity = '1'
        errorSection.style.width = '75%'
        errorSection.style.height = '40px'
        closeError.style.opacity = '1'
        error.style.width = '100%'
        error.style.opacity = '1'
        error.style.visibility = 'visible'
        error.innerText = 'Duplicate Entry!'
        trans.focus()
      }
    } else if (e.target.innerText === 'Change') {
      if (
        trans.value.toUpperCase().trim() === e.target.value &&
        gst.value.toUpperCase().trim() === localStorage[e.target.value]
      ) {
        errorSection.style.visibility = 'visible'
        errorSection.style.opacity = '1'
        errorSection.style.width = '75%'
        errorSection.style.height = '40px'
        closeError.style.opacity = '1'
        error.style.width = '100%'
        error.style.visibility = 'visible'
        error.style.opacity = '1'
        error.innerText = 'No changes were made!'
      } else {
        tempTrans = e.target.value
        tempGst = localStorage[e.target.value]
        if (duplicateTrans(trans.value.toUpperCase().trim(), tempTrans)) {
          errorSection.style.visibility = 'visible'
          errorSection.style.opacity = '1'
          errorSection.style.width = '75%'
          errorSection.style.height = '40px'
          closeError.style.opacity = '1'
          error.style.width = '100%'
          error.style.visibility = 'visible'
          error.style.opacity = '1'
          error.innerText = 'Transporter already exist!'
        } else if (duplicateGst(gst.value.toUpperCase().trim())) {
          errorSection.style.visibility = 'visible'
          errorSection.style.opacity = '1'
          errorSection.style.width = '75%'
          errorSection.style.height = '40px'
          closeError.style.opacity = '1'
          error.style.width = '100%'
          error.style.visibility = 'visible'
          error.style.opacity = '1'
          error.innerText = 'Gst number assigned to another transporter!'
        } else {
          localStorage.removeItem(e.target.value)
          localStorage.setItem(
            trans.value.toUpperCase().trim(),
            gst.value.toUpperCase().trim()
          )
          window.location.reload()
        }
      }
    }
  } else {
    errorSection.style.visibility = 'visible'
    errorSection.style.opacity = '1'
    errorSection.style.width = '75%'
    errorSection.style.height = '40px'
    closeError.style.opacity = '1'
    error.style.width = '100%'
    error.style.visibility = 'visible'
    error.style.opacity = '1'
    error.innerText = 'All fields are mandatory'
  }
}

cancel.addEventListener('click', e => {
  e.preventDefault()
  temp = [e.target.value, localStorage[e.target.value]]
  localStorage.setItem(temp[0], temp[1])
  window.location.reload()
})

let tr, td0, td1, td2, td3, key, value, edit, remove

function removeData (e) {
  localStorage.removeItem(e.target.value)
  window.location.reload()
}
confirm.addEventListener('click', removeData)

modal.addEventListener('click', e => {
  if (e.target.id === 'modal') {
    modal.classList.remove('show-modal')
  }
})

document.addEventListener('DOMContentLoaded', () => {
  // Load Data from local storage
  const data = Object.keys(obj).sort()
  for (let i = 0; i < data.length; i++) {
    // Dynamically add data to the table
    counter = document.createTextNode(i + 1)
    key = document.createTextNode(data[i])
    value = document.createTextNode(obj[data[i]])

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

  // Remove elements
  remove = document.querySelectorAll('#remove')
  remove.forEach(item => {
    item.addEventListener('click', e => {
      const modalBody = document.querySelector('.modal-body')
      modalBody.innerHTML = `Delete ${data[e.target.title]}?`
      modal.classList.add('show-modal')
      const confirm = document.querySelector('#confirm')
      confirm.value = data[e.target.title]
    })
  })

  // Edit elements
  edit = document.querySelectorAll('#edit')
  edit.forEach(item => {
    item.addEventListener('click', e => {
      save.innerText = 'Change'
      trans.value = data[e.target.title]
      gst.value = obj[trans.value]
      save.value = data[e.target.title]
      const cancel = document.querySelector('#cancel')
      cancel.classList.add('cancel-show')
      cancel.value = data[e.target.title]
    })
  })

  sidebar.style.width = '60px'
  li.forEach(item => {
    item.style.display = 'none'
  })
})
