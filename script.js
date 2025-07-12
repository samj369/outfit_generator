let closet = {
  top: [],
  bottom: [],
  dresses: [],
  outerwear: [],
  shoes: [],
  hats: [],
  bag: []
};

document.getElementById('addButton').addEventListener('click', () => {
 const input = document.getElementById('imageInput');
 const category = document.getElementById('categorySelect').value;
 const file = input.files[0];


 if (file) {
   const reader = new FileReader();
   reader.onload = function (e) {
     const imgData = e.target.result;
     closet[category].push(imgData);
     displayCloset();
   };
   reader.readAsDataURL(file);
 }
});


document.getElementById('generateButton').addEventListener('click', () => {
 const outfitDisplay = document.getElementById('outfitDisplay');
 outfitDisplay.innerHTML = '';

 const selectedImages = [];

  let dressSelected = false;

  // randomly select a dress if there are any in wardrobe
  if (closet.dresses.length > 0 && Math.random() < 0.5) { // 50% chance
    selectedImages.push(randomItem(closet.dresses));
    dressSelected = true;
  }

  // only include top and bottom if a dress wasn't chosen
  if (!dressSelected) {
    if (closet.top.length > 0) selectedImages.push(randomItem(closet.top));
    if (closet.bottom.length > 0) selectedImages.push(randomItem(closet.bottom));
  }

  // select optional layers compatible with any outfit
  ['outerwear', 'shoes', 'hats', 'bag'].forEach(category => {
    if (closet[category].length > 0) {
      selectedImages.push(randomItem(closet[category]));
    }
  });

  // display final outfit images
  selectedImages.forEach(imgSrc => {
    const img = document.createElement('img');
    img.src = imgSrc;
    outfitDisplay.appendChild(img);
  });
});

function displayCloset() {
  const closetDiv = document.getElementById('closet');
  closetDiv.innerHTML = '';

  Object.entries(closet).forEach(([category, images]) => {
    images.forEach(imgData => {
      const img = document.createElement('img');
      img.src = imgData;
      img.alt = category;
      closetDiv.appendChild(img);
    });
  });
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

