let closet = {
 top: [],
 bottom: [],
 shoes: []
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


 ['top', 'bottom', 'shoes'].forEach(category => {
   const items = closet[category];
   if (items.length > 0) {
     const randomImg = items[Math.floor(Math.random() * items.length)];
     const imgElement = document.createElement('img');
     imgElement.src = randomImg;
     outfitDisplay.appendChild(imgElement);
   }
 });
});


function displayCloset() {
 const closetDiv = document.getElementById('closet');
 closetDiv.innerHTML = '';
 Object.entries(closet).forEach(([category, images]) => {
   images.forEach(imgData => {
     const img = document.createElement('img');
     img.src = imgData;
     closetDiv.appendChild(img);
   });
 });
}


