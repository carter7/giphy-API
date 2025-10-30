// script.js
// Author: Christian Carter
// Description: Fetches and displays GIFs from Giphy API using async/await.

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-term");

// Replace this with your own Giphy API key
const API_KEY = "YOUR_API_KEY_HERE";

// Fetch GIFs based on user input
async function fetchGifs(searchTerm = "funny") {
    try {
        gifContainer.innerHTML = "<p>Loading...</p>";

        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=9&rating=g`;

        const response = await fetch(endpoint);
        const data = await response.json();

        gifContainer.innerHTML = ""; // clear previous GIFs

        const gifs = data.data;

        if (gifs.length === 0) {
            gifContainer.innerHTML = "<p>No GIFs found!</p>";
            return;
        }

        gifs.forEach(gif => {
            const imageUrl = gif.images.original.url;
            gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3 rounded shadow-sm">`;
        });

    } catch (error) {
        console.error("Error fetching GIFs:", error);
        gifContainer.innerHTML = "<p>Something went wrong. Try again!</p>";
    }
}

// Button event listener
fetchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    fetchGifs(searchTerm || "funny");
});
