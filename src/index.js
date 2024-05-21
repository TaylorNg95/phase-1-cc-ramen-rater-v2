// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  document.querySelector('.detail-image').src = ramen.image
  document.querySelector('.name').textContent = ramen.name
  document.querySelector('.restaurant').textContent = ramen.restaurant
  document.querySelector('#rating-display').textContent = ramen.rating
  document.querySelector('#comment-display').textContent = ramen.comment
};

const addSubmitListener = () => {
  // submit listener for the new ramen form
  const newRamenForm = document.querySelector('#new-ramen')
  newRamenForm.addEventListener('submit', function(event){
    event.preventDefault()

    const newName = document.querySelector('#new-name').value
    const newRestaurant = document.querySelector('#new-restaurant').value
    const newImage = document.querySelector('#new-image').value
    const newRating = document.querySelector('#new-rating').value
    const newComment = document.querySelector('#new-comment').value

    const newRamenObject = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment
    }

    const img = document.createElement('img')
    img.src = newImage
    img.addEventListener('click', function(){
      handleClick(newRamenObject)
    })
    document.querySelector('#ramen-menu').appendChild(img)
    newRamenForm.reset()
  })

  // submit listener for the edit ramen form
  const editRamenForm = document.querySelector('#edit-ramen')
  editRamenForm.addEventListener('submit', function(event){
    event.preventDefault()
      const editRating = document.querySelector('#edit-rating').value
      const editComment = document.querySelector('#edit-comment').value
      if(editRating !== '' && editComment !== ''){
        let featuredRating = document.querySelector('#rating-display')
        let featuredComment = document.querySelector('#comment-display')
        featuredRating.textContent = editRating
        featuredComment.textContent = editComment
        editRamenForm.reset()
      }
  })
  
  // submit listener for the delete ramen button
  const deleteRamenBtn = document.querySelector('#delete-ramen')
  deleteRamenBtn.addEventListener('click'), function(event){
    event.preventDefault()

    // add an alert to ask the user if they for sure want to delete the featured ramen

  }
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      data.forEach(ramenObj => {
        createRamenImage(ramenObj)
      })
      handleClick(data[0]) // nifty way to automatically display the first ramen, as if it had been clicked
    })
};

function createRamenImage(ramenObj){
  const img = document.createElement('img')
  img.src = ramenObj.image
  img.addEventListener('click', function(){
    handleClick(ramenObj)
  })
  document.querySelector('#ramen-menu').appendChild(img)
}

const main = () => {
  document.addEventListener('DOMContentLoaded', function(){
    displayRamens()
    addSubmitListener()
  })
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
