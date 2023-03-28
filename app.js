import countryData from './postal-codes.js';

console.log(countryData);

const form = document.querySelector('form');
const email = document.getElementById('mail');
const errorEmail = email.nextElementSibling;

const country = document.getElementById('country');
const errorCountry = country.nextElementSibling;

const zip = document.getElementById('zipcode');
const errorZip = zip.nextElementSibling;

const password = document.getElementById('password');
const errorPassword = password.nextElementSibling;

const confirm = document.getElementById('confirm');
const errorConfirm = confirm.nextElementSibling;

const iconPassword = document.getElementById('icon-password')
const iconConfirm = document.getElementById('icon-confirm')

const thankYou = document.getElementById('thank-you');
let displayFlag = false

const emailRegExp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordRegExp =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

window.addEventListener('load', () => {
	const isEmailValid =
		email.value.length === 0 || emailRegExp.test(email.value);
	email.className = isEmailValid ? 'valid' : 'invalid';
	const isCountryValid = country.value.length === 0;
	country.className = isCountryValid ? 'valid' : 'invalid';
});

email.addEventListener('input', () => {
	if (email.value.length === 0) {
		email.className = 'invalid';
		errorEmail.textContent = 'Sir, we need your email';
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
let zipFormat;

country.addEventListener('input', () => {
	countryMatch = false;
	zip.value = '';
	errorZip.textContent = '';
	errorZip.className = 'error';
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
		zip.className = 'invalid';
		errorZip.textContent = `you are almost there. The format is: ${zipFormat}`;
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

password.addEventListener('input', () => {
	 if (passwordRegExp.test(password.value)) {
		password.className = 'valid';
		errorPassword.textContent = 'Pass good enought';
		errorPassword.className = 'error good';
	} else {
		password.className = 'invalid';
		errorPassword.className = 'error';
		errorPassword.textContent = `Almost. Pass must heve:
        - 1 uppercase letter
        - 1 lowercase letter
        - 1 number 
        - 1 special character (@, $, !, %, *, ?, or &)
        - at least 8 characters long`;
	}
});

confirm.addEventListener('input', () => {
    if (confirm.value === password.value) {
		confirm.className = 'valid';
		errorConfirm.textContent = 'They are identicall';
		errorConfirm.className = 'error good';
	} else {
		confirm.className = 'invalid';
		errorConfirm.className = 'error';
		errorConfirm.textContent = `the pass must be identicall`;
	}
})


iconPassword.addEventListener('click', () => {
    if (password.type === 'text') {
        password.type = 'password'
        iconPassword.textContent = "visibility"
    } else {
        password.type = 'text'
        iconPassword.textContent = "visibility_off"
    }
})
iconConfirm.addEventListener('click', () => {
    if (confirm.type === 'text') {
        confirm.type = 'password'
        iconConfirm.textContent = "visibility"
    } else {
        confirm.type = 'text'
        iconConfirm.textContent = "visibility_off"
    }
})

// ------------ SUBMIT ---------------
form.addEventListener('submit', (event) => {
	//MAIL
	if (email.value.length === 0) {
		email.className = 'invalid';
		errorEmail.textContent = 'Hello, we need your email';
		errorEmail.className = 'error active';
        event.preventDefault()
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

	//ZIP
	if (zip.disabled === true) {
	} else if (!zip.disabled && zip.value.length === 0) {
		zip.className = 'invalid';
		errorZip.textContent = '';
		errorZip.className = 'error';
	} else if (!zip.disabled && zipRegExp.test(zip.value)) {
		zip.className = 'valid';
		errorZip.textContent = '';
		errorZip.className = 'error';
	} else if (!zip.disabled && !zipRegExp.test(zip.value)) {
		event.preventDefault();
		zip.className = 'invalid';
		errorZip.className = 'error';
		errorZip.textContent = `Give me good ZIP or give me nothing! And the good ZIP for your country looks like that: ${zipFormat}`;
	}


    //PASSWORD
        if (passwordRegExp.test(password.value)) {
           password.className = 'valid';
           errorPassword.textContent = '';
           errorPassword.className = 'error';
       } else {
        event.preventDefault();
           password.className = 'invalid';
           errorPassword.className = 'error active';
           errorPassword.textContent = `Almost. Pass must have:
           - 1 uppercase letter
           - 1 lowercase letter
           - 1 number 
           - 1 special character (@, $, !, %, *, ?, or &)
           - at least 8 characters long`;
       }
   
       if (confirm.value.length !== 0 && confirm.value === password.value) {
           confirm.className = 'valid';
           errorConfirm.textContent = '';
           errorConfirm.className = 'error good';
           thankYou.style= 'inherit'

           setTimeout(() => {
               thankYou.style.display='none'
           }, 5000);
       } else if (confirm.value.length === 0) {
        confirm.className = 'invalid';
        errorConfirm.className = 'error active';
        errorConfirm.textContent = `the confirm can not be empty Sir!`;
        event.preventDefault()
       }
        else {
        event.preventDefault();
           confirm.className = 'invalid';
           errorConfirm.className = 'error';
           errorConfirm.textContent = `the pass must be identical`;
       }
 
event.preventDefault()


});
