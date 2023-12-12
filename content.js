// content.js

function markAsRead(element) {
  element.setAttribute("data-read", "true");
  saveReadUID(element.dataset.evOpening_uid); // Save the UID to localStorage
}

function isRead(element) {
  return element.getAttribute("data-read") === "true";
}

function hideElement(element) {
  element.style.display = "none";
}

function saveReadUID(uid) {
  const readUIDs = JSON.parse(localStorage.getItem("readUIDs")) || [];
  if (readUIDs.includes(uid)) {
    return;
  }
  readUIDs.push(uid);
  localStorage.setItem("readUIDs", JSON.stringify(readUIDs));
}

function processElements() {
  const elements = document.querySelectorAll("[data-ev-opening_uid]");

  elements.forEach((element) => {
    const uid = element.dataset.evOpening_uid;
    if (!isRead(element)) {
      element.addEventListener("mouseover", () => {
        markAsRead(element);
        console.log(element);
      });
    } else {
      hideElement(element);
    }

    // Check if the UID is in localStorage and hide the element if necessary
    const readUIDs = JSON.parse(localStorage.getItem("readUIDs")) || [];
    if (readUIDs.includes(uid)) {
      hideElement(element);
    }
  });
}

// Wait for the page to load before processing elements
window.addEventListener("load", () => {
  processElements();
});
