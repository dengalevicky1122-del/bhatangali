document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const files = event.target.files;
    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';

                const img = document.createElement('img');
                img.src = e.target.result;
                previewItem.appendChild(img);

                const descInput = document.createElement('input');
                descInput.type = 'text';
                descInput.placeholder = 'Enter description';
                previewItem.appendChild(descInput);

                const saveBtn = document.createElement('button');
                saveBtn.className = 'save-btn';
                saveBtn.textContent = 'Save';
                saveBtn.addEventListener('click', function() {
                    saveImage(e.target.result, descInput.value);
                    previewItem.remove();
                });
                previewItem.appendChild(saveBtn);

                previewArea.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        }
    }
}

function saveImage(src, description) {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    savedImages.push({ src, description });
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    displaySavedImages();
}

function displaySavedImages() {
    const savedImagesDiv = document.getElementById('savedImages');
    savedImagesDiv.innerHTML = '';
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

    savedImages.forEach((item, index) => {
        const savedItem = document.createElement('div');
        savedItem.className = 'saved-item';

        const img = document.createElement('img');
        img.src = item.src;
        savedItem.appendChild(img);

        const desc = document.createElement('p');
        desc.textContent = item.description;
        savedItem.appendChild(desc);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            savedImages.splice(index, 1);
            localStorage.setItem('savedImages', JSON.stringify(savedImages));
            displaySavedImages();
        });
        savedItem.appendChild(deleteBtn);

        savedImagesDiv.appendChild(savedItem);
    });
}

document.querySelectorAll(".single-reel-card").forEach(card => {
  const video = card.querySelector("video");

  card.addEventListener("click", () => {

    // Pause all other videos
    document.querySelectorAll(".single-reel-card video").forEach(v => {
      if (v !== video) {
        v.pause();
      }
    });

    // Remove active class from all
    document.querySelectorAll(".single-reel-card").forEach(c => {
      c.classList.remove("active");
    });

    // Add active to clicked one
    card.classList.add("active");

    // Play / Pause toggle
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    // Fullscreen for mobile
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  });
});