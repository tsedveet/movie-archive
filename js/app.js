let allMovies = [];

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre");
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let filteredMovies = [];

fetch("data/movies.json")
  .then((res) => res.json())
  .then((data) => {
    // 🔥 ЭНЭ Л ХАМГИЙН ЧУХАЛ МӨР
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    allMovies = data;
    filteredMovies = data;

    setupGenres(data);
    render(); // зөвхөн ЭНЭ
  });

function setupGenres(movies) {
  const genres = new Set();

  movies.forEach((movie) => {
    movie.genre.forEach((g) => genres.add(g));
  });

  genres.forEach((g) => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g;
    genreSelect.appendChild(option);
  });
}

function render() {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = filteredMovies.slice(start, end);

  renderMovies(pageItems);
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  const prev = document.createElement("button");
  prev.textContent = "← Өмнөх";
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    render();
  };
  container.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      render();
    };
    container.appendChild(btn);
  }

  const next = document.createElement("button");
  next.textContent = "Дараах →";
  next.disabled = currentPage === totalPages;
  next.onclick = () => {
    currentPage++;
    render();
  };
  container.appendChild(next);
}

function renderMovies(list) {
  moviesContainer.innerHTML = "";

  list.forEach((movie) => {
    const card = document.createElement("a");
    card.className = "movie-card";
    card.href = `movie.html?id=${movie.id}`;

    card.innerHTML = `
      <img src="${movie.poster}" loading="lazy" />
      <div class="info">
        <h3>${movie.title}</h3>
        <div class="meta">${movie.year} · ${movie.genre.join(", ")}</div>
        
        
      </div>
    `;

    moviesContainer.appendChild(card);
  });
}

function filterMovies() {
  const search = searchInput.value.toLowerCase();
  const genre = genreSelect.value;

  filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search),
  );

  if (genre !== "all") {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.includes(genre),
    );
  }

  currentPage = 1; // filter солигдоход page reset
  render();
}

searchInput.addEventListener("input", filterMovies);
genreSelect.addEventListener("change", filterMovies);
