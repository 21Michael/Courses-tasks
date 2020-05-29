const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

const ERROR_STATUS_400 = 400;

const sendRequest = (method, url, data = false) => {
    return new Promise((onSucces, onError) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, baseUrl + url);
        xhr.responseType = 'json';

        ['POST', 'PUT'].includes(method) ? xhr.setRequestHeader('Content-Type', 'application/json') : 0;
        ['DELETE'].includes(method) ? xhr.setRequestHeader('Authorization', 'admin') : 0;


        xhr.addEventListener('load', () => {
            xhr.status >= ERROR_STATUS_400 || xhr.onerror ? onError(`Error №: ${xhr.status} ${xhr.statusText}`) :
                onSucces(xhr.response);
        });

        xhr.addEventListener('loadstart', () => {
            showNotification();
        });

        xhr.upload.addEventListener('loadstart', () => {
            ['PUT', 'DELETE'].includes(method) ? disableTableButtons() : 0;
            ['POST'].includes(method) ? disableForm() : 0;

        });

        xhr.addEventListener('loadend', () => {
            ['GET'].includes(method) ? removeNotification() : 0;
        });

        xhr.send(JSON.stringify(data));
    });
};

const constructElement = (tagName, attributes = false, innerElement = false) => {
    const element = document.createElement(tagName);
    if (attributes) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
    }
    if (innerElement) {
        innerElement.forEach((el) => {
            typeof el === 'object' ? element.append(el) : 0;
            typeof el === 'string' ? element.insertAdjacentHTML('beforeend', el) : 0;
        });
    }
    return element;
};

const disableForm = () => {
    document.querySelector('.app__fieldset').setAttribute('disabled', 'disabled');
};

const disableTableButtons = () => {
    document.querySelectorAll('.app__update-button').forEach(el => el.setAttribute('disabled', 'disabled'));
    document.querySelectorAll('.app__delete-button').forEach(el => el.setAttribute('disabled', 'disabled'));
};
const showNotification = () => {
    !document.querySelector('.app__loading') ?
        appContainer.append(constructElement('div', { class: 'app__loading' }, ['Loading'])) : 0;
};
const removeNotification = () => {
    document.querySelector('.app__loading').remove();
    document.querySelector('.app__fieldset').removeAttribute('disabled');
};

const createHeader = () => constructElement('h2', { class: 'app__header' }, ['Manage user app']);

const handlerSubmitForm = (evt, form) => {
    evt.preventDefault();
    sendRequest('POST', '/users', Object.fromEntries(new FormData(form)))
        .then(() => downloadTable())
        .catch(error => alert(error));
    form.reset();
};

const createForm = () => {
    const form = constructElement('form', { class: 'app__form' }, [` 
    	<fieldset class='app__fieldset'>
            <input class='app__form-input' type='text' name='name' placeholder='Name' required>
            <input class='app__form-input' type='text' name='username' placeholder='User Name' required>
            <button class='app__form-submit' type='submit'>add new user</button>
        </fieldset>
       `]);
    form.addEventListener('submit', evt => handlerSubmitForm(evt, form));
    return form;
};

const createTableButtons = () => {
    const updateButton = constructElement('button', { class: 'app__update-button' }, ['update']);
    const deleteButton = constructElement('button', { class: 'app__delete-button' }, ['delete']);
    return { updateButton, deleteButton };
};

const handlerTableButtons = (evt, row) => {
    const typeButton = String(evt.target.classList);
    if (typeButton === 'app__delete-button') {
        sendRequest('DELETE', `/users/${row.id}`);
        downloadTable();
    } else if (typeButton === 'app__update-button') {
        sendRequest('PUT', `/users/${row.id}`, {
            name: row.querySelector('.app__table-name').value,
            username: row.querySelector('.app__table-username').value
        });
        downloadTable();
    }
};

const createTableRow = (obj) => {
    const row = constructElement('tr', { class: 'app__tr', id: obj.id });
    obj = Object.assign(obj.__proto__, createTableButtons());
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            row.append(constructElement('td', { class: key }, [obj[key]]));
        }
    }
    row.addEventListener('click', evt => handlerTableButtons(evt, row));
    return row;
};

const createTable = (data) => {
    const tHead = constructElement('thead', { class: 'app__table-head' },
        [`<tr><th>user id</th><th>name</th><th>username</th><th colspan='2'>tools</th></tr>`]);
    const tBody = constructElement('tbody', { class: 'app__table-body' }, data.map(el => createTableRow(el)));
    return constructElement('table', { class: 'app__table' }, [tHead, tBody]);
};

const downloadTable = () => {
    sendRequest('GET', '/users')
        .then(data => data.map(obj => Object.create({
            id: obj.id,
            name: `<input class='app__table-name' value='${obj.name}'>`,
            username: `<input class='app__table-username' value='${obj.username }'>`
        })))
        .then(data => {
            const table = document.querySelector('.app__table');
            table ? table.remove() : 0;
            appContainer.append(createTable(data));
        })
        .catch((error) => alert(error));
};

const renderPage = () => {
    appContainer.append(createHeader(), createForm());
    downloadTable();
};

renderPage();