const favoritesContainer =
    document.getElementById("favoritesContainer");

function displayFavorites() {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {

        favoritesContainer.innerHTML =
            "<p>You haven't added any favorite movies yet. ❤️</p>";

        return;
    }

    favoritesContainer.innerHTML = "";

    favorites.forEach(movie => {

        favoritesContainer.innerHTML += `
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
                        onclick="removeFavorite('${movie.id}')">
                        🗑️ Remove
                    </button>

                </div>

            </div>
        `;
    });
}


function removeFavorite(id) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites =
        favorites.filter(movie => movie.id !== id);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    displayFavorites();
}


displayFavorites();