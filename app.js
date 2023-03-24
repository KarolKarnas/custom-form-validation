import countryData from './postal-codes.js';

console.log(countryData);

const form = document.querySelector('form');
const email = document.getElementById('mail');
const errorEmail = email.nextElementSibling;

const country = document.getElementById('country');
const errorCountry = country.nextElementSibling;

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
    }
    else {
		email.className = 'invalid';
        errorEmail.className = 'error';
		errorEmail.textContent = 'you are almost there';
	}
});



country.addEventListener('input', () => {

    let countryMatch;
    countryData.forEach((el) => {
        if (el.Country.toLowerCase() === country.value.toLowerCase()) {
            console.log(el.Regex);
            countryMatch = true;
        }
    });
	
	if (country.value.length === 0) {
		country.className = 'valid';
		errorCountry.textContent = '';
		errorCountry.className = 'error';
	} else if (countryMatch) {
        country.className = 'valid';
		errorCountry.textContent = 'good country';
		errorCountry.className = 'error good';
    }
    else {
		country.className = 'invalid';
		errorCountry.textContent = 'country you are almost there';
        errorCountry.className = 'error';
	}
});

// This defines what happens when the user tries to submit the data
form.addEventListener('submit', (event) => { 
	// const isEmailValid =
	// 	email.value.length === 0 || emailRegExp.test(email.value);
	// if (!isEmailValid) {
	// 	event.preventDefault();
	// 	email.className = 'invalid';
	// 	errorEmail.textContent = 'I expect an email, darling!';
	// 	errorEmail.className = 'error active';
	// } else {
	// 	email.className = 'valid';
	// 	errorEmail.textContent = '';
	// 	errorEmail.className = 'error';
	// }
//MAIL
if (email.value.length === 0) {
    email.className = 'valid';
    errorEmail.textContent = '';
    errorEmail.className = 'error';
} else if (emailRegExp.test(email.value)) {
    email.className = 'valid';
    errorEmail.textContent = '';
    errorEmail.className = 'error';

}
else {
    event.preventDefault()
    email.className = 'invalid';
    errorEmail.className = 'error active';
    errorEmail.textContent = 'This is not an email';
}
//COUNTRY
let countryMatch;
countryData.forEach((el) => {
    if (el.Country.toLowerCase() === country.value.toLowerCase()) {
        console.log(el.Regex);
        countryMatch = true;
    }
});

if (country.value.length === 0) {
    country.className = 'valid';
    errorCountry.textContent = '';
    errorCountry.className = 'error';
} else if (countryMatch) {
    country.className = 'valid';
    errorCountry.textContent = '';
    errorCountry.className = 'error';
}
else {
    event.preventDefault()
    country.className = 'invalid';
    errorCountry.textContent = 'We do not have such country on a list. Use official name. And not schortcuts.';
    errorCountry.className = 'error active';
}

});
