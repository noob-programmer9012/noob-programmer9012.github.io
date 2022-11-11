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
let counter
let key
let value

save.addEventListener('click', e => {
  e.preventDefault()
  if (trans.value !== '' && gst.value != '') {
    let length = localStorage.length

    let counter = document.createTextNode(String(length + 1))
    let key = document.createTextNode(trans.value)
    let value = document.createTextNode(gst.value)

    tr = document.createElement('tr')
    td0 = document.createElement('th')
    td1 = document.createElement('td')
    td2 = document.createElement('td')

    td0.setAttribute('scope', 'row')
    td0.appendChild(counter)
    td1.appendChild(key)
    td2.appendChild(value)
    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tbody.appendChild(tr)

    localStorage.setItem(`${trans.value}`, `${gst.value}`)
    trans.value = ''
    gst.value = ''
  }
})

document.addEventListener('DOMContentLoaded', () => {
  for (i = 0; i < localStorage.length; i++) {
    counter = document.createTextNode(i + 1)
    key = document.createTextNode(localStorage.key(i))
    value = document.createTextNode(localStorage.getItem(localStorage.key(i)))

    tr = document.createElement('tr')
    td0 = document.createElement('th')
    td1 = document.createElement('td')
    td2 = document.createElement('td')

    td0.setAttribute('scope', 'row')
    td0.appendChild(counter)
    td1.appendChild(key)
    td2.appendChild(value)
    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tbody.appendChild(tr)
  }
})
