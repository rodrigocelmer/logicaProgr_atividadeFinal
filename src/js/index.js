"use strict";
const form_access = document.querySelector('#form_access'), form_createAccount = document.querySelector('#form_createAccount'), form_messages = document.querySelector('#form_messages');
const readLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users;
};
const addNewUser = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const newUserName = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createUser.value, newUserPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createPassword.value, repeatPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_repeatPassword.value, users = readLocalStorage();
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
    form_createAccount.reset();
};
const accessInbox = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const accessUserName = form_access === null || form_access === void 0 ? void 0 : form_access.input_userName.value, accessPassword = form_access === null || form_access === void 0 ? void 0 : form_access.input_password.value, users = readLocalStorage();
    const userFind = users.find(user => user.userName === accessUserName);
    if (userFind && (userFind.userPassword === accessPassword)) {
        document.location.href = './messages.html';
    }
    else {
        alert("Usuário ou senha inválidos!");
    }
};
const saveMessage = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const newDescription = form_messages === null || form_messages === void 0 ? void 0 : form_messages.input_msgDescr.value, newDetails = form_messages === null || form_messages === void 0 ? void 0 : form_messages.input_msgDetails.value, messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push({
        userName: "user namesson",
        description: newDescription,
        details: newDetails
    });
    localStorage.setItem('messages', JSON.stringify(messages));
    form_messages.reset();
};
form_access === null || form_access === void 0 ? void 0 : form_access.addEventListener('submit', accessInbox);
form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.addEventListener('submit', addNewUser);
form_messages.addEventListener('submit', saveMessage);
