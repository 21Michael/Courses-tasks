const root = document.getElementById('root');

let createElement = function(tagName, attributes = false, innerElement = false) {
    let element = document.createElement(tagName);
    if (attributes) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
    }
    if (innerElement) {
        innerElement.forEach((el) => {
            if (typeof el === 'object') {
                element.append(el);
            } else if (typeof el === 'string') {
                element.insertAdjacentHTML('afterbegin', el);
            }
        });
    }
    return element;
};

let createSectionHeader = (sectionName) => {
    let sectionHeader = createElement('h1', { class: 'section__header' }, [sectionName]);
    return sectionHeader;
};

let createEmptySection = () => {
    let sectionEmpty = createElement('section', { class: 'dynamicSection' });
    root.append(sectionEmpty);
};

let createBookSection = () => {

    let booksArray = JSON.parse(localStorage.localBooksArray);

    let createBooksItem = (book) => {
        let bookImg = createElement('img', { src: book.image });
        let bookName = createElement('h3', false, [book.name]);
        let bookEditButton = createElement('button', false, ['Edit']);
        bookEditButton.addEventListener('click', (evt) => {
            evt.stopPropagation();
            history.pushState({}, '', `?id=${book.id}#edit`);
            renderDynamicSection();
        });

        let sectionItem = createElement('li', { class: 'books__item' }, [bookImg, bookName, bookEditButton]);
        sectionItem.addEventListener('click', () => {
            history.pushState({}, '', `?id=${book.id}#preview`);
            renderDynamicSection();
        });
        return sectionItem;
    };

    let createAddButton = () => {
        let buttonAdd = createElement('button', false, ['Add a new book']);

        let sectionItem = createElement('div', { class: 'books__item books__item-addButton' }, [buttonAdd]);
        sectionItem.addEventListener('click', () => {
            history.pushState({}, '', `#add`);
            renderDynamicSection();
        });
        return sectionItem;
    };

    let sectionList = createElement('ul', { class: 'books__list' });
    for (let book of booksArray) {
        sectionList.append(createBooksItem(book));
    }
    sectionList.append(createAddButton());


    let sectionBooks = document.querySelector('.section__books')
    if (document.querySelector('.section__books')) {
        sectionBooks.remove();
        sectionBooks = createElement(
            'section', { class: 'section__books', name: 'books' },
            [createSectionHeader('books'), sectionList]);

        root.prepend(sectionBooks);

    } else {
        sectionBooks = createElement(
            'section', { class: 'section__books', name: 'books' },
            [createSectionHeader('books'), sectionList]);

        root.prepend(sectionBooks);
        createEmptySection();
    }
};

let createPreviewSection = (book) => {
    let createPreviewItem = (previewDescription, key, data) => {
        let previewItem = createElement('div', { class: 'preview__description-item' });

        switch (key) {
            case 'name':
                previewItem.insertAdjacentHTML('afterbegin',
                    `
           		<b>Name of the book:</b>
            	<h2>'${data}'.</h2>
        		`);
                previewDescription.append(previewItem);
                break;
            case 'autor':
                previewItem.insertAdjacentHTML('afterbegin',
                    `
                <b>Autor of the book:</b>
                <span>${data}.</span>
        		`);
                previewDescription.append(previewItem);
                break;
            case 'plot':
                previewItem.insertAdjacentHTML('afterbegin',
                    `
                <p><b>Plot:</b>${data}</div>
        		`);
                previewDescription.append(previewItem);
                break;
            default:
                previewItem.remove();
                break;
        }
    };

    let previewImg = createElement('img', { src: book.image });
    let previewImgBlock = createElement('div', { class: 'preview__image-block' }, [previewImg]);

    let previewDescription = createElement('div', { class: 'preview__description' }, [createSectionHeader('preview')]);
    for (let key in book) {
        if (book.hasOwnProperty(key)) {
            createPreviewItem(previewDescription, key, book[key]);
        }
    }

    let sectionPreview = createElement(
        'section', { class: 'dynamicSection section__preview', name: 'preview' },
        [previewImgBlock, previewDescription]);
    root.append(sectionPreview);
};

let createEditSection = (book) => {

    let createEditItem = (editForm, key, data) => {
        let editItem = createElement('div', { class: 'form__item' });
        switch (key) {
            case 'name':
                editItem.insertAdjacentHTML('afterbegin',
                    `
           		 	<label>Name:</label>
                 	<input type='text' name='name' value='${data}' required>
        			`);
                editForm.append(editItem);
                break;
            case 'autor':
                editItem.insertAdjacentHTML('afterbegin',
                    `
                 	<label>Autor:</label>
                    <input type='text' name='autor' value='${data}' required>
        			`);
                editForm.append(editItem);
                break;
            case 'image':
                editItem.insertAdjacentHTML('afterbegin',
                    `
                   	<label>Image:</label>
                    <input type='url' name='image' value='${data}' 
                    pattern='(ftp|http|https)://(.+)(.(jpeg|jpg|gif|png))' required>
        			`);
                editForm.append(editItem);
                break;

            case 'plot':
                editItem.insertAdjacentHTML('afterbegin',
                    `
                  	<label>Plot:</label>
                    <input type='text' name='plot' value='${data}' required>
        			`);
                editForm.append(editItem);
                break;
            default:
                editItem.remove();
                break;
        }
    };

    let createEditButtons = () => {
        let createSaveButton = () => {
            let savebutton = createElement(
                'button', { class: 'form__button form__button--save', type: 'submit' },
                ['Save']);

            savebutton.addEventListener('click', () => {
                document.forms.editForm.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                    let localBooksArray = JSON.parse(localStorage.localBooksArray);
                    let editForm = document.forms.editForm;

                    localBooksArray.forEach(function(element) {
                        if (element.id === book.id) {
                            element.name = editForm.name.value,
                                element.autor = editForm.autor.value,
                                element.image = editForm.image.value,
                                element.plot = editForm.plot.value
                        }
                    });
                    localStorage.localBooksArray = JSON.stringify(localBooksArray);
                    createBookSection();
                    history.pushState({}, '', `?id=${book.id}#preview`);
                    renderDynamicSection();

                    let timeDelay = 300;
                    setTimeout(() => {
                        alert('Book successfully updated')
                    }, timeDelay);
                })
            });
            return savebutton;
        };

        let createCanselButton = () => {
            let canselbutton = createElement('button', { class: 'form__button form__button--cancel' }, ['Cancel']);
            canselbutton.addEventListener('click', (evt) => {
                evt.preventDefault();
                let discard = confirm('Discard changes?');
                if (discard) {
                    history.go(-1);
                }
            });
            return canselbutton;
        };

        let editbuttons = createElement('div', { class: 'form__buttons' }, [createSaveButton(), createCanselButton()]);
        return editbuttons;
    };

    let editForm = createElement('form', { class: 'form__form', name: 'editForm' });
    for (let key in book) {
        if (book.hasOwnProperty(key)) {
            createEditItem(editForm, key, book[key]);
        }
    }
    editForm.append(createEditButtons());

    let sectionEdit = createElement(
        'section', { class: 'dynamicSection section__form', name: 'edit' },
        [createSectionHeader('Editing form'), editForm]);
    root.append(sectionEdit);
};

let createAddSection = () => {

    let createAddButtons = () => {
        let createSaveButton = () => {
            let savebutton = createElement(
                'button', { class: 'form__button form__button--save', type: 'submit' },
                ['Save']);

            savebutton.addEventListener('click', () => {
                document.forms.addForm.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                    let localBooksArray = JSON.parse(localStorage.localBooksArray);
                    let addForm = document.forms.addForm;
                    let newBook = {
                        id: localBooksArray.length + 1,
                        name: addForm.name.value,
                        autor: addForm.autor.value,
                        image: addForm.image.value,
                        plot: addForm.plot.value
                    };
                    localBooksArray.push(newBook);
                    localStorage.localBooksArray = JSON.stringify(localBooksArray);
                    createBookSection();
                    history.pushState({}, '', `?id=${localBooksArray.length}#preview`);
                    renderDynamicSection();

                    let timeDelay = 300;
                    setTimeout(() => {
                        alert('Book successfully updated')
                    }, timeDelay);
                })
            });
            return savebutton;
        };

        let createCanselButton = () => {
            let canselbutton = createElement('button', { class: 'form__button form__button--cancel' }, ['Cancel']);
            canselbutton.addEventListener('click', (evt) => {
                evt.preventDefault();
                let discard = confirm('Discard changes?');
                if (discard) {
                    history.go(-1);
                }
            });
            return canselbutton;
        };
        let editbuttons = createElement('div', { class: 'form__buttons' }, [createSaveButton(), createCanselButton()]);
        return editbuttons;
    };

    let inputList = `
         <div class='form__item'>
           	<label>Name:</label>
            <input type='text' name='name'  placeholder='Title' required>
        </div>

        <div class='form__item'>
            <label>Autor:</label>
            <input type='text' name='autor' placeholder='Name Surname' required>
        </div>

        <div class='form__item'>
            <label>Image:</label>
            <input type='url' name='image' placeholder='https://.../41UZeCEKOBL.jpg' 
             pattern='(ftp|http|https)://(.+)(.(jpeg|jpg|gif|png))' required>
        </div>

        <div class='form__item'>
            <label>Plot:</label>
            <input type='text' name='plot' placeholder='Text...'   required>
        </div>
    `;

    let addForm = createElement(
        'form', { class: 'form__form', name: 'addForm' },
        [inputList, createAddButtons()]);
    let sectionAdd = createElement(
        'section', { class: 'dynamicSection section__form', name: 'add' },
        [createSectionHeader('Adding form'), addForm]);
    root.append(sectionAdd);
};

let renderDynamicSection = () => {
    let booksArray = JSON.parse(localStorage.localBooksArray),
        hash = location.hash.slice(1),
        bookId = window.location.href.match(/id=\d+/),
        section = document.querySelector('.dynamicSection');

    switch (hash) {
        case 'preview':
            bookId = +bookId[0].slice(3);
            if (section) {
                section.remove();
                booksArray.forEach(function(element) {
                    if (element.id === bookId) {
                        createPreviewSection(element);
                    }
                });
            }
            break;
        case 'edit':
            bookId = +bookId[0].slice(3);
            if (section) {
                section.remove();
                booksArray.forEach(function(element) {
                    if (element.id === bookId) {
                        createEditSection(element);
                    }
                });
            }
            break;
        case 'add':
            if (section) {
                section.remove();
                createAddSection();
            }
            break;
        default:
            section.remove();
            createEmptySection();
            break;
    }
};

let clearURL = () => {
    history.pushState('', document.title, window.location.pathname);
};

window.addEventListener('load', () => {
    clearURL();
    createBookSection();
});

window.addEventListener('popstate', () => {
    renderDynamicSection();
});