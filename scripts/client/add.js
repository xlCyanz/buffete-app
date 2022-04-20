const webUrl = "https://buffete-api-strapi.herokuapp.com/api";

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
    window.location.href = "/";
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

    const response = await fetch(`${webUrl}/clients`, {
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