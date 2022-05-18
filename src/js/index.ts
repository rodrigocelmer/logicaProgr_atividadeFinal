const   form_access         = document.querySelector('#form_access') as HTMLFormElement,
        form_createAccount  = document.querySelector('#form_createAccount') as HTMLFormElement;

const readLocalStorage = (): Array<any> => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Array<any>;

    return usuarios;
}

const addNewUser = (event: Event) => {
    event?.preventDefault();

    const   newUserName     = form_createAccount?.input_createUser.value,
            newUserPassword = form_createAccount?.input_createPassword.value,
            repeatPassword  = form_createAccount?.input_repeatPassword.value;

    if(newUserPassword !== repeatPassword)
    {
        alert("As senhas inseridas não condizem!")
        form_createAccount.reset();
        return 0;
    }

    const usuarios = readLocalStorage();

    usuarios.push({
        userName:       newUserName,
        userPassword:   newUserPassword
    })

    localStorage.setItem('usuarios', JSON.stringify(usuarios))

    form_createAccount.reset();
}

form_createAccount?.addEventListener('submit', addNewUser);