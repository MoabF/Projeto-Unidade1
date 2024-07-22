const loginElement = document.getElementById("login");
const loggedinElement = document.getElementById("loggedin");

document.addEventListener("DOMContentLoaded", () => {
  const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("userEmail");

  if (userId) {
    loginElement.hidden = true;
    loggedinElement.style.display = "flex";
    loggedinElement.firstElementChild.textContent += `Email: ${userEmail}`;
    loggedinElement.children[1].addEventListener("click", () => {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userEmail");
      location.reload();
    });
  }
});
