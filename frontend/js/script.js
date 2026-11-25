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
  const sortSelect = document.getElementById("sortSelect");
  const productGrid = document.getElementById("productGrid");

  const originalProductOrder = Array.from(productCards);
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

    // Marketplace: Product sorting
    function sortProducts() {
      const sortValue = sortSelect.value;
      const sortedProducts = [...originalProductOrder];

      if (sortValue === "low-high") {
        sortedProducts.sort(function (a, b) {
          const priceA = a.dataset.price;
          const priceB = b.dataset.price;

          if (priceA === "") return 1;
          if (priceB === "") return -1;

          return Number(priceA) - Number(priceB);
        });
      } else if (sortValue === "high-low") {
        sortedProducts.sort(function (a, b) {
          const priceA = a.dataset.price;
          const priceB = b.dataset.price;

          if (priceA === "") return 1;
          if (priceB === "") return -1;

          return Number(priceB) - Number(priceA);
        });
      }

      sortedProducts.forEach(function (card) {
        productGrid.appendChild(card);
      });

      filterProducts();
    }

    if (sortSelect && productGrid) {
      sortSelect.addEventListener("change", sortProducts);
    }

    filterProducts();
  }

  // Product Details: Save selected product from Marketplace
  const productLinks = document.querySelectorAll(
    ".product-card .product-title-link",
  );

  productLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const card = link.closest(".product-card");

      const product = {
        id: new URL(link.href).searchParams.get("product"),
        name: link.textContent.trim(),
        image: card.querySelector(".product-image")?.textContent.trim() || "",
        mode: card.querySelector(".product-mode")?.textContent.trim() || "",
        price: card.querySelector(".product-price")?.textContent.trim() || "",
        condition:
          card.querySelector(".product-condition")?.textContent.trim() || "",
        location:
          card.querySelector(".product-location")?.textContent.trim() || "",
        seller: card.querySelector(".seller-name")?.textContent.trim() || "",
      };

      localStorage.setItem("relifeSelectedProduct", JSON.stringify(product));
    });
  });

  // Product Details: Display selected product
  const detailName = document.getElementById("detailName");

  if (detailName) {
    const savedProduct = localStorage.getItem("relifeSelectedProduct");
    const productId = new URLSearchParams(window.location.search).get(
      "product",
    );

    if (savedProduct) {
      const product = JSON.parse(savedProduct);

      if (product.id === productId) {
        document.getElementById("detailImage").textContent = product.image;
        detailName.textContent = product.name;
        document.getElementById("detailMode").textContent = product.mode;
        document.getElementById("detailPrice").textContent = product.price;
        document.getElementById("detailCondition").textContent =
          product.condition;
        document.getElementById("detailLocation").textContent =
          product.location;
        document.getElementById("detailSeller").textContent = product.seller;

        document.getElementById("detailDescription").textContent =
          "Contact the owner for more information about this item.";
      }
    }
  }
});
