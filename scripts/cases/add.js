const webUrl = "https://buffete-api-strapi.herokuapp.com/api";

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

window.addEventListener("load", async () => {
    const lawyers = await fetch(`${webUrl}/users`).then(res => res.json());
    const optionSelect = createElement('option', 'Selecciona un abogado disponible', { value: '' });
    lawyerField.appendChild(optionSelect);
    lawyers.forEach((lawyer) => {
        const option = createElement('option', lawyer.username, { value: lawyer.id });
        lawyerField.appendChild(option);
    });

    const clients = await fetch(`${webUrl}/clients`).then(res => res.json());
    const optionSelectClient = createElement('option', 'Selecciona un cliente disponible', { value: '' });
    clientField.appendChild(optionSelectClient);
    clients.data.forEach(({ attributes: client, id }) => {
        const option = createElement('option', `${client.username} ${client.lastname}`, { value: id });
        clientField.appendChild(option);
    });
});

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener("click", () => {
    window.location.href = "./dashboard.html";
});

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        title: titleField.value,
        description: descriptionField.value,
        type: typeField.value,
        status: statusField.value,
        lawyer: lawyerField.value,
        client: clientField.value
    };

    const response = await fetch(`${webUrl}/cases`, {
        method: 'POST',
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