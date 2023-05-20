const initializeThemeToggle = () => {
  const toggleTheme = document.querySelector("#theme-toggle");
  const body = document.querySelector("body");

  toggleTheme.addEventListener("click", () => {

    console.log("Theme toggle clicked");
    body.classList.toggle("dark");
  });
};

export default initializeThemeToggle;
