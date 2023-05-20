const initializeThemeToggle = () => {
  const toggleTheme = document.querySelector("#theme-toggle");
  const body = document.querySelector("body");

  toggleTheme.addEventListener("click", () => {
    body.classList.toggle("dark");
  });
};

export default initializeThemeToggle;
