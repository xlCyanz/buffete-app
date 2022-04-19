const form = document.querySelector("form");
const webUrl = "https://buffete-api-strapi.herokuapp.com/api";

window.addEventListener("load", async () => {
    const token = window.localStorage.getItem("token");

    if (token) {
        window.location.href = "./dashboard.html";
    };
});

const Login = async ({ email, password }) => {
    const url = `${webUrl}/auth/local`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identifier: email,
            password,
        }),
    }).then((res) => res.json());

    return response;
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email-address").value;
    const password = document.getElementById("password").value;

    const data = await Login({ email, password });

    window.localStorage.setItem("token", data.jwt);
    window.location.reload();
});
