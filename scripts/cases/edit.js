const webUrl = "https://buffete-api-strapi.herokuapp.com/api";
const id = window.location.search.split('=')[1];

const titleField = document.getElementById('title-field');
const descriptionField = document.getElementById('desc-field');
const typeField = document.getElementById('type-field');
const statusField = document.getElementById('status-field');

const lawyerField = document.getElementById('lawyer-field');
const clientField = document.getElementById('client-field');

const createElement = (element, children, attributes) => {
    const newElement = document.createElement(element);
    if (attributes)
        Object.entries(attributes).forEach(([key, value]) => newElement.setAttribute(key, value));
    if (children)
        newElement.innerText = children;
    return newElement;
};

window.addEventListener('load', async () => {
    const response = await fetch(`${webUrl}/cases/${id}?populate=*`).then((res) => res.json());
    const cases = response.data.attributes;

    titleField.value = cases.title;
    descriptionField.value = cases.description;
    typeField.value = cases.type;
    statusField.value = cases.status;
    lawyerField.value = cases.lawyer.data.attributes.username;
    clientField.value = `${cases.client.data.attributes.username} ${cases.client.data.attributes.lastname}`;
});

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener("click", () => {
    window.location.href = "/";
});

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        title: titleField.value,
        description: descriptionField.value,
        type: typeField.value,
        status: statusField.value,
    };

    const response = await fetch(`${webUrl}/cases/${id}`, {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: body }),
    }).then((res) => res.json());

    if(response.data !== null) {
        window.location.href = '../dashboard.html';
    } 
});