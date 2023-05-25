const authorDiv = document.getElementById("author-div");

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    const authorName = document.createElement("p");
    authorName.textContent = `By: ${data.user.name}`;
    authorDiv.appendChild(authorName);
  });
