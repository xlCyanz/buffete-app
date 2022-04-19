const webUrl = "https://buffete-api-strapi.herokuapp.com/api";
const id = window.location.search.split('=')[1];

const nameField = document.getElementById('name-field');
const lastnameField = document.getElementById('lastname-field');
const emailField = document.getElementById('email-field');
const nicField = document.getElementById('nic-field');
const phoneNumberField = document.getElementById('phone-field');
const mobileNumberField = document.getElementById('mobile-field');
const addressField = document.getElementById('address-field');
const statusCivilField = document.getElementById('status-field');

const cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener("click", () => {
    window.location.href = "/dashboard.html";
});

window.addEventListener('load', async () => {
    const response = await fetch(`${webUrl}/clients/${id}`).then((res) => res.json());
    const client = response.data.attributes;

    nameField.value = client.username;
    lastnameField.value = client.lastname;
    emailField.value = client.email;
    nicField.value = client.nic;
    phoneNumberField.value = client.phone_number;
    mobileNumberField.value = client.mobile_number;
    addressField.value = client.address;
    statusCivilField.value = client.status_civil;
});

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
        nic: nicField.value,
        username: nameField.value,
        lastname: lastnameField.value,
        email: emailField.value,
        phone_number: phoneNumberField.value,
        mobile_number: mobileNumberField.value,
        address: addressField.value,
        status_civil: statusCivilField.value,
    };

    const response = await fetch(`${webUrl}/clients/${id}`, {
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