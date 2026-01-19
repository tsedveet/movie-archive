const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id"));
const container = document.getElementById("movie");

fetch("data/movies.json")
  .then(res => res.json())
  .then(movies => {
    const movie = movies.find(m => m.id === movieId);

    const seasonsContainer = document.getElementById("seasons");

if (movie.seasons && movie.seasons.length) {
  seasonsContainer.innerHTML = `
  <h2 class="season-title">Seasons</h2>
  ${movie.seasons
    .map(
      s => `
      <div class="season">
        <button class="season-header">
          Season ${s.season}
          <span class="chevron">⌄</span>
        </button>

        <div class="season-content">
          <ul>
            ${s.episodes
              .map(
                e => `
                <li class="episode">
                  <span>E${e.episode} · ${e.title}</span>
                  <a href="${e.watch}" target="_blank" class="episode-btn">
                    ▶ Үзэх
                  </a>
                </li>
              `
              )
              .join("")}
          </ul>
        </div>
      </div>
    `
    )
    .join("")}
`;

// 🔥 🔥 🔥 ЭНД Л АСУУДАЛ БАЙСАН
initAccordion();
}

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

  document.querySelectorAll(".season-header").forEach(header => {
  header.addEventListener("click", () => {
    const season = header.parentElement;

    // 🔥 OPTIONAL: бусад season-уудыг хаах
    document.querySelectorAll(".season").forEach(s => {
      if (s !== season) s.classList.remove("open");
    });

    season.classList.toggle("open");
  });
});
function initAccordion() {
  document.querySelectorAll(".season-header").forEach(header => {
    header.addEventListener("click", () => {
      const season = header.parentElement;
      const content = season.querySelector(".season-content");

      const isOpen = season.classList.contains("open");

      // Бусдыг хаах (Netflix style)
      document.querySelectorAll(".season").forEach(s => {
        s.classList.remove("open");
        s.querySelector(".season-content").style.maxHeight = null;
      });

      if (!isOpen) {
        season.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}
