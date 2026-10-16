"use strict";

const API_KEY = "4ac6d379";
const API_URL = "https://www.omdbapi.com/";

const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieContainer = document.getElementById("movieContainer");

// Search button
searchBtn.addEventListener("click", searchMovie);

// Enter key
movieInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchMovie();
    }
});

// SEARCH MOVIES
async function searchMovie() {
    const movieName = movieInput.value.trim();

    if (movieName === "") {
        alert("Please enter a movie name");
        return;
    }

    movieContainer.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(
            `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`
        );

        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieContainer.innerHTML = "<p>Movie not found 😔</p>";
        }
    } catch (error) {
        console.error(error);
        movieContainer.innerHTML =
            "<p>Error occurred. Please try again.</p>";
    }
}

// DISPLAY MOVIES
async function displayMovies(movies) {
    movieContainer.innerHTML = "";

    for (const movie of movies) {
        let details = {};

        try {
            const response = await fetch(
                `${API_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
            );

            details = await response.json();
        } catch (error) {
            console.log("Details error:", error);
        }

        const rating =
            details.imdbRating && details.imdbRating !== "N/A"
                ? details.imdbRating
                : "N/A";
const poster =
    movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "https://placehold.co/300x450?text=No+Poster";

        const movieData = {
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: poster,
            rating: rating
        };

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
<img
    src="${poster}"
    alt="${movie.Title}"
    onerror="this.onerror=null; this.src='https://placehold.co/300x450?text=No+Poster';"
>            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <p>⭐ Rating: ${rating}</p>

            <button onclick='addToFavorites(${JSON.stringify(movieData)})'>
                ❤️ Add to Favorites
            </button>

            <button onclick='addToWatchlist(${JSON.stringify(movieData)})'>
                🔖 Add to Watchlist
            </button>

            <button onclick='showMoreDetails(${JSON.stringify(details)})'>
                📖 More Details
            </button>
        `;

        movieContainer.appendChild(card);
    }
}

// FAVORITES
function addToFavorites(movie) {
    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyAdded = favorites.some(
        item => item.imdbID === movie.imdbID
    );

    if (alreadyAdded) {
        alert("Movie already added to Favorites ❤️");
        return;
    }

    favorites.push(movie);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("Added to Favorites ❤️");
}

// WATCHLIST
function addToWatchlist(movie) {
    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    const alreadyAdded = watchlist.some(
        item => item.imdbID === movie.imdbID
    );

    if (alreadyAdded) {
        alert("Movie already in Watchlist 🔖");
        return;
    }

    watchlist.push(movie);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    alert("Added to Watchlist 🔖");
}

// SHOW FAVORITES
function showFavorites() {
    document.getElementById("feedbackSection").style.display = "none";
    document.querySelector(".search-box").style.display = "none";
    document.getElementById("movieContainer").style.display = "grid";

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        movieContainer.innerHTML =
            "<h2>No favorite movies yet ❤️</h2>";
        return;
    }

    displaySavedMovies(favorites, "favorites");
}

// SHOW WATCHLIST
function showWatchlist() {
    document.getElementById("feedbackSection").style.display = "none";
    document.querySelector(".search-box").style.display = "none";
    document.getElementById("movieContainer").style.display = "grid";

    const watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    if (watchlist.length === 0) {
        movieContainer.innerHTML =
            "<h2>No movies in your watchlist 🔖</h2>";
        return;
    }

    displaySavedMovies(watchlist, "watchlist");
}

// DISPLAY SAVED MOVIES
function displaySavedMovies(movies, type) {
    movieContainer.innerHTML = "";

    movies.forEach(movie => {
        const poster =
            movie.poster && movie.poster !== "N/A"
                ? movie.poster
                : "https://placehold.co/300x450?text=No+Poster";

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${poster}" alt="${movie.title}">

            <h2>${movie.title}</h2>

            <p>Year: ${movie.year}</p>

            <p>⭐ Rating: ${movie.rating}</p>

            <button onclick="removeSavedMovie('${movie.imdbID}', '${type}')">
                🗑️ Remove
            </button>
        `;

        movieContainer.appendChild(card);
    });
}  
// REMOVE SAVED MOVIE
function removeSavedMovie(imdbID, type) {
    const storageKey =
        type === "favorites" ? "favorites" : "watchlist";

    let movies =
        JSON.parse(localStorage.getItem(storageKey)) || [];

    movies = movies.filter(
        movie => movie.imdbID !== imdbID
    );

    localStorage.setItem(
        storageKey,
        JSON.stringify(movies)
    );

    if (type === "favorites") {
        showFavorites();
    } else {
        showWatchlist();
    }
}

// MORE DETAILS
function showMoreDetails(movie) {
    alert(
        "📖 MORE DETAILS\n\n" +
        "🎬 Director: " +
        (movie.Director || "N/A") +
        "\n\n👥 Actors: " +
        (movie.Actors || "N/A") +
        "\n\n🎭 Genre: " +
        (movie.Genre || "N/A") +
        "\n\n📝 Plot: " +
        (movie.Plot || "N/A")
    );
}

// EMAILJS
const PUBLIC_KEY = "n-w9r6fM21jo2BHes";
const SERVICE_ID = "service_uef4wgs";
const TEMPLATE_ID = "template_lalsfv1";

emailjs.init({
    publicKey: PUBLIC_KEY
});

const contactForm = document.getElementById("contactForm");
const status = document.getElementById("status");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        contactForm
    )
    .then(function () {
        status.textContent = "Message sent successfully! ✅";
        contactForm.reset();
    })
    .catch(function (error) {
        console.error(error);
        status.textContent = "Failed to send message. ❌";
    });
});
function logoutUser() {
    document.getElementById("movieSection").style.display = "none";
    document.getElementById("authSection").style.display = "block";

    showLogin();
}