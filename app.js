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
	registerForm.reset();
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
	static deleteBook(id, booksArray) {
		const index = booksArray.findIndex(book => book.ID.toString() === id.toString());
		if(index !== -1) {
			booksArray.splice(index, 1);
			if(UI.activeTab === 'physical') {
				UI.renderBooks(books)
			} else {
				UI.renderAudioBooks(audiobooks)
			}
		}
	}
}

physicalButton.addEventListener('click', () => {
	UI.activeTab = 'physical';
	UI.renderBooks(books);
})

audioButton.addEventListener('click', () => {
	UI.activeTab = 'audio';
	UI.renderAudioBooks(audiobooks);
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
		physicalBooksUl.textContent = '';

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

				liRow.dataset.id = book.ID

				physicalBooksUl.append(liRow);
				liRow.append(renderTitle, renderAuthor, renderFormat, renderIsbn, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Book.deleteBook(rowID, books);
				})
			});
		}
	}
	//---------------------------------
	static renderAudioBooks(audiobooks) {
		AudioBooksUl.textContent = '';
		displayPhysicalBooksContainer.style.display = 'none';
		displayAudioBooksContainer.style.display = 'block';

		if (UI.activeTab === 'audio') {
			audiobooks.forEach((audiobook) => {
				const liRow = document.createElement('li');
				const renderTitle = document.createElement('span');
				const renderAuthor = document.createElement('span');
				const renderFormat = document.createElement('span');
				const renderNarrator = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderTitle.textContent = audiobook.title;
				renderAuthor.textContent = audiobook.author;
				renderFormat.textContent = audiobook.format;
				renderNarrator.textContent = audiobook.narrator;
				deleteButton.textContent = 'Delete ❌';

				liRow.classList.add('audio-books-row');
				deleteButton.classList.add('delete-button');

				liRow.dataset.id = audiobook.ID

				AudioBooksUl.append(liRow);
				liRow.append(renderTitle, renderAuthor, renderFormat, renderNarrator, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e) => {
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Book.deleteBook(rowID, audiobooks);
				})
			})
		}
	}
}