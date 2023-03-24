import countryData from './postal-codes.js';

console.log(countryData);

const form = document.querySelector('form');
const email = document.getElementById('mail');
const errorEmail = email.nextElementSibling;

const country = document.getElementById('country');
const errorCountry = country.nextElementSibling;

const zip = document.getElementById('zipcode');
const errorZip = zip.nextElementSibling;

// As per the HTML Specification
const emailRegExp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
window.addEventListener('load', () => {
	// Here, we test if the field is empty (remember, the field is not required)
	// If it is not, we check if its content is a well-formed email address.
	const isEmailValid =
		email.value.length === 0 || emailRegExp.test(email.value);
	email.className = isEmailValid ? 'valid' : 'invalid';
	const isCountryValid = country.value.length === 0;
	country.className = isCountryValid ? 'valid' : 'invalid';
});

// This defines what happens when the user types in the field
email.addEventListener('input', () => {
	if (email.value.length === 0) {
		email.className = 'valid';
		errorEmail.textContent = '';
		errorEmail.className = 'error';
	} else if (emailRegExp.test(email.value)) {
		email.className = 'valid';
		errorEmail.textContent = 'email good';
		errorEmail.className = 'error good';
	} else {
		email.className = 'invalid';
		errorEmail.className = 'error';
		errorEmail.textContent = 'you are almost there';
	}
});
let countryMatch;
let zipRegExp;
let zipFormat

country.addEventListener('input', () => {
	countryMatch = false;
	countryData.forEach((el) => {
		if (el.Country.toLowerCase() === country.value.toLowerCase()) {
			countryMatch = true;
			zipRegExp = new RegExp(el.Regex);
            zipFormat = el.Format;
		}
	});

	if (country.value.length === 0) {
		country.className = 'valid';
		errorCountry.textContent = '';
		errorCountry.className = 'error';
		zip.disabled = true;
	} else if (countryMatch) {
		country.className = 'valid';
		errorCountry.textContent = 'good country';
		errorCountry.className = 'error good';
		zip.disabled = false;
	} else {
		country.className = 'invalid';
		errorCountry.textContent = 'country you are almost there.';
		errorCountry.className = 'error';
		zip.disabled = true;
	}
});

zip.addEventListener('input', () => {
	if (zip.value.length === 0) {
		zip.className = 'invalid';
		errorZip.textContent = '';
		errorZip.className = 'error';
	} else if (zipRegExp.test(zip.value)) {
		zip.className = 'valid';
		errorZip.textContent = 'ZIP good';
		errorZip.className = 'error good';
	} else {
		zip.className = 'invalid';
		errorZip.className = 'error';
		errorZip.textContent = `you are almost there. The format is: ${zipFormat}`;
	}
});

// ------------------ SUBMIT ----------------------
form.addEventListener('submit', (event) => {
	//MAIL
	if (email.value.length === 0) {
		email.className = 'valid';
		errorEmail.textContent = '';
		errorEmail.className = 'error';
	} else if (emailRegExp.test(email.value)) {
		email.className = 'valid';
		errorEmail.textContent = '';
		errorEmail.className = 'error';
	} else {
		event.preventDefault();
		email.className = 'invalid';
		errorEmail.className = 'error active';
		errorEmail.textContent = 'This is not an email';
	}
	//COUNTRY
	country.addEventListener('input', () => {
		countryMatch = false;
		countryData.forEach((el) => {
			if (el.Country.toLowerCase() === country.value.toLowerCase()) {
				countryMatch = true;
				zipRegExp = new RegExp(el.Regex);
			}
		});

		if (country.value.length === 0) {
			country.className = 'valid';
			errorCountry.textContent = '';
			errorCountry.className = 'error';
			zip.disabled = true;
		} else if (countryMatch) {
			country.className = 'valid';
			errorCountry.textContent = '';
			errorCountry.className = 'error';
			zip.disabled = false;
		} else {
			country.className = 'invalid';
			errorCountry.textContent =
				'We do not have such country on a list. Use official name. And not schortcuts.';
			errorCountry.className = 'error active';
			zip.disabled = true;
		}
	});

	//ZiPP
	if (zip.disabled === true) {
	} else if (!zip.disabled && zip.value.length === 0) {
		zip.className = 'invalid';
		errorZip.textContent = '';
		errorZip.className = 'error';
	} else if (!zip.disabled && zipRegExp.test(zip.value)) {
		zip.className = 'valid';
		errorZip.textContent = '';
		errorZip.className = 'error';
	} else if (!zip.disabled && !(zipRegExp.test(zip.value)) ) {
		event.preventDefault();
		zip.className = 'invalid';
		errorZip.className = 'error';
		errorZip.textContent = `Give me good ZIP or give me nothing! And the good ZIP for your country looks like that: ${zipFormat}`;
	}
});
