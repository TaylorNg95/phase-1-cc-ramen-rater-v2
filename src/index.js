// index.js
const imageDiv = document.querySelector('#ramen-menu')

// Callbacks
const handleClick = (ramen) => {
  // Add code
};

const addSubmitListener = () => {
  // Add code
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        renderImage(element.image)
      });
    })
};

function renderImage(image){
  const img = document.createElement('img')
  img.src = image
  imageDiv.appendChild(img)
}

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
