const initializeThemeToggle = () => {
  const toggleTheme = document.querySelector("#theme-toggle");
  const body = document.querySelector("body");


  // get the current theme from local storage if it exists
  const currentTheme = localStorage.getItem("theme");
  
  // if the current theme in local storage is dark...
  if (currentTheme === "dark") {
    // ...then toggle the .dark class on the body
    body.classList.toggle("dark");
  }

  // if the clients browser has a preference for dark mode and is not saved in local storage...
  if (window.matchMedia("(prefers-color-scheme: dark)").matches && !currentTheme) {
    // ...then toggle the .dark class on the body
    body.classList.toggle("dark");
  }

  toggleTheme.addEventListener("click", () => {
    body.classList.toggle("dark");
    // if the body has the class dark...
    if (body.classList.contains("dark")) {
      // ...then set the theme in local storage to dark
      localStorage.setItem("theme", "dark");
    } else {
      // ...otherwise set the theme in local storage to light
      localStorage.setItem("theme", "light");
    }
  });
};

initializeThemeToggle();
