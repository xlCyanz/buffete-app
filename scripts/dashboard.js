const body = document.getElementsByTagName("body")[0];
const webUrl = "https://buffete-api-strapi.herokuapp.com/api";

document.getElementById("logOutButton").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
});

const createElement = (element, children, attributes) => {
    const newElement = document.createElement(element);
    if (attributes)
        Object.entries(attributes).forEach(([key, value]) => newElement.setAttribute(key, value));
    if (children)
        newElement.innerText = children;
    return newElement;
};

const getClients = async (token) => {
    const { data } = await fetch(`${webUrl}/clients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());

    return data;
};

const insertClientsToTable = (clients) => {
    const clientsTbody = document.getElementById("clients-tbody");

    clients.forEach(({ attributes: client, id }) => {
        const tr = createElement("tr", null, { class: "bg-white table-row flex-row flex-wrap flex-no-wrap mb-0", id: `client-${id}` });

        const tdClass = "w-auto p-3 text-gray-800 text-center border border-b table-cell static";
        const tdUsername = createElement("td", `${client.username} ${client.lastname}`, { class: `${tdClass} font-bold` });
        const tdEmail = createElement("td", client.email, { class: tdClass });
        const tdNic = createElement("td", client.nic, { class: tdClass });
        const tdPhoneNumber = createElement("td", client.phone_number, { class: tdClass });
        const tdMobileNumber = createElement("td", client.mobile_number, { class: tdClass });
        const tdAddress = createElement("td", client.address, { class: tdClass });
        const tdStatusCivil = createElement("td", client.status_civil, { class: tdClass });

        const tdActions = createElement("td", null, { class: "flex flex-col px-3 text-gray-800 text-center border border-b table-cell static" });
        
        const editLink = createElement("a", "Edit", { class: "flex text-blue-400 hover:text-blue-600 underline", href: `/client/edit.html?id=${id}` });
        tdActions.appendChild(editLink);

        const deleteButton = createElement("button", "Delete", { class: "flex text-blue-400 hover:text-blue-600 underline" });
        deleteButton.addEventListener("click", async () => {
            await fetch(`${webUrl}/clients/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(() => {
                const clientRow = document.getElementById(`client-${id}`);
                clientRow.remove();
            });
        });
        tdActions.appendChild(deleteButton);

        tr.append(tdUsername, tdEmail, tdNic, tdPhoneNumber, tdMobileNumber, tdAddress, tdStatusCivil, tdActions);
        clientsTbody.append(tr);
    });
};

const getCases = async (token) => {
    const { data } = await fetch(`${webUrl}/cases?populate=*`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());

    return data;
};

const insertCasesToTable = (cases) => {
    const casesTbody = document.getElementById("cases-tbody");

    cases.forEach(({ attributes: caseData, id }) => {
        const tr = createElement("tr", null, { class: "bg-white table-row flex-row flex-wrap flex-no-wrap mb-0", id: `caseData-${id}` });

        const tdClass = "w-auto p-3 text-gray-800 text-center border border-b table-cell static";
        const tdTitle = createElement("td", caseData.title, { class: `${tdClass} font-bold` });
        const tdDescription = createElement("td", caseData.description, { class: tdClass });
        const tdStatus = createElement("td", caseData.status, { class: tdClass });
        const tdClient = createElement("td", caseData.client.data.attributes?.username || "No asignado", { class: tdClass });
        const tdLawyer = createElement("td", caseData?.lawyer?.username || "No asignado", { class: tdClass });

        const tdActions = createElement("td", null, { class: "flex flex-col pl-3 text-gray-800 text-center border border-b table-cell static" });
        
        const editLink = createElement("a", "Edit", { class: "flex text-blue-400 hover:text-blue-600 underline", href: `/cases/edit.html?id=${id}` });
        tdActions.appendChild(editLink);

        const downloadReport = createElement("button", "Descargar reporte", { class: "flex text-blue-400 hover:text-blue-600 underline" });
        tdActions.appendChild(downloadReport);

        const deleteButton = createElement("button", "Delete", { class: "flex text-blue-400 hover:text-blue-600 underline" });
        tdActions.appendChild(deleteButton);

        tr.append(tdTitle, tdDescription, tdStatus, tdClient, tdLawyer, tdActions);
        casesTbody.append(tr);
    });
};

window.addEventListener("load", async () => {
    body.hidden = true;

    const token = window.localStorage.getItem("token");

    const response = await fetch(`${webUrl}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());

    if (response.data === null) {
        window.localStorage.removeItem("token");
        window.location.href = "./index.html";
    } else {
        body.hidden = false;

        const userName = document.getElementById("dashboard-username");
        userName.innerText = response.username;

        const clients = await getClients(token);
        insertClientsToTable(clients);

        const cases = await getCases(token);
        insertCasesToTable(cases);
    }
});