// newsletter in-article block & all newsletters template scripts
// function for checking if email is passing the validation regex
// @param: email - that you want to check
function emailValidation(email) {
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
// function for email validation of newsletter/all-newsletters
// @param: form - the form that you want to validate
//         email - the email field that you want to validate
function validateNewsletters(form, email) {
	let error = '';
	let button = '';
	let consent__error = '';
	if (null === document.querySelector('.pop-up__submit-box')) {
		error = form.querySelector('.all-newsletters-form__submit').querySelector('.all-newsletters-form__error');
		error.style.width = email.offsetWidth + 'px';
		button = form.querySelector('.all-newsletters-form__submit').querySelector('.submit');
		consent__error = form.querySelector('.all-newsletters-form__submit').querySelector('.consent__error');
		captcha__error = form.querySelector('.all-newsletters-form__submit').querySelector('.captcha__error');
	}
	else {
		error = document.querySelector('.pop-up__submit-box').querySelector('.pop-up__error');
		button = document.querySelector('.submit');
		consent__error = document.querySelector('.pop-up__submit-box').querySelector('.consent__error');
		captcha__error = form.querySelector('.pop-up__submit-box').querySelector('.captcha__error');
	}
	var recaptcha = document.getElementById("recaptch_site_key");
	if(recaptcha != null){
	const Recaptch_Validation = document.getElementById("g-recaptcha-response").required = true;
    }
	let checksTrue = [].filter.call(form.querySelectorAll('input[id^="_pardot"]')
	, function (el) {
		return el.checked;
	});
	// you need to add your "error" field and your submit "button" in order to use this form
	if (0 != checksTrue.length) {
		form.querySelectorAll('input[id^="_pardot"]').forEach(function (el) {
			el.required = false;
		})
		button.classList.remove('reverse-colors');
	}
	else {
		form.querySelectorAll('input[id^="_pardot"]').forEach(function (el) {
			el.required = true;
		})
		button.classList.remove('reverse-colors');
	}
	if (email.value.length <= 6 || !emailValidation(email.value)) {
		error.innerHTML = "This field is mandatory";
		email.style.border = '1px solid #EB0000';
		email.style.color = "#EB0000";
		movePlaceholder(email);
		return false;
	} else if (emailValidation(email.value)) {
		error.innerHTML = '';
		consent__error.innerHTML = '';
		email.style.border = '1px solid #000000';
		email.style.color = '#000000';
		movePlaceholder(email, true);
		button.classList.remove('reverse-colors');
		button.disabled = false;
		if (checksTrue.length <= 0) {
			error.innerHTML = "You need to select at least 1 newsletter!";
			return false;
		}
		if(null === document.querySelector('[name="consent"]:checked')){
			consent__error.innerHTML = "You need to give your consent if you want to proceed";
			return false;
		}
		if(recaptcha != null){
		var response = grecaptcha.getResponse();
		if( 0 === response.length )
		{ 
		  //reCaptcha not verified
		  captcha__error.innerHTML = "Please Verify you are human!";
		}
	   }
	} else {
		error.innerHTML = "This field is mandatory";
		email.style.border = '1px solid #EB0000';
		email.style.color = '#EB0000';
		movePlaceholder(email);
		button.classList.add('reverse-colors');
		button.disabled = true;
		return false;
	}
}

// function that closes all pop-ups and shows the "Thank you" one
function afterSubmit() {
	hidePopUp();
	setTimeout(function () { showPopUp('thank-you'); }, 150);
	const captcha = document.getElementById('captcha_error');
	captcha.remove();
}

if (document.getElementById('newsletter-pop-up')) {
	let upForm = document.getElementById('newsletter-pop-up').querySelector('.pop-up__form').getBoundingClientRect();
}

// function to show a pop-up
// @param: id - of the pop-up
function showPopUp(id) {
	if (id.includes('-a')) {
		id = id.replace('-a', '')
	}
	let popup = document.getElementById(id + '-pop-up');
	popup.style = null;
	popup.classList.add('is-active');

	let blackout = document.getElementById('overlay');
	popup.classList.remove('pop-out');
	blackout.classList.remove('c-overlay--mega-menu');
	blackout.classList.add('is-active');
	document.body.style.overflowY = 'hidden';
	document.body.style.paddingRight = "16px";
	popup.classList.add('pop-in');
}

// function to hide all pop-ups
function hidePopUp() {
	if(document.getElementsByClassName('pop-in').length !== 0){	
		let popups = document.getElementsByClassName('pop-in');
		setTimeout(function () { overlay.classList.remove('is-active'), 50 });

		Array.from(popups).forEach((popup) => {
			popup.classList.add('pop-out');
			popup.classList.remove('pop-in');
			popup.classList.remove('is-active');
		})
		
		document.body.style.overflowY = 'auto';
		document.body.style.paddingRight = "0";
	}
}

// function to add new span with the value of placeholder
// @param: field - the field that you want to make red and move the placeholder
//         remove - if true it will remove the placeholder and the red border
function movePlaceholder(field, remove = false) {
	if (document.getElementsByClassName('wrong').length <= 0) {
		let newSpan = document.createElement("span");
		newSpan.classList.add('wrong');
		newSpan.innerHTML = field.placeholder + ' *';
		field.classList.add('wrong-field');
		field.parentNode.appendChild(newSpan, field);
	}
	else {
		field.parentNode.querySelectorAll(".wrong")[0].style.color = '';
	}
	if (field.parentNode.querySelectorAll(".wrong").length > 0 && remove) {
		field.parentNode.querySelectorAll(".wrong")[0].style.color = "#252524";
		field.classList.remove('wrong-field');
	}
}
let newsCheck = document.querySelectorAll(".newsletter-item__subscribe-box input[type='checkbox']");
let toBeChecked = document.querySelectorAll(".newsletter-item__subscribe-box .check");
let alreadyChecked = document.querySelectorAll(".newsletter-item__subscribe-box .checked");

if (newsCheck.length > 0) {
	let form = document.querySelector(".all-newsletters-form");
	let email = document.getElementsByName('email')[0];
	let consent = document.querySelector('[name="consent"]');
	consent.addEventListener('change', function () {
		validateNewsletters(form, email);
	});
	for (let i = 0; i < newsCheck.length; i++) {
		let checkbox = newsCheck[i];
		checkbox.onmouseover = function () {
			this.parentNode.querySelectorAll(".check")[0].style.opacity = "0.7";
			this.parentNode.querySelectorAll(".checked")[0].style.opacity = "0.7";
		}
		checkbox.onmouseout = function () {
			this.parentNode.querySelectorAll(".check")[0].style.opacity = "1";
			this.parentNode.querySelectorAll(".checked")[0].style.opacity = "1";
		}
		checkbox.addEventListener('change', function () {
			if ('hidden' === this.parentNode.querySelectorAll(".check")[0].style.visibility) {
				this.parentNode.querySelectorAll(".check")[0].style.visibility = 'visible';
				this.parentNode.querySelectorAll(".checked")[0].style.visibility = 'hidden';
				this.value = '';
				this.checked = false;
				validateNewsletters(form, email);
			}
			else {
				this.parentNode.querySelectorAll(".check")[0].style.visibility = 'hidden';
				this.parentNode.querySelectorAll(".checked")[0].style.visibility = 'visible';
				this.value = 'true';
				this.checked = true;
				validateNewsletters(form, email);
			}
		});
	}
	for (let i = 0; i < toBeChecked.length; i++) {
		toBeChecked[i].addEventListener('click', function () {
			if (this.parentNode.querySelectorAll(".check")[0].style.visibility !== 'hidden') {
				this.parentNode.querySelectorAll(".check")[0].style.visibility = 'hidden';
				this.parentNode.querySelectorAll(".checked")[0].style.visibility = 'visible';
				let box = this.parentNode.querySelector("input[type='checkbox']");
				box.checked = true;
				box.value = true;
				validateNewsletters(form, email);
			}
		})
	}
	for (let i = 0; i < alreadyChecked.length; i++) {
		alreadyChecked[i].addEventListener('click', function () {
			if ('hidden' === this.parentNode.querySelectorAll(".check")[0].style.visibility) {
				this.parentNode.querySelectorAll(".check")[0].style.visibility = 'visible';
				this.parentNode.querySelectorAll(".checked")[0].style.visibility = 'hidden';
				let box = this.parentNode.querySelector("input[type='checkbox']");
				box.checked = false;
				box.value = '';
				validateNewsletters(form, email);
			}
		})
	}
}
else {
	let newsCheck = document.querySelectorAll(".pop-up__inner input[type='checkbox']");
	let form = document.querySelector(".pop-up__form");
	let email = document.getElementsByName('email')[0];
	for (let i = 0; i < newsCheck.length; i++) {
		let checkbox = newsCheck[i];
		checkbox.addEventListener('change', function () {
			if ('' === this.value) {
				this.value = 'true';
				// if we want to validate the form on every checked checkbox uncomment the function below
				// validateNewsletters(form, email);
			}
			else {
				this.value = '';
				// if we want to validate the form on every checked checkbox uncomment the function below
				// validateNewsletters(form, email);
			}
		});
	}
}
function reverseColors(value){
	let button = document.querySelector('.submit');
	button.classList.remove('reverse-colors');
}

document.getElementsByClassName('email-input').onkeydown = function (evt) {
    if (13 === evt.which) {
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    }
};
document.getElementsByClassName('email-input').onkeyup = function (evt) {
    if (13 === evt.which) {
        evt.preventDefault();
        evt.stopPropagation();
        return false;
    }
};
