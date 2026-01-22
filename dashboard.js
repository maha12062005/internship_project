function goTo(page) {
  window.location.href = page;
}

function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
}

