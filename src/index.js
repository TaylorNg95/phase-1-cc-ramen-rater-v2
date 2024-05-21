// index.js
const imageDiv = document.querySelector('#ramen-menu')
const detailDiv = document.querySelector('#ramen-detail')

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
  // Add code
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      data.forEach(ramenObj => {
        const img = document.createElement('img')
        img.src = ramenObj.image
        img.addEventListener('click', function(){
          handleClick(ramenObj)
        })
        imageDiv.appendChild(img)
      });
    })
};

const main = () => {
  displayRamens()
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
