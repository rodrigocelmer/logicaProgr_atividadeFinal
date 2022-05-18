"use strict";
const form_access = document.querySelector('#form_access'), form_createAccount = document.querySelector('#form_createAccount');
const readLocalStorage = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios;
};
const addNewUser = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const newUserName = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createUser.value, newUserPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createPassword.value, repeatPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_repeatPassword.value;
    if (newUserPassword !== repeatPassword) {
        alert("As senhas inseridas não condizem!");
        form_createAccount.reset();
        return 0;
    }
    const usuarios = readLocalStorage();
    usuarios.push({
        userName: newUserName,
        userPassword: newUserPassword
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    form_createAccount.reset();
};
form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.addEventListener('submit', addNewUser);
