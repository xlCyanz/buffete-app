const webUrl = "https://buffete-api-strapi.herokuapp.com";

window.addEventListener("load", async () => {
    const token = window.localStorage.getItem("token");
    const url = `${webUrl}/api/users/me`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());

    if (response.data === null) {
        window.localStorage.removeItem("token");
        window.location.href = "./index.html";
    }
});