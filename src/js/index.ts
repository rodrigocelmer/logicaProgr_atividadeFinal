const   form_access         = document.querySelector('#form_access') as HTMLFormElement,
        form_createAccount  = document.querySelector('#form_createAccount') as HTMLFormElement;

interface User{
    // id:             number;
    userName:       string;
    userPassword:   string;
}

const readLocalStorage = (): Array<User> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as Array<User>;

    return users;
}

const addNewUser = (event: Event) => {
    event?.preventDefault();

    const   newUserName     = form_createAccount?.input_createUser.value,
            newUserPassword = form_createAccount?.input_createPassword.value,
            repeatPassword  = form_createAccount?.input_repeatPassword.value,
            users        = readLocalStorage();

    if(newUserPassword !== repeatPassword)
    {
        alert("As senhas inseridas não condizem!")
        form_createAccount.reset();
        return 0;
    }

    users.push({
        userName:       newUserName,
        userPassword:   newUserPassword
    })

    localStorage.setItem('users', JSON.stringify(users))

    form_createAccount.reset();
}

const accessInbox = (event: Event) => {
    event?.preventDefault();

    const   accessUserName  = form_access?.input_userName.value,
            accessPassword  = form_access?.input_password.value,
            users           = readLocalStorage();

    console.log(accessUserName)
    console.log(users)

    const userFind = users.find((user) => {
        user.userName === accessUserName
    })

    console.log(userFind)
}

form_access?.addEventListener('submit', accessInbox);
form_createAccount?.addEventListener('submit', addNewUser);