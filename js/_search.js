document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");

  searchToggle.addEventListener("click", () => {
    if (searchBar.style.width === "0px" || !searchBar.style.width) {
      searchBar.style.width = "220px";
      searchInput.focus();
    } else {
      searchBar.style.width = "0px";
      searchInput.value = "";
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const searchTerm = searchInput.value.toLowerCase();
      if (!searchTerm) return;

      const previousHighlights = document.querySelectorAll(".highlight");
      previousHighlights.forEach(el => el.outerHTML = el.innerHTML);

      const elements = document.querySelectorAll("p, div, span, h1, h2, h3, h4, h5, h6, li");
      let found = false;

      elements.forEach(el => {
        const regex = new RegExp(searchTerm, "gi");
        if (el.textContent.toLowerCase().includes(searchTerm)) {
          el.innerHTML = el.innerHTML.replace(
            regex,
            match => `<span class="highlight">${match}</span>`
          );
          found = true;
        }
      });

      if (found) {
        const firstHighlight = document.querySelector(".highlight");
        if (firstHighlight) {
          firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        alert("Совпадений не найдено.");
      }
    }
  });
});