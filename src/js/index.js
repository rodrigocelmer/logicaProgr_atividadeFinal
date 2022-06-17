"use strict";
const form_access = document.querySelector('#form_access'), form_createAccount = document.querySelector('#form_createAccount'), form_messages = document.querySelector('#form_messages'), tbody = document.querySelector('#tbody');
let msgIdToDelete = 0;
const messageToDelete = (id) => {
    msgIdToDelete = id;
};
const readLocalStorage = (option) => {
    let infoLocalStorage;
    switch (option) {
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
const addNewUser = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const newUserName = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createUser.value, newUserPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createPassword.value, repeatPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_repeatPassword.value, users = readLocalStorage('users');
    const userFind = users.find(user => user.userName === newUserName);
    if (userFind) {
        alert(`O usuário ${newUserName} já existe!`);
        form_createAccount.reset();
        return 0;
    }
    else if (newUserPassword !== repeatPassword) {
        alert("As senhas inseridas não condizem!");
        form_createAccount.reset();
        return 0;
    }
    users.push({
        userName: newUserName,
        userPassword: newUserPassword
    });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Novo usuário criado com sucesso!");
    form_createAccount.reset();
};
const accessInbox = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const accessUserName = form_access === null || form_access === void 0 ? void 0 : form_access.input_userName.value, accessPassword = form_access === null || form_access === void 0 ? void 0 : form_access.input_password.value, users = readLocalStorage('users');
    const userFind = users.find(user => user.userName === accessUserName);
    if (userFind && (userFind.userPassword === accessPassword)) {
        document.location.href = './messages.html';
    }
    else {
        alert("Usuário ou senha inválidos!");
        form_access.reset();
        return 0;
    }
    localStorage.setItem('userLogged', JSON.stringify(userFind.userName));
    showUserMessages();
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
                        <button class="editDeleteBtn btn btn-success" onclick="editMessage(${message.id})">Editar</button>
                        <button class="editDeleteBtn btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="messageToDelete(${message.id})">Apagar</button>
                    </td>
                </tr>
            `;
        }
    }
};
const deleteMessage = (id) => {
    const messages = readLocalStorage('messages');
    const msgIndex = messages.findIndex((message) => message.id === msgIdToDelete);
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
    const messages = readLocalStorage('messages'), userLogged = readLocalStorage('userLogged');
    let max = 0;
    messages.forEach((message) => {
        if ((message.id > max)) {
            max = message.id;
        }
    });
    return max;
};
form_access === null || form_access === void 0 ? void 0 : form_access.addEventListener('submit', accessInbox);
form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.addEventListener('submit', addNewUser);
form_messages === null || form_messages === void 0 ? void 0 : form_messages.addEventListener('submit', saveMessage);
document.addEventListener('DOMContentLoaded', showUserMessages);
