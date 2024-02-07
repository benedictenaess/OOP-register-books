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

