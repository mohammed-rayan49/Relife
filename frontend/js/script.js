document.addEventListener("DOMContentLoaded", function () {
  // Registration: Organization Name field
  const accountType = document.getElementById("accountType");
  const organizationGroup = document.getElementById("organizationGroup");
  const organizationName = document.getElementById("organizationName");

  if (accountType && organizationGroup && organizationName) {
    accountType.addEventListener("change", function () {
      if (accountType.value === "organization") {
        organizationGroup.style.display = "block";
        organizationName.required = true;
      } else {
        organizationGroup.style.display = "none";
        organizationName.required = false;
        organizationName.value = "";
      }
    });
  }

  // Marketplace: Search and category filters
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const categoryButtons = document.querySelectorAll(".category-filter");
  const productCards = document.querySelectorAll(".product-card");
  const noProductsMessage = document.getElementById("noProductsMessage");

  if (searchInput && searchButton && productCards.length > 0) {
    const urlParams = new URLSearchParams(window.location.search);
    let selectedCategory = urlParams.get("category") || "all";
    categoryButtons.forEach(function (button) {
      if (button.dataset.category === selectedCategory) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    function filterProducts() {
      const searchText = searchInput.value.toLowerCase().trim();
      let visibleProducts = 0;

      productCards.forEach(function (card) {
        const productName = card.querySelector("h3").textContent.toLowerCase();

        const description =
          card.querySelector("p")?.textContent.toLowerCase() || "";

        const category = card.dataset.category.toLowerCase();

        const matchesSearch =
          productName.includes(searchText) ||
          description.includes(searchText) ||
          category.includes(searchText);

        const matchesCategory =
          selectedCategory === "all" || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
          card.style.display = "";
          visibleProducts++;
        } else {
          card.style.display = "none";
        }
      });

      if (noProductsMessage) {
        noProductsMessage.hidden = visibleProducts !== 0;
      }
    }

    searchButton.addEventListener("click", filterProducts);

    searchInput.addEventListener("input", filterProducts);

    categoryButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        categoryButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        filterProducts();
      });
    });
    filterProducts();
  }
});
