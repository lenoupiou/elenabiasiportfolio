document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("grid");

  // Create the "page" div dynamically
  const page = document.createElement("div");
  page.id = "page";
  page.style.display = "none"; // Initially hide the page
  document.body.appendChild(page);

  // Create page content container
  const pageContent = document.createElement("div");
  pageContent.id = "pageContent";
  page.appendChild(pageContent);

  // Create the close button for the page
  const closePageButton = document.createElement("button");
  closePageButton.id = "closePage";
  closePageButton.textContent = "X";
  pageContent.appendChild(closePageButton);

  const contact = document.getElementById("contact");

  // Create overlay div
  const contactOverlay = document.createElement("div");
  contactOverlay.id = "contactOverlay";

  // Create back arrow
  const backArrow = document.createElement("div");
  backArrow.className = "back-arrow";
  backArrow.textContent = "←"; // Left arrow symbol
  contactOverlay.appendChild(backArrow);

  // Create contact text
  const contactText = document.createElement("p");
  contactText.textContent = "Contact me at : elena_biasi@hotmail.com";
  contactOverlay.appendChild(contactText);

  // Add overlay to body
  document.body.appendChild(contactOverlay);

  // Show overlay when clicking "contact"
  const contactBtn = document.getElementById("contact");
  contactBtn.addEventListener("click", () => {
    contactOverlay.style.display = "flex";
  });

  // Close overlay when clicking the back arrow
  backArrow.addEventListener("click", () => {
    contactOverlay.style.display = "none";
  });
  // Create video, title, and description placeholders for the page
  const projectVideo = document.createElement("video");
  projectVideo.id = "projectVideo";
  projectVideo.controls = false;
  projectVideo.loop = true; // Ensure it will loop
  projectVideo.muted = false; // Unmute the video
  projectVideo.playsInline = true; // Ensure it plays inline on mobile
  pageContent.appendChild(projectVideo);

  const boxTitle = document.createElement("div");
  boxTitle.id = "boxTitle";
  pageContent.appendChild(boxTitle);

  const projectTitle = document.createElement("h1");
  projectTitle.id = "projectTitle";
  boxTitle.appendChild(projectTitle);

  const projectDescription = document.createElement("p");
  projectDescription.id = "projectDescription";
  boxTitle.appendChild(projectDescription);

  const keywords = document.createElement("p");
  keywords.id = "keywords";
  boxTitle.appendChild(keywords);

  window.addEventListener("scroll", () => {
    const blurDiv = document.getElementById("ElenaBiasi");

    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight / 2; // fade out within first viewport height
    const scrollProgress = Math.min(scrollY / maxScroll, 1);

    // Blur (max 10px)
    const blurAmount = scrollProgress * 10;
    blurDiv.style.filter = `blur(${blurAmount}px)`;

    // Fade out (opacity decreases)
    blurDiv.style.opacity = 1 - scrollProgress;
  });

  const imageGrid = document.createElement("div");
  imageGrid.id = "imageGrid";
  page.appendChild(imageGrid);

  // Load JSON data
  fetch("titles.json")
    .then((response) => response.json())
    .then((data) => {
      const maxItems = 14; // Set the number of items
      for (let i = 0; i < maxItems; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-item");

        // Create video element for the grid
        const video = document.createElement("video");
        video.src = `imgTitre/${data[i].video}`;
        video.alt = `Image${i + 1}.mp4`;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        // Start videos paused
        video.pause();

        // Play video on hover
        video.addEventListener("mouseenter", () => {
          video.play();
        });

        // Pause video when hover ends
        video.addEventListener("mouseleave", () => {
          video.pause();
        });

        // Add title text
        const text = document.createElement("p");
        text.textContent = data[i] ? data[i].title : `Video ${i + 1}`;

        // Add click event to each video
        video.addEventListener("click", function () {
          // Show the page with the selected video
          page.style.display = "block";

          // Update the "page" with the clicked video's title and description
          projectVideo.src = video.src; // Set the selected video's source
          projectVideo.play(); // Ensure it starts playing
          projectTitle.textContent = data[i].title;
          projectDescription.textContent = data[i].description;
          keywords.textContent = data[i].keywords.join(" + ");

          // Pause the clicked video to prevent overlap with page video
          // video.pause();

          imageGrid.innerHTML = "";

          if (data[i].images && data[i].images.length > 0) {
            data[i].images.forEach((imgSrc) => {
              const img = document.createElement("img");
              img.src = imgSrc;
              img.classList.add("grid-image");
              img.addEventListener("click", () => {
                fullscreenImage.src = imgSrc;
                fullscreenOverlay.style.display = "flex";
              });
              imageGrid.appendChild(img);
            });

            imageGrid.style.display = "grid"; // Show the image grid
          } else {
            imageGrid.style.display = "none"; // Hide if no images available
          }
        });

        // Append video and title to the grid item
        div.appendChild(video);
        div.appendChild(text);
        grid.appendChild(div);
      }
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du JSON :", error)
    );

  // Close the "page" when clicking the close button
  closePageButton.addEventListener("click", function () {
    page.style.display = "none";
    projectVideo.pause(); // Pause the video when the page is closed
    imageGrid.style.display = "none"; // Masquer la grille d'images
  });

  // Remove any existing additional video first
  const existingAdditional = document.getElementById("additionalVideo");
  if (existingAdditional) {
    existingAdditional.remove();
  }

  // Check if the JSON object has videoAdditional
  if (data[i].videoAdditional) {
    const additionalVideo = document.createElement("video");
    additionalVideo.id = "additionalVideo";
    additionalVideo.controls = true;
    additionalVideo.loop = true;
    additionalVideo.muted = false;
    additionalVideo.autoplay = false;
    additionalVideo.playsInline = true;
    additionalVideo.style.width = "100%";
    additionalVideo.style.marginTop = "20px";

    additionalVideo.src = `imgTitre/${data[i].videoAdditional}`;

    // Append after pageContent
    pageContent.appendChild(additionalVideo);
  }

  // Create the fullscreen image overlay
  const fullscreenOverlay = document.createElement("div");
  fullscreenOverlay.id = "fullscreenOverlay";
  fullscreenOverlay.style.display = "none";
  document.body.appendChild(fullscreenOverlay);

  const fullscreenImage = document.createElement("img");
  fullscreenImage.id = "fullscreenImage";
  fullscreenOverlay.appendChild(fullscreenImage);

  const closeFullscreenBtn = document.createElement("button");
  closeFullscreenBtn.id = "closeFullscreenBtn";
  closeFullscreenBtn.textContent = "X";
  fullscreenOverlay.appendChild(closeFullscreenBtn);

  // Close fullscreen when button is clicked
  closeFullscreenBtn.addEventListener("click", () => {
    fullscreenOverlay.style.display = "none";
  });
});
