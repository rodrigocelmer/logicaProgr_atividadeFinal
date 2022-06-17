const   form_access         = document.querySelector('#form_access') as HTMLFormElement,
        form_createAccount  = document.querySelector('#form_createAccount') as HTMLFormElement,
        form_messages       = document.querySelector('#form_messages') as HTMLFormElement,
        tbody               = document.querySelector('#tbody') as HTMLElement;

interface User{
    userName:       string;
    userPassword:   string;
}

interface UserMessages{
    id:             number;
    userName:       string;
    description:    string;
    details:        string;
}

let msgIdToDelete = 0

var alertPlaceholder = document.getElementById('liveAlertPlaceholder') as HTMLElement

function alertBs(message: string, type: string) {
  var wrapper = document.createElement('div')
  tbody.innerHTML += '<div class="col-1 alert alert-success' + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

// if (alertTrigger) {
//   alertTrigger.addEventListener('click', function () {
//     alertBs('Nice, you triggered this alert message!', 'success')
//   })
// }

const messageToDelete = (id: number) => {
    msgIdToDelete = id;
}

const readLocalStorage = (option: string): Array<User> | Array<UserMessages> | string => {
    let infoLocalStorage: Array<User> | Array<UserMessages> | string;

    switch(option)
    {
        case 'users':
            infoLocalStorage = JSON.parse(localStorage.getItem('users') || '[]') as Array<User>;
        break;
        case 'messages':
            infoLocalStorage = JSON.parse(localStorage.getItem('messages') || '[]') as Array<UserMessages>;
        break;
        case 'userLogged':
            infoLocalStorage = JSON.parse(localStorage.getItem('userLogged') || '') as string;
        break;
        default:
            infoLocalStorage = [];
        break;
    }

    return infoLocalStorage;
}

const addNewUser = (event: Event) => {
    event?.preventDefault();

    const   newUserName     = form_createAccount?.input_createUser.value,
            newUserPassword = form_createAccount?.input_createPassword.value,
            repeatPassword  = form_createAccount?.input_repeatPassword.value,
            users           = readLocalStorage('users') as Array<User>;

    const userFind = users.find(user => 
        user.userName === newUserName
    )

    if(userFind)
    {
        alert(`O usuário ${newUserName} já existe!`)
        form_createAccount.reset();
        return 0;
    }else if(newUserPassword !== repeatPassword)
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

    alert("Novo usuário criado com sucesso!")

    form_createAccount.reset();
}

const accessInbox = (event: Event) => {
    event?.preventDefault();

    const   accessUserName  = form_access?.input_userName.value,
            accessPassword  = form_access?.input_password.value,
            users           = readLocalStorage('users') as Array<User>;

    const userFind = users.find(user => 
        user.userName === accessUserName
    )

    if(userFind && (userFind.userPassword === accessPassword))
    {
        document.location.href = './messages.html'
    }
    else
    {
        alert("Usuário ou senha inválidos!")   
        form_access.reset();
        return 0
    }

    localStorage.setItem('userLogged', JSON.stringify(userFind.userName));
    
    showUserMessages();
}

const saveMessage = (event: Event) => {
    event?.preventDefault();

    const   newDescription  = form_messages?.input_msgDescr.value,
            newDetails      = form_messages?.input_msgDetails.value,
            messages        = readLocalStorage('messages') as Array<UserMessages>,
            userLogged      = readLocalStorage('userLogged') as string;

    messages.push({
        id:             defineID() + 1,
        userName:       userLogged,
        description:    newDescription,
        details:        newDetails
    })

    localStorage.setItem('messages', JSON.stringify(messages))

    form_messages.reset()

    showUserMessages();

    alertBs('Nice, you triggered this alert message!', 'success')
}

const showUserMessages = () => {
    const   messages    = readLocalStorage('messages') as Array<UserMessages>,
            userLogged  = readLocalStorage('userLogged') as string;

    if(tbody)
    {
        tbody.innerHTML = ""
    }

    for(const message of messages)
    {
        if(message.userName === userLogged)
        {
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
}

const deleteMessage = (id: number) => {
    const messages = readLocalStorage('messages') as Array<UserMessages>;

    const msgIndex = messages.findIndex((message) => message.id === msgIdToDelete);

    messages.splice(msgIndex, 1);

    localStorage.setItem('messages', JSON.stringify(messages))

    showUserMessages();
}

const editMessage = (id: number) => {
    const messages = readLocalStorage('messages') as Array<UserMessages>;

    const msgIndex = messages.findIndex((message) => message.id === id);

    const editOption = Number(prompt("Escolha a opção para editar \n[1] - Descrição\n[2] - Detalhamento\n[3] - Ambos"))

    switch(editOption)
    {
        case 1:
            messages[msgIndex].description = prompt("Informe a nova descrição.") as string;
        break
        case 2:
            messages[msgIndex].details = prompt("Informe o novo detalhamento.") as string;
        break
        case 3:
            messages[msgIndex].description = prompt("Informe a nova descrição.") as string;
            messages[msgIndex].details = prompt("Informe o novo detalhamento.") as string;
        break
        default:
            alert("Opção inválida!");
        break
    }
    
    localStorage.setItem('messages', JSON.stringify(messages))
    showUserMessages();
}

const defineID = (): number => {
    const   messages    = readLocalStorage('messages') as Array<UserMessages>,
            userLogged  = readLocalStorage('userLogged') as string;
    let     max         = 0;
    
    messages.forEach((message) => {
        if((message.id > max)){
            max = message.id;
        }
    })

    return max
}

form_access?.addEventListener('submit', accessInbox);
form_createAccount?.addEventListener('submit', addNewUser);
form_messages?.addEventListener('submit', saveMessage);
document.addEventListener('DOMContentLoaded', showUserMessages);