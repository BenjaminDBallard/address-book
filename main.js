let arrayOfUsers = [];

const api_url = "https://randomuser.me/api/";

function awaitAll(count, asyncFn) {
  const promises = [];

  for (i = 0; i < count; ++i) {
    promises.push(asyncFn());
  }

  return Promise.all(promises);
}

const getUser = () => {
  fetch(api_url)
    .then((res) => res.json())
    .then((user) => arrayOfUsers.push(user.results[0]));
};

const consolePosts = () => {
  console.log(arrayOfUsers);
};

function compareLast(a, b) {
  if (a.name.last < b.name.last) {
    return -1;
  }
  if (a.name.last > b.name.last) {
    return 1;
  }
  return 0;
}
function compareFirst(a, b) {
  if (a.name.first < b.name.first) {
    return -1;
  }
  if (a.name.first > b.name.first) {
    return 1;
  }
  return 0;
}

function info() {
  element = this.parentElement.lastChild;
  if (element.classList.contains("hiddenInfo")) {
    element.classList.remove("hiddenInfo");
  } else {
    element.classList.add("hiddenInfo");
  }
}

const displayPost = (compare) => {
  const allUsers = document.getElementById("all-posts");
  allUsers.innerHTML = "";
  arrayOfUsers.sort(compare);
  arrayOfUsers.map((user) => {
    const li = document.createElement("li");
    const photo = document.createElement("img");
    const btn = document.createElement("button");
    const infoText = document.createElement("p");
    infoText.innerHTML = `${user.email}<br> ${user.phone}<br> ${user.location.country}`;
    infoText.classList.add("hiddenInfo");
    btn.innerHTML = "info";
    btn.onclick = info;
    photo.src = user.picture.medium;
    const text = document.createTextNode(
      `${user.name.title}. ${user.name.first} ${user.name.last}`
    );
    li.appendChild(photo);
    li.appendChild(text);
    li.appendChild(btn);
    li.appendChild(infoText);
    allUsers.append(li);
  });
};

window.onload = function () {
  awaitAll(20, getUser)
    .then(displayPost())
    .catch((e) => console.error(e));
};
