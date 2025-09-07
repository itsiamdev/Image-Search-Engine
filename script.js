const accessKey = "52175434-5023b49d95a6128c7e81d8a15";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

// 🔍 Funcție pentru căutarea imaginilor
async function searchImages() {
  keyword = searchBox.value.trim();
  if (!keyword) return;

  // URL Pixabay cu parametri dinamici
  const url = `https://pixabay.com/api/?key=${accessKey}&q=${encodeURIComponent(
    keyword
  )}&image_type=photo&per_page=9&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Dacă suntem pe prima pagină, ștergem rezultatele anterioare
    if (page === 1) {
      searchResult.innerHTML = "";
    }

    // Generăm carduri cu imagini
    if (data.hits.length > 0) {
      data.hits.forEach((hit) => {
        const img = document.createElement("img");
        img.src = hit.webformatURL;
        img.alt = hit.tags;

        const link = document.createElement("a");
        link.href = hit.largeImageURL;
        link.target = "_blank";
        link.appendChild(img);

        searchResult.appendChild(link);
      });

      // Afișăm butonul "Arată mai multe" doar dacă există rezultate
      showMoreBtn.style.display = "block";
    } else {
      if (page === 1) {
        searchResult.innerHTML = "<p>Nicio imagine găsită!</p>";
      }
      showMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Eroare la încărcarea imaginilor:", error);
    if (page === 1) {
      searchResult.innerHTML = "<p>A apărut o eroare. Încearcă din nou.</p>";
    }
    showMoreBtn.style.display = "none";
  }
}

// 🚀 Eveniment pentru căutare
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1; // resetăm pagina la prima
  searchImages();
});

// ➕ Eveniment pentru a încărca mai multe imagini
showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
