// Load header and footer
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;

    // Initialize mobile menu after loading header
    if (elementId === "header") {
      initMobileMenu();
    }
  } catch (error) {
    console.error(`Error loading ${componentPath}:`, error);
  }
}

// Mobile menu functionality
function initMobileMenu() {
  const menuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      menuButton.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("active");
        menuButton.classList.remove("active");
      }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuButton.classList.remove("active");
      });
    });
  }
}

// Load JSON data
async function loadJSONData(path) {
  try {
    const response = await fetch(path);
    return await response.json();
  } catch (error) {
    console.error(`Error loading JSON from ${path}:`, error);
    return null;
  }
}

// Update copyright year
function updateCopyrightYear() {
  const yearElement = document.querySelector(".copyright-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize all common functionality
document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");

  // Update copyright year
  updateCopyrightYear();
});
