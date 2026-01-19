const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id"));
const container = document.getElementById("movie");

fetch("data/movies.json")
  .then(res => res.json())
  .then(movies => {
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
      container.innerHTML = "<p>Movie not found</p>";
      return;
    }

    container.innerHTML = `
  <div class="detail-layout">
    <img src="${movie.poster}" class="detail-poster" />

    <div class="detail-info">
      <h1>${movie.title}</h1>
      <p class="meta">${movie.year} · ${movie.genre.join(", ")}</p>
      <p>${movie.description}</p>

      ${
        movie.trailer
          ? `<a
               href="${movie.trailer}"
               target="_blank"
               class="detail-trailer-btn">
               ▶ Кино үзэх
             </a>`
          : ``
      }
    </div>
  </div>
`;
  });

  