"use strict";
const form_access = document.querySelector('#form_access'), form_createAccount = document.querySelector('#form_createAccount');
const addNewUser = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    console.log("addNewUser");
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
    document.location.href = './index.html';
};
const accessInbox = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    console.log("accessInbox");
    const accessUserName = form_access === null || form_access === void 0 ? void 0 : form_access.input_userName.value, accessPassword = form_access === null || form_access === void 0 ? void 0 : form_access.input_password.value, users = readLocalStorage('users');
    const userFind = users.find(user => user.userName === accessUserName);
    if (!userFind || (userFind.userPassword !== accessPassword)) {
        alert("Usuário ou senha inválidos!");
        form_access.reset();
        return;
    }
    document.location.href = './messages.html';
    localStorage.setItem('userLogged', JSON.stringify(userFind.userName));
    showUserMessages();
};
form_access === null || form_access === void 0 ? void 0 : form_access.addEventListener('submit', accessInbox);
form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.addEventListener('submit', addNewUser);
