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

  const imageGrid = document.createElement("div");
  imageGrid.id = "imageGrid";
  page.appendChild(imageGrid);

  // Load JSON data
  fetch("titles.json")
    .then((response) => response.json())
    .then((data) => {
      const maxItems = 13; // Set the number of items
      for (let i = 0; i < maxItems; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-item");

        // Create video element for the grid
        const video = document.createElement("video");
        video.src = `imgTitre/Image${i + 1}.mp4`; // Path to your videos
        video.alt = `Image${i + 1}.mp4`;
        video.autoplay = true; // Enable autoplay for looping
        video.loop = true; // Keep the video on loop
        video.muted = true; // Mute the video for background play
        video.playsInline = true; // Ensure it plays inline on mobile

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
          keywords.textContent = data[i].keywords.join(" / ");

          // Pause the clicked video to prevent overlap with page video
          // video.pause();

          imageGrid.innerHTML = "";
          if (data[i].images && data[i].images.length >= 4) {
            data[i].images.slice(0, 4).forEach((imgSrc) => {
              const img = document.createElement("img");
              img.src = imgSrc;
              img.classList.add("grid-image");
              imageGrid.appendChild(img);
            });
            imageGrid.style.display = "grid"; // Afficher la grille
          }
          // else {
          //   imageGrid.style.display = "none"; // Masquer si pas d'images
          // }
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
});
