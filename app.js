const books = [];
const audiobooks = [];

//SELECT ELEMENTS
const audioButton = document.querySelector('.audio-button');
const physicalButton = document.querySelector('.physical-button');

const selectElement = document.querySelector('.format');
const isbn = document.querySelector('.isbn');
const narrator = document.querySelector('.narrator');
const registerForm = document.querySelector('.book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

const displayPhysicalBooksContainer = document.querySelector('.display-physical-books');
const displayAudioBooksContainer = document.querySelector('.display-audio-books');
const physicalBooksUl = document.querySelector('.physical-books-list');
const AudioBooksUl = document.querySelector('.audio-books-list');

//SELECT FORMAT
selectElement.addEventListener('change', ()=> {
	if (selectElement.value === 'physical') {
		isbn.removeAttribute('disabled');
		narrator.setAttribute('disabled', '');
	} else {
		isbn.setAttribute('disabled', '');
		narrator.removeAttribute('disabled');
	}
});

registerForm.addEventListener('submit', (e) => {
	e.preventDefault();
	let newBook;
	if (selectElement.value === 'physical') {
		newBook = new Book (
			title.value,
			author.value,
			selectElement.value,
			isbn.value
		);
	} else {
		newBook = new Audiobook(
			title.value,
			author.value,
			selectElement.value,
			narrator.value
		);
	}
	Book.addBook(newBook);
	console.log(newBook);
	console.log(books);
})

//DECLARING PHYSICAL BOOK CLASS
class Book {
	constructor(title, author, format, isbn){
		this.title = title;
		this.author = author;
		this.format = format;
		this.ibsn = isbn;
		this.ID = Date.now();
	}
	static addBook(book) {
		if (book.format === 'physical') {
			books.push(book);
		} else {
			audiobooks.push(book)
		}
	}
}

physicalButton.addEventListener('click', () => {
	UI.activeTab = 'physical';
	UI.renderBooks(books);
})

//DECLARING AUDIO BOOK CLASS
class Audiobook extends Book {
	constructor(title, author, format, narrator) {
		super(title, author, format);
		this.narrator = narrator;
		this.ID = Date.now();
	}
}

//DECLARE UI CLASS
class UI {
	static activeTab = 'physical';
	static renderBooks(books) {
		displayPhysicalBooksContainer.style.display  = 'block';
		displayAudioBooksContainer.style.display = 'none';

		if (UI.activeTab === 'physical') {
			books.forEach((book) => {
				const liRow = document.createElement('li');
				const renderTitle = document.createElement('span');
				const renderAuthor = document.createElement('span');
				const renderFormat = document.createElement('span');
				const renderIsbn = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderTitle.textContent = book.title;
				renderAuthor.textContent = book.author;
				renderFormat.textContent = book.format;
				renderIsbn.textContent = book.isbn;
				deleteButton.textContent = 'Delete ❌';

				liRow.classList.add('physical-books-row');
				deleteButton.classList.add('delete-button');


				physicalBooksUl.append(liRow);
				liRow.append(renderTitle, renderAuthor, renderFormat, renderIsbn, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);
			});
		}
	}
}