export function showMessage(msg, type = "success") {
  const box = document.getElementById("message");

  box.textContent = msg;
  box.className = ""; // reset
  box.classList.add(type);
  box.classList.add("show");

  setTimeout(() => {
    box.classList.remove("show");
  }, 3000);
}

export function showLoading(isLoading) {
  document.body.style.opacity = isLoading ? 0.6 : 1;
}