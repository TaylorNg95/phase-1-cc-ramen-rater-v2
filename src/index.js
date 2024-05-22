// index.js
const baseUrl = 'http://localhost:3000/ramens'
let allRamens

const ramenMenuDiv = document.querySelector('#ramen-menu')
const imageDisplay = document.querySelector('.detail-image')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')


// fetch data from db.json using GET request
const displayRamens = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      clearMenu() // the page will eventually get re-rendered after each POST request
      data.forEach(singleRamen => {
        renderRamen(singleRamen)
      })
      allRamens = data
      handleClick(allRamens[0]) // nifty way to automatically display the first ramen, as if it had been clicked
    })
};

function clearMenu(){
  ramenMenuDiv.innerHTML = ''
}

// render each ramen image into the ramen menu div and add a click event to each
function renderRamen(singleRamen){
  const img = document.createElement('img')
  img.src = singleRamen.image
  img.dataset.id = singleRamen.id
  img.addEventListener('click', function(){
    handleClick(singleRamen)
  })
  ramenMenuDiv.appendChild(img)
}

// when click event happens, display the details of the pertinent ramen
const handleClick = (singleRamen) => {
  imageDisplay.src = singleRamen.image
  imageDisplay.dataset.id = singleRamen.id
  
  document.querySelector('.name').textContent = singleRamen.name
  document.querySelector('.restaurant').textContent = singleRamen.restaurant
  ratingDisplay.textContent = singleRamen.rating
  commentDisplay.textContent = singleRamen.comment
};

// send data to db.json via a POST request
const addSubmitListener = () => {
  const newRamenForm = document.querySelector('#new-ramen')
  newRamenForm.addEventListener('submit', function(event){
    event.preventDefault()

    const newName = document.querySelector('#new-name').value
    const newRestaurant = document.querySelector('#new-restaurant').value
    const newImage = document.querySelector('#new-image').value
    const newRating = document.querySelector('#new-rating').value
    const newComment = document.querySelector('#new-comment').value

    const newSingleRamen = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment
    }

    sendData(newSingleRamen)
    newRamenForm.reset()
    renderRamen(newSingleRamen)
  })
  
  // submit listener for the edit ramen form
  const editRamenForm = document.querySelector('#edit-ramen')
  editRamenForm.addEventListener('submit', function(event){
    event.preventDefault()
    updateData()
    editRamenForm.reset()
  })

  // submit listener for the delete button
  const deleteBtn = document.querySelector('#delete-ramen')
  deleteBtn.addEventListener('click', function(event){
    event.preventDefault()
    deleteData()
  })
}

function sendData(newSingleRamen){
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newSingleRamen)
  })
}

function updateData(){
  const editRating = document.querySelector('#edit-rating').value
  const editComment = document.querySelector('#edit-comment').value
  
  const editID = imageDisplay.dataset.id
  let newAllRamens = allRamens.map(ramen => {
    if(ramen.id === editID){
      ramen.rating = editRating
      ramen.comment = editComment
    }
    return ramen
  })
  allRamens = newAllRamens

  ratingDisplay.textContent = editRating
  commentDisplay.textContent = editComment

  if(editRating !== '' && editComment !== ''){
    fetch(`${baseUrl}/${editID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        rating: editRating,
        comment: editComment
      })
    })
  }
}

function deleteData(){
  const result = confirm('Are you sure you would like to delete this ramen?')
  if(result){
    fetch(`${baseUrl}/${imageDisplay.dataset.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    })
    allRamens = allRamens.filter(ramen => {
      ramen.id !== imageDisplay.dataset.id
      return ramen
    })
    /* document.querySelector(`[data-id="${imageDisplay.dataset.id}"]`).remove()
    ratingDisplay.textContent = allRamens[0].rating
    commentDisplay.textContent = allRamens[0].comment */
    document.querySelector(`[data-id="${imageDisplay.dataset.id}"]`).remove()
    handleClick(allRamens[0])
  }
}

const main = () => {
  document.addEventListener('DOMContentLoaded', function(){
    displayRamens()
    addSubmitListener()
  })
}

main()

// Export functions for testing
/* export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}; */