const btnConnection = document.querySelector("#btn-connection");

const login = async (data) => {
  const user = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  return await fetch("http://localhost:5678/api/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

btnConnection.addEventListener("submit", async function (event) {
  event.preventDefault();

  const response = await login(data);
  const user = await response.json();

  if (response.status === 200) {
    sessionStorage.setItem("token", user);
    return window.location.assign("./index.html");
  }
  if (response.status === 401 || response.status === 404) {
  }
});
