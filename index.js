const authorDiv = document.getElementById("author-div");

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.urls.regular);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    const authorName = document.createElement("p");
    authorName.textContent = `By: ${data.user.name}`;
    authorDiv.appendChild(authorName);
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1448518340475-e3c680e9b4be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ5ODQ5MTF8&ixlib=rb-4.0.3&q=80&w=1080")`;
    const authorName = document.createElement("p");
    authorName.textContent = `By: ${data.user.name}`;
    authorDiv.appendChild(authorName);
  });
