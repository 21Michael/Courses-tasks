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
                element.insertAdjacentHTML('beforeend', el);
            }
        });
    }
    return element;
};

let createSectionHeader = (sectionName) => {
    let sectionHeader = createElement('h1', { class: 'section__header' }, [sectionName, ' SECTION']);
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



let createDynamicSection = (type, book = false) => {
    let createDynamicItem = (type, book) => {
        switch (type) {
            case 'preview':
                return `
                <div class='dynamic__description-item'> 
           			<b>Name of the book:</b>
            		<h2>'${book.name}'.</h2>
            	</div>
            	 <div class='dynamic__description-item'> 
           			 <b>Autor of the book:</b>
            		 <span>'${book.autor}'. </span>
            	</div>
            	 <div class='dynamic__description-item'> 
           			<p><b>Plot:</b>${book.plot}</p>
            	</div>
        		`;
            case 'edit':
                return `
                 <form class='dynamic__form' name='editForm'>
	                <div class='dynamic__description-item'> 
	           			<label>Name of the book:</label>
	           			<input type='text' name='name' value='${book.name}' required>
	            	</div>
	            	 <div class='dynamic__description-item'> 
	           			<label>Autor of the book:</label>
	           			<input type='text' name='autor' value='${book.autor}' required>
	            	</div>
	            	 <div class='dynamic__description-item'> 
	            		<label>Image:</label>
                    	<input type='url' name='image' value='${book.image}' 
                   		 pattern='(ftp|http|https)://(.+)(.(jpeg|jpg|gif|png))' required>
                    </div>
	            	 <div class='dynamic__description-item'> 
	           			<label>Plot:</label>
	           			<input type='text' name='plot' value='${book.plot}' required>
	            	</div>
	            	<div class='dynamic__buttons'>
	            		<button class='dynamic__button dynamic__button--save' type='submit'>Save</button>
	            		<button class='dynamic__button dynamic__button--cancel'>Cancel</button>
	            	</div>  
	            </form>          	
        		`;

            case 'add':
                return `
                <form class='dynamic__form' name='addForm'>
	                <div class='dynamic__description-item'> 
	           			<label>Name of the book:</label>
            			<input type='text' name='name'  placeholder='Title' required>			
	            	</div>
	            	 <div class='dynamic__description-item'> 
	           			<label>Autor of the book:</label>
	           			 <input type='text' name='autor' placeholder='Name Surname' required>
	            	</div>
	            	 <div class='dynamic__description-item'> 
	            		<label>Image:</label>
                    	<input type='url' name='image' placeholder='https://.../41UZeCEKOBL.jpg' 
             			pattern='(ftp|http|https)://(.+)(.(jpeg|jpg|gif|png))' required>
                    </div>
	            	 <div class='dynamic__description-item'> 
	           			<label>Plot:</label>
	           			<input type='text' name='plot' placeholder='Text...'   required>
	            	</div>
	            	<div class='dynamic__buttons'>
	            		<button class='dynamic__button dynamic__button--save' type='submit'>Save</button>
	            		<button class='dynamic__button dynamic__button--cancel'>Cancel</button>
	            	</div>
            	</form>
        		`;
            default:
                break;
        }
    };

    let createEventButtons = (type, book) => {

        let newImagePush = () => {
            let booksArray = JSON.parse(localStorage.localBooksArray);
            createBookSection();
            history.pushState({}, '', `?id=${booksArray.length}#preview`);
            renderDynamicSection();

            let timeDelay = 300;
            setTimeout(() => {
                alert('Book successfully updated')
            }, timeDelay);
        };

        let createSaveEditButton = () => {
            document.querySelector('.dynamic__button--save').addEventListener('click', () => {
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
                    newImagePush();
                })
            });
        };
        let createSaveAddButton = () => {
            let booksArray = JSON.parse(localStorage.localBooksArray);
            document.querySelector('.dynamic__button--save').addEventListener('click', () => {
                document.forms.addForm.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                    let addForm = document.forms.addForm;
                    let newBook = {
                        id: booksArray.length + 1,
                        name: addForm.name.value,
                        autor: addForm.autor.value,
                        image: addForm.image.value,
                        plot: addForm.plot.value
                    };
                    booksArray.push(newBook);
                    localStorage.localBooksArray = JSON.stringify(booksArray);
                    newImagePush();
                })
            });
        };
        let createCancelButton = () => {
            document.querySelector('.dynamic__button--cancel').addEventListener('click', (evt) => {
                evt.preventDefault();
                let discard = confirm('Discard changes?');
                if (discard) {
                    history.go(-1);
                }
            });
        };

        switch (type) {
            case 'preview':
                break;
            case 'edit':
                createSaveEditButton();
                createCancelButton();
                break;
            case 'add':
                createSaveAddButton();
                createCancelButton();
                break;
            default:
                break;
        }
    };

    let dynamicImg = createElement('img', { src: book.image, alt: 'Upload image' }),
        dynamicImgBlock = createElement('div', { class: `dynamic__image-block` }, [dynamicImg]),
        dynamicDescription = createElement('div', { class: `dynamic__description` },
            [createSectionHeader(type), createDynamicItem(type, book)]),
        sectionDynamic = createElement(
            'section', { class: `dynamicSection section__dynamic`, name: type },
            [dynamicImgBlock, dynamicDescription]);
    root.append(sectionDynamic);
    createEventButtons(type, book);
};


let renderDynamicSection = () => {
    let hash = location.hash.slice(1),
        bookId = window.location.href.match(/id=\d+/),
        section = document.querySelector('.dynamicSection'),
        booksArray = JSON.parse(localStorage.localBooksArray);

    if (hash === 'preview' || hash === 'edit') {
        section.remove();
        bookId = +bookId[0].slice(3);
        booksArray.forEach(function(element) {
            if (element.id === bookId) {
                createDynamicSection(hash, element);
            }
        });
    } else if (hash === 'add') {
        section.remove();
        createDynamicSection(hash);
    } else {
        section.remove();
        createEmptySection();
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