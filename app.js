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
	console.log(audiobooks);
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

//DECLARING AUDIO BOOK CLASS
class Audiobook extends Book {
	constructor(title, author, format, narrator) {
		super(title, author, format);
		this.narrator = narrator;
		this.ID = Date.now();
	}
}
