// index.js
const ramenMenuDiv = document.querySelector('#ramen-menu')

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

    createRamenImage(newRamenObject)
    newRamenForm.reset()
  })
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      data.forEach(ramenObj => {
        createRamenImage(ramenObj)
      });
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
  /* displayRamens()
  addSubmitListener() */
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
