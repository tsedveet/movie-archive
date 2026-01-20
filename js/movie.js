const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id"));
const container = document.getElementById("movie");

fetch("data/movies.json")
  .then((res) => res.json())
  .then((movies) => {
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
      container.innerHTML = "<p>Movie not found</p>";
      return;
    }

    // 1️⃣ Movie main layout
    container.innerHTML = `
      <div class="detail-layout">
        <img src="${movie.poster}" class="detail-poster" />

        <div class="detail-info">
          <h1>${movie.title}</h1>
          <p class="meta">${movie.year} · ${movie.genre.join(", ")}</p>
          <p>${movie.description}</p>

          <div class="detail-actions">
            <div class="detail-actions">
                ${movie.price ? `<span class="price-badge">Үнэ: ${movie.price}</span>` : ``}
            </div>

            ${movie.trailer ? `<a href="${movie.trailer}" target="_blank" class="detail-trailer-btn"> ▶ Трейлер үзэх </a>` : ``}

            ${movie.watch ? `<a href="${movie.watch}" target="_blank" class="detail-trailer-btn primary"> ▶ Кино үзэх </a>` : ``}
  
          </div>

          ${movie.explain ? `<p>${movie.explain}</p>` : ``}
          
          ${movie.telegram_address ? `<a href="${movie.telegram_address}" target="_blank" class="detail-trailer-btn primary"> ▶ Telegram дагах </a>` : ``}

          <div id="seasons" class="seasons-block"></div>
          
        </div>
      </div>
    `;

    // 2️⃣ Seasons render
    const seasonsContainer = document.getElementById("seasons");

    if (movie.seasons && movie.seasons.length) {
      seasonsContainer.innerHTML = `
        <h2 class="season-title">Seasons</h2>
        ${movie.seasons
          .map(
            (s) => `
            <div class="season">
              <button class="season-header">
                Season ${s.season}
                <span class="chevron">⌄</span>
              </button>

              <div class="season-content">
                <ul>
                  ${s.episodes
                    .map(
                      (e) => `
                      <li class="episode">
                        <span>E${e.episode} · ${e.title}</span>
                        <a href="${e.watch}" target="_blank" class="episode-btn">
                          ▶ Үзэх
                        </a>
                      </li>
                    `,
                    )
                    .join("")}
                </ul>
              </div>
            </div>
          `,
          )
          .join("")}
      `;

      initAccordion(); // 🔥 зөв байрлал
    }
  });

function initAccordion() {
  document.querySelectorAll(".season-header").forEach((header) => {
    header.addEventListener("click", () => {
      const season = header.parentElement;
      const content = season.querySelector(".season-content");

      const isOpen = season.classList.contains("open");

      document.querySelectorAll(".season").forEach((s) => {
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
