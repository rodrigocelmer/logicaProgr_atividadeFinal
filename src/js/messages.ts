const   form_messages       = document.querySelector('#form_messages') as HTMLFormElement,
        tbody               = document.querySelector('#tbody') as HTMLElement;

interface UserMessages{
    id:             number;
    userName:       string;
    description:    string;
    details:        string;
}

const readLocalStorage = (key: string): Array<User> | Array<UserMessages> | string => {
    let infoLocalStorage: Array<User> | Array<UserMessages> | string;

    switch(key)
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
                        <button class="editDeleteBtn" onclick="editMessage(${message.id})">Editar</button>
                        <button class="editDeleteBtn" onclick="deleteMessage(${message.id})">Apagar</button>
                    </td>
                </tr>
            `;
        }
    }
}

const deleteMessage = (id: number) => {
    const messages = readLocalStorage('messages') as Array<UserMessages>;

    const msgIndex = messages.findIndex((message) => message.id === id);

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
    const   messages    = readLocalStorage('messages') as Array<UserMessages>;
    let     max         = 0;
    
    messages.forEach((message) => {
        if((message.id > max)){
            max = message.id;
        }
    })

    return max
}

form_messages?.addEventListener('submit', saveMessage);
document.addEventListener('DOMContentLoaded', showUserMessages);