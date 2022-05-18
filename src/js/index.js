"use strict";
const form_access = document.querySelector('#form_access'), form_createAccount = document.querySelector('#form_createAccount');
const readLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users;
};
const addNewUser = (event) => {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const newUserName = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createUser.value, newUserPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_createPassword.value, repeatPassword = form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.input_repeatPassword.value, users = readLocalStorage();
    if (newUserPassword !== repeatPassword) {
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
    console.log(accessUserName);
    console.log(users);
    const userFind = users.find((user) => {
        user.userName === accessUserName;
    });
    console.log(userFind);
};
form_access === null || form_access === void 0 ? void 0 : form_access.addEventListener('submit', accessInbox);
form_createAccount === null || form_createAccount === void 0 ? void 0 : form_createAccount.addEventListener('submit', addNewUser);
