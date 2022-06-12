"use strict";
const form_messages = document.querySelector('#form_messages'), tbody = document.querySelector('#tbody');
const readLocalStorage = (key) => {
    let infoLocalStorage;
    switch (key) {
        case 'users':
            infoLocalStorage = JSON.parse(localStorage.getItem('users') || '[]');
            break;
        case 'messages':
            infoLocalStorage = JSON.parse(localStorage.getItem('messages') || '[]');
            break;
        case 'userLogged':
            infoLocalStorage = JSON.parse(localStorage.getItem('userLogged') || '');
            break;
        default:
            infoLocalStorage = [];
            break;
    }
    return infoLocalStorage;
};
const saveMessage = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const newDescription = form_messages === null || form_messages === void 0 ? void 0 : form_messages.input_msgDescr.value, newDetails = form_messages === null || form_messages === void 0 ? void 0 : form_messages.input_msgDetails.value, messages = readLocalStorage('messages'), userLogged = readLocalStorage('userLogged');
    messages.push({
        id: defineID() + 1,
        userName: userLogged,
        description: newDescription,
        details: newDetails
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    form_messages.reset();
    showUserMessages();
};
const showUserMessages = () => {
    const messages = readLocalStorage('messages'), userLogged = readLocalStorage('userLogged');
    if (tbody) {
        tbody.innerHTML = "";
    }
    for (const message of messages) {
        if (message.userName === userLogged) {
            tbody.innerHTML += `
                <tr>
                    <td>${message.id}</td>
                    <td>${message.description}</td>
                    <td>${message.details}</td>
                    <td>
                        <button class="editDeleteBtn" onclick="editMessage(${message.id})">Editar</button>
                        <button class="editDeleteBtn" onclick="deleteMessage(${message.id})">Apagar</button>
                    </td>
                </tr>
            `;
        }
    }
};
const deleteMessage = (id) => {
    const messages = readLocalStorage('messages');
    const msgIndex = messages.findIndex((message) => message.id === id);
    messages.splice(msgIndex, 1);
    localStorage.setItem('messages', JSON.stringify(messages));
    showUserMessages();
};
const editMessage = (id) => {
    const messages = readLocalStorage('messages');
    const msgIndex = messages.findIndex((message) => message.id === id);
    const editOption = Number(prompt("Escolha a opção para editar \n[1] - Descrição\n[2] - Detalhamento\n[3] - Ambos"));
    switch (editOption) {
        case 1:
            messages[msgIndex].description = prompt("Informe a nova descrição.");
            break;
        case 2:
            messages[msgIndex].details = prompt("Informe o novo detalhamento.");
            break;
        case 3:
            messages[msgIndex].description = prompt("Informe a nova descrição.");
            messages[msgIndex].details = prompt("Informe o novo detalhamento.");
            break;
        default:
            alert("Opção inválida!");
            break;
    }
    localStorage.setItem('messages', JSON.stringify(messages));
    showUserMessages();
};
const defineID = () => {
    const messages = readLocalStorage('messages');
    let max = 0;
    messages.forEach((message) => {
        if ((message.id > max)) {
            max = message.id;
        }
    });
    return max;
};
form_messages === null || form_messages === void 0 ? void 0 : form_messages.addEventListener('submit', saveMessage);
document.addEventListener('DOMContentLoaded', showUserMessages);
