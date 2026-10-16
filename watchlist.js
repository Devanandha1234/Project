const watchlistContainer =
    document.getElementById("watchlistContainer");

function displayWatchlist() {

    const watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    if (watchlist.length === 0) {

        watchlistContainer.innerHTML =
            "<p>Your watchlist is empty. 🔖</p>";

        return;
    }

    watchlistContainer.innerHTML = "";

    watchlist.forEach(movie => {

        watchlistContainer.innerHTML += `
            <div class="movie-card">

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                    onerror="this.src='https://placehold.co/300x450?text=No+Poster'"
                >

                <div class="movie-info">
                   <h2>${movie.title}</h2>
                   <p>📅 Year: ${movie.year}</p>
                   <p>⭐ IMDb Rating: ${movie.rating}</p>

                    <button
                        class="remove-btn"
                        onclick="removeWatchlist('${movie.id}')">
                        🗑️ Remove
                    </button>

                </div>

            </div>
        `;
    });
}


function removeWatchlist(id) {

    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    watchlist =
        watchlist.filter(movie => movie.id !== id);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    displayWatchlist();
}


displayWatchlist();