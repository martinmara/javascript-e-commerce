function showMenu() {
  const links = document.getElementById("links");
  if (links.style.display === "none" || links.style.display === "") {
    links.style.display = "block";
  } else {
    links.style.display = "none";
  }
}
