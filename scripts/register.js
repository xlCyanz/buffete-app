const form = document.querySelector("form");
const webUrl = "https://buffete-api-strapi.herokuapp.com/api";

window.addEventListener("load", async () => {
    const token = window.localStorage.getItem("token");

    if (token) {
        window.location.href = "./dashboard.html";
    };
});

const Register = async ({ username, email, password }) => {
    const url = `${webUrl}/auth/local/register`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    }).then((res) => res.json());

    return response;
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email-address").value;
    const password = document.getElementById("password").value;

    const data = await Register({ username, email, password });

    window.localStorage.setItem("token", data.jwt);
    window.location.reload();
});
