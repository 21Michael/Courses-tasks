const data = [{
        'folder': true,
        'title': 'Pictures',
        'children': [{
                'title': 'logo.png'
            },
            {
                'folder': true,
                'title': 'Vacations',
                'children': [{
                    'title': 'spain.jpeg'
                }]
            }
        ]
    },
    {
        'folder': true,
        'title': 'Desktop',
        'children': [{
            'folder': true,
            'title': 'screenshots',
            'children': null
        }]
    },
    {
        'folder': true,
        'title': 'Downloads',
        'children': [{
                'folder': true,
                'title': 'JS',
                'children': null
            },
            {
                'title': 'nvm-setup.exe'
            },
            {
                'title': 'node.exe'
            }
        ]
    },
    {
        'title': 'credentials.txt'
    }
];

const rootNode = document.getElementById('root');

let open_closeFolder = (folder) => {
    let icon = folder.firstElementChild.firstElementChild;

    for (let child of folder.children) {
        if (child.classList.contains('hide')) {
            child.classList.remove('hide');
            icon.textContent = 'folder_open';
        } else {
            child.classList.add('hide');
            icon.textContent = 'folder';
        }
    }
};

let deleteElements = (deletingElement) => {
    document.querySelector('.file__contextMenu-delete').addEventListener('click', () => {

        let amountOfChildren = deletingElement.parentElement.children.length;
        let parentFolder = deletingElement.parentElement.parentElement;

        if (amountOfChildren === 1) {
            parentFolder.append(createEmptyNotification());
            deletingElement.remove();
        } else {
            deletingElement.remove();
        }
    });

};

let inputSelectText = (span, input) => {
    let file = span.textContent.match(/(\.\w+)$/);
    if (file) {
        input.setSelectionRange(0, span.textContent.length - file[0].length);
        input.focus();
    } else {
        input.select();
    }
};
let inputReplaceBySpan = (span, input) => {
    span.textContent = input.value;
    input.replaceWith(span);

    let elementUnderMenu = document.querySelector('.activeFolder_File');
    elementUnderMenu.classList.remove('activeFolder_File');
};

let renameElements = (renamingElement) => {
    document.querySelector('.file__contextMenu-rename').addEventListener('click', () => {
        let span = renamingElement;
        let input = createElement('input', 'file__input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', renamingElement.textContent);

        renamingElement.replaceWith(input);
        
        inputSelectText(span, input);

        input.addEventListener('click', (evt) => evt.stopPropagation());
        input.addEventListener('keydown', (evt) => {
            let buttonEnter = 13;
            if (evt.keyCode === buttonEnter) {
                inputReplaceBySpan(span, input);
            }
        });
        input.addEventListener('blur', () => {
            inputReplaceBySpan(span, input);
        });
    });
};


let createElementFolder = (folderName) => {
    let folder = createElement('li', 'file__item folder');
    folder.insertAdjacentHTML('beforeend',
        `<div class='file__element'>
          <i class='material-icons'>folder</i>
          <span class='folder__name' >${folderName}</span>
        </div>`);

    folder.firstElementChild.addEventListener('click', (evt) => {
        evt.stopPropagation();
        open_closeFolder(folder);
    });
    folder.firstElementChild.addEventListener('contextmenu', () => {
        folder.firstElementChild.classList.add('activeFolder_File');
        deleteElements(folder);
        renameElements(folder.children[0].children[1]);
    });

    return folder;
};

let createEmptyNotification = () => {
    let emptyFolder = createElement('i', 'folder__empty');
    emptyFolder.textContent = 'Folder is empty';
    return emptyFolder;
};


let createElementFile = (fileName) => {
    let file = createElement('li', 'file__item file');
    file.insertAdjacentHTML('beforeend',
        `<div class='file__element'>
          <i class='material-icons file'>insert_drive_file</i>
          <span class='file__name'>${fileName}</span>
        </div>`);

    file.firstElementChild.addEventListener('contextmenu', () => {
        file.firstElementChild.classList.add('activeFolder_File');
        deleteElements(file);
        renameElements(file.children[0].children[1]);
    });
    return file;
};

let createElement = function(tagName, className) {
    let element = document.createElement(tagName);
    element.setAttribute('class', className);
    return element;
};

let hideInnerElements = (folder) => {
    if (folder.parentElement.classList.contains('file__item')) {
        folder.classList.add('hide');
    }
};

let buildFrame = (structure, root) => {
    let fileList = createElement('ul', 'file__list');

    root.append(fileList);
    for (let obj of structure) {
        hideInnerElements(fileList);
        if (obj.folder) {
            let fileItem = createElementFolder(obj.title);
            fileList.append(fileItem);
            if (obj.children) {
                buildFrame(obj.children, fileItem);
            } else {
                let emptyNotification = createEmptyNotification();
                fileItem.append(emptyNotification);
                hideInnerElements(emptyNotification);
            }
        } else {
            fileList.append(createElementFile(obj.title));
        }
    }
    root.append(fileList);
};
buildFrame(data, rootNode);


let createContextMenu = (evt) => {
    let menu = createElement('div', 'file__contextMenu activeContextMenu');
    menu.setAttribute('style', `left:${evt.clientX}px; top:${evt.clientY}px;`);

    if (evt.target.id !== 'root') {
        menu.insertAdjacentHTML('afterbegin',
            `
          <button class='file__contextMenu-rename'>Rename</button>
          <button class='file__contextMenu-delete'>Delete item</button>
        `);
    } else {
        menu.classList.remove('activeContextMenu');
        menu.insertAdjacentHTML('afterbegin',
            `
          <button class='file__contextMenu-rename' disabled>Rename</button>
          <button class='file__contextMenu-delete' disabled>Delete item</button>
        `);
    }
    return menu;
};

let open_hideContextMenu = (evt) => {
    evt.preventDefault();
    const body = document.querySelector('body');
    let contextMenu = document.querySelector('.file__contextMenu');
    let elementUnderMenu = document.querySelector('.activeFolder_File');

    if (contextMenu) {
        contextMenu.remove();
        body.append(createContextMenu(evt, evt.target.parentElement));
        if (elementUnderMenu) {
            elementUnderMenu.classList.remove('activeFolder_File');
        }
    } else {
        body.append(createContextMenu(evt, evt.target.parentElement));
    }

    body.addEventListener('click', () => {
        contextMenu = document.querySelector('.file__contextMenu');
        if (contextMenu) {
            contextMenu.remove();
        }
    }, true);
};

rootNode.addEventListener('contextmenu', open_hideContextMenu, true);