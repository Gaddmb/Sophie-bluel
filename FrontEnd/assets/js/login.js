//** Partie Login  */
const btnConnection = document.querySelector("#btn-connection");
const login = async (data) => {
  const user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  return await fetch("http://localhost:5678/api/users/login", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

btnConnection.addEventListener("click", async function (event) {
  // bloque le comportement par defaut du navigateur 
  event.preventDefault();
  const response = await login();
  const user = await response.json();
  if (response.status === 200) {
    sessionStorage.setItem("token", user.token);
    return window.location.assign("./index.html");
  }
  if (response.status === 401 || response.status === 404) {
    const messageError = document.querySelector(".error-msg")
    messageError.textContent = "Username or password invalid"    
  }
});
