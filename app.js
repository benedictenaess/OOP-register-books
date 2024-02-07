//SELECTED ELEMENTS
const audioButton = document.querySelector('.audio-button');
const physicalButton = document.querySelector('.physical-button');
const selectElement = document.querySelector('.select');
const isbnInput = document.querySelector('.isbn');
const narratorInput = document.querySelector('.narrator')

//SELECT ELEMENT
selectElement.addEventListener('change', ()=> {
	if (selectElement.value === 'physical') {
		isbnInput.removeAttribute('disabled');
		narratorInput.setAttribute('disabled', '');
	} else {
		isbnInput.setAttribute('disabled', '');
		narratorInput.removeAttribute('disabled');
	}
});

//DECLARING PHYSICAL BOOK CLASS
class Book {
	constructor(title, author, format, isbn){
		this.title = title;
		this.author = author;
		this.format = format;
		this.ibsn = isbn;
		this.ID = Date.now();
	}
}

//DECLARING AUDIO BOOK CLASS
class AudioBook extends Book {
	constructor(title, author, format, narrator) {
		super(title, author, format);
		this.narrator = narrator;
		this.ID = Date.now();
	}
}
