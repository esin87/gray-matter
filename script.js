const form = document.querySelector('.text-input-form');
const resultsSection = document.querySelector('.results');
let grayness = 'thirty';
const defaultText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const resultsParagraph = document.querySelector('.result-paragraph');
const displayResults = (results) => {
	resultsParagraph.innerHTML = results;
	resultsSection.style.display = 'block';
};

const grayOutText = (arr) => {
	const newArr = arr.map((str) => {
		//check if str includes punctuation
		const punctuation = str.match(/[.,\/#!$%\^&\*;:{}=\_`~()]/g);
		let newStr;
		if (punctuation) {
			newStr = str
				.split('')
				.filter((x) => x !== punctuation[0])
				.join('');
		} else {
			newStr = str;
		}
		//gray the middle letter of a three-letter word
		if (newStr.length === 3) {
			return `${newStr[0]}<span class=${grayness}>${newStr[1]}</span>${
				newStr[2]
			}${punctuation ? str[str.length - 1] : ''}`;
		} else if (newStr.length === 4) {
			//gray the middle two letters of four-letter words
			return `${newStr[0]}<span class=${grayness}>${newStr.substring(
				1,
				3
			)}</span>${newStr[3]}${punctuation ? str[str.length - 1] : ''}`;
		} else if (newStr.length === 5) {
			//gray the middle three letters of five-letter words
			return `${newStr[0]}<span class=${grayness}>${newStr.substring(
				1,
				4
			)}</span>${newStr[4]}${punctuation ? str[str.length - 1] : ''}`;
		} else if (newStr.length > 5) {
			//gray all but the first two and last two of 6-letter and longer words
			return `${newStr.substring(
				0,
				2
			)}<span class=${grayness}>${newStr.substring(
				2,
				newStr.length - 2
			)}</span>${newStr.substring(newStr.length - 2)}${
				punctuation ? str[str.length - 1] : ''
			}`;
		} else {
			return `${newStr}${punctuation ? str[str.length - 1] : ''}`;
		}
	});
	return newArr.join(' ');
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	let userInput = document.querySelector('#textInput').value;
	if (!userInput) userInput = defaultText;
	//handle radio buttons
	const radioButtons = document.querySelectorAll('input[name="grayness"]');
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			grayness = radioButton.value;
			break;
		}
	}
	const inputArray = userInput.split(' ');
	displayResults(grayOutText(inputArray));
});

const selectTextButton = document.querySelector('.select-text-button');

selectTextButton.addEventListener('click', (event) => {
	//https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
	const node = document.getElementById('result-paragraph');

	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(node);
		range.select();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		console.warn('Could not select text in node: Unsupported browser.');
	}
});
