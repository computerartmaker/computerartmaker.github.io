document.addEventListener("DOMContentLoaded", function () {
  const infoNavLink = document.getElementById("info");
  const modalContainer = document.getElementById("modal-container");
  const closeModalBtn = document.getElementById("close-modal");

  infoNavLink.addEventListener("click", function (event) {
    event.preventDefault();
    modalContainer.style.display = "flex";
    document.addEventListener("keydown", handleEscKeyPress);
    modalContainer.addEventListener("click", handleOutsideModalClick);
  });

  closeModalBtn.addEventListener("click", closeModal);

  function closeModal() {
    modalContainer.style.display = "none";
    document.removeEventListener("keydown", handleEscKeyPress);
    modalContainer.removeEventListener("click", handleOutsideModalClick);
  }

  function handleEscKeyPress(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

  function handleOutsideModalClick(event) {
    if (event.target === modalContainer) {
      closeModal();
    }
  }
});
