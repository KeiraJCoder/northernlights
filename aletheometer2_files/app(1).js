document.addEventListener("DOMContentLoaded", function (event) {
  const tabsPrev = document.querySelector(".c-tabs-nav__previous");
  const tabsNext = document.querySelector(".c-tabs-nav__next");
  const tabs = document.querySelectorAll(".c-tabs-nav__link");
  const permutiveFields = document.querySelectorAll(
    "[name='Permutive_ID'], [name='permutive_user_id']"
  );
  if (0 !== permutiveFields) {
    for (let permField of permutiveFields) {
      permField.value = localStorage.getItem("permutive-id");
    }
  }
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      const pos = this.dataset.position;
      const panel = document.getElementById(`tab-panel-${pos}`);
      document
        .querySelectorAll(".c-tabs-nav__link.tab-is-active")
        .forEach((el) => el.classList.remove("tab-is-active"));
      this.classList.add("tab-is-active");
      document
        .querySelector(".c-tabs-content__panel.tab-is-active")
        .classList.remove("is-visible");
      setTimeout(function () {
        document
          .querySelector(".c-tabs-content__panel.tab-is-active")
          .classList.remove("tab-is-active");
        panel.classList.add("tab-is-active");
      }, 300);
      setTimeout(function () {
        panel.classList.add("is-visible");
      }, 400);
      if (
        document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) - 1}"]`
        )
      ) {
        tabsPrev.dataset.position = Number(pos) - 1;
        tabsPrev.innerText = document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) - 1}"]`
        ).innerText;
      } else {
        tabsPrev.dataset.position = "is-hidden";
      }
      if (
        document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) + 1}"]`
        )
      ) {
        tabsNext.dataset.position = Number(pos) + 1;
        tabsNext.innerText = document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) + 1}"]`
        ).innerText;
      } else {
        tabsNext.dataset.position = "is-hidden";
      }
    });
  });
  if(tabsPrev){
    tabsPrev.addEventListener("click", function (e) {
      e.preventDefault();
      const pos = this.dataset.position;
      const panel = document.getElementById(`tab-panel-${pos}`);
      document
        .querySelectorAll(".c-tabs-nav__link.tab-is-active")
        .forEach((el) => el.classList.remove("tab-is-active"));
      document
        .querySelector(`.c-tabs-nav__link[data-position="${pos}"]`)
        .classList.add("tab-is-active");
      document
        .querySelector(".c-tabs-content__panel.tab-is-active")
        .classList.remove("is-visible");
      setTimeout(function () {
        document
          .querySelector(".c-tabs-content__panel.tab-is-active")
          .classList.remove("tab-is-active");
        panel.classList.add("tab-is-active");
      }, 300);
      setTimeout(function () {
        panel.classList.add("is-visible");
      }, 400);
      tabsNext.dataset.position = Number(pos) + 1;
      tabsNext.innerText = document.querySelector(
        `.c-tabs-nav__link[data-position="${Number(pos) + 1}"]`
      ).innerText;
      if (
        document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) - 1}"]`
        )
      ) {
        this.dataset.position = Number(pos) - 1;
        this.innerText = document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) - 1}"]`
        ).innerText;
      } else {
        this.dataset.position = "is-hidden";
      }
    });
  }

  if(tabsNext){
    tabsNext.addEventListener("click", function (e) {
      e.preventDefault();
      const pos = Number(this.dataset.position);
      const panel = document.getElementById(`tab-panel-${pos}`);
      document
        .querySelectorAll(".c-tabs-nav__link.tab-is-active")
        .forEach((el) => el.classList.remove("tab-is-active"));
      document
        .querySelector(`.c-tabs-nav__link[data-position="${pos}"]`)
        .classList.add("tab-is-active");
      document
        .querySelector(".c-tabs-content__panel.tab-is-active")
        .classList.remove("is-visible");
      setTimeout(function () {
        document
          .querySelector(".c-tabs-content__panel.tab-is-active")
          .classList.remove("tab-is-active");
        panel.classList.add("tab-is-active");
      }, 300);
      setTimeout(function () {
        panel.classList.add("is-visible");
      }, 400);
      if (
        document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) + 1}"]`
        )
      ) {
        tabsNext.dataset.position = Number(pos) + 1;
        tabsNext.innerText = document.querySelector(
          `.c-tabs-nav__link[data-position="${Number(pos) + 1}"]`
        ).innerText;
      } else {
        tabsNext.dataset.position = "is-hidden";
      }
      tabsPrev.dataset.position = Number(pos) - 1;
      tabsPrev.innerText = document.querySelector(
        `.c-tabs-nav__link[data-position="${Number(pos) - 1}"]`
      ).innerText;
    });
  }
});
//Collapsible
function collapsible(val) {
  var element = document.getElementById("collapse");
  if (element.classList.contains("active")) {
    element.classList.add("active-close");
    val.classList.remove("c-btn--active");
    element.classList.remove("active");
  } else {
    element.classList.remove("active-close");
    val.classList.add("c-btn--active");

    element.classList.add("active");
  }
}

var over = document.getElementById('overlay');
over.addEventListener("click", function () {
  hidePopUp2();
})

if (document.getElementById('newsletter-pop-up')) {
  var upForm = document.getElementById('newsletter-pop-up').querySelector('.pop-up__form').getBoundingClientRect();
}

if(typeof showPopUp !== "function"){
  // function to show a pop-up
  // @param: id - of the pop-up
  function showPopUp(id) {
    if (id.includes('-a')) {
      id = id.replace('-a', '')
    }

    var popup = document.getElementById(id + '-pop-up');
    popup.style = null;
    popup.classList.add('is-active');

    if (id + '-pop-up' === 'newsletter-pop-up') {
      var subBox = popup.querySelector('.pop-up__submit-box');
      if (screen.width === 1280 && screen.height === 720) {
        subBox.style.top = upForm.bottom - 60 + 'px';
      }
      else if (screen.width >= 768) {
        subBox.style.top = upForm.bottom + 'px';
      }
      else {
        popup.style.maxHeight = 'none';
        var form = popup.querySelector('.pop-up__form');
        form.style.maxHeight = 'none';
      }
    }

    var blackout = over;
    popup.classList.remove('pop-out');
    blackout.classList.remove('c-overlay--mega-menu');
    blackout.classList.add('is-active');
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = "16px";
    popup.classList.add('pop-in');

    if (popup.querySelector('.pop-up__submit-box')) {
      var minusHeight = popup.querySelector('.pop-up__submit-box').offsetHeight;
      popup.querySelector('.pop-up__form').style.height = 'calc(100% - ' + minusHeight + 'px)';
    }
  }
}

//temp for static storefronts
function hidePopUp2() {
  let popups = document.getElementsByClassName("pop-up");
  let popups2 = document.getElementsByClassName("newsletter-pop-up");
  let bodySatic = document.getElementsByTagName("body")[0];
  overlay.classList.remove('is-active');

  setTimeout(function () {
    overlay.classList.remove("is-active"), 50;
  });

  Array.from(popups2).forEach((popup) => {
    popup.classList.add("pop-out");
    popup.classList.remove("pop-in");
    popup.classList.remove("is-active");
  });

  bodySatic.style.overflowY = "auto";
  document.body.style.overflowY = "auto";
  document.body.style.paddingRight = "0";
}
function checkStoreFrontsEmail(email){
  useFetchedStoreFrontsEmails(email);
};

function checkfirstname(firstname){
  let valid = false;
  const fn = firstname.value.trim();
  if (!isRequired(fn)) {
    showError(firstname, "This field is mandatory");
    movePlaceholder(firstname);
  } else if (firstname.value.length < 2) {
    showError(firstname, "First name has to be more than 2 characters");
    movePlaceholder(firstname);
  } else {
    showSuccess(firstname);
    movePlaceholder(firstname, true)
    valid = true;
  }
  return valid;
};

function checklastname(lastname){
  let valid = false;
  const ln = lastname.value.trim();
  if (!isRequired(ln)) {
    showError(lastname, "This field is mandatory");
    movePlaceholder(lastname);
  } else {
    showSuccess(lastname);
    movePlaceholder(lastname, true);
    valid = true;
  }
  return valid;
};

function checkcompany(company){
  let valid = false;
  const comp = company.value.trim();
  if (!isRequired(comp)) {
    showError(company, "This field is mandatory");
    movePlaceholder(company);
  } else {
    showSuccess(company);
    movePlaceholder(company, true);
    valid = true;
  }
  return valid;
};

function checkjobtitle(jobtitle){
  let valid = false;
  const jt = jobtitle.value.trim();
  if (!isRequired(jt)) {
    showError(jobtitle, "This field is mandatory");
    movePlaceholder(jobtitle);
  } else {
    showSuccess(jobtitle);
    movePlaceholder(jobtitle, true);
    valid = true;
  }
  return valid;
};

function checkcountry(country){
  let valid = false;
  const co = country.value;
  if (!isRequired(co)) {
    showError(country, "Please pick a country");
    movePlaceholder(country);
  } else if (co == "0") {
    showError(country, "Please pick a country");
    movePlaceholder(country);
    valid = false;
    return valid;
  } else {
    showSuccess(country);
    movePlaceholder(country, true);
    valid = true;
  }
  return valid;
};

function checkphone(phone){
  let valid = false;
  const ph = phone.value.trim();
  if (!isRequired(ph)) {
    showError(phone, "This field is mandatory");
    movePlaceholder(phone);
  } else if (phone.value.length <= 3) {
    showError(phone, "Please enter more characters");
    movePlaceholder(phone);
  } else {
    showSuccess(phone);
    movePlaceholder(phone, true);
    valid = true;
  }
  return valid;
};

function checkGdpr(consent){
  let valid = false;
  const con = consent.checked;
  if (con) {
    showSuccess(consent);
    movePlaceholder(consent, true);
    valid = true;
  } else {
    showError(consent, "This field is mandatory");
    movePlaceholder(consent);
  }
  return valid;
};

function checkmessage(enquiry){
  let valid = false;
  const msg = enquiry.value;
  if (!isRequired(msg)) {
    showError(enquiry, "This field is mandatory");
    movePlaceholder(enquiry);
  } else if (enquiry.value.length < 10) {
    showError(enquiry, "Please enter more characters");
    movePlaceholder(enquiry);
  } else {
    showSuccess(enquiry);
    movePlaceholder(enquiry, true);
    valid = true;
  }
  return valid;
};

 /*const checkGdpr = (consent) => {
   let valid = false;
   const vali = consent.checked;
   if (vali) {
     showSuccess(consent);
     valid = true;
   } else {
     showError(consent, "Consent required");
   }
   return valid;
 };*/

function validate(evt) {
  var theEvent = evt || window.event;
  // Handle paste
  if (theEvent.type === "paste") {
    key = event.clipboardData.getData("text/plain");
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
// this function returns true if the user input is empty
const isRequired = (value) => (value === "" ? false : true);
const showError = (input, message) => {
  // get the form-field element
  if (input.name === 'country') {
    var formField = input.parentElement.parentElement;
  }
  else{
    var formField = input.parentElement;
  }

  const error = formField.querySelector("small");
  const label = formField;
  error.textContent = message;
  // input.style.border = "1px solid #EB0000";
  // label.style.color = "#EB0000";
  // label.style.fontSize = "14px";
};

const showSuccess = (input) => {
  // get the form-field element
  if (input.name === 'country') {
    var formField = input.parentElement.parentElement;
  }
  else{
    var formField = input.parentElement;
  }
  const error = formField.querySelector("small");
  const label = formField;
  error.textContent = "";
  // input.style.border = "1px solid #7F7F7F";
  // label.style.color = "#7F7F7F";
};


var storeFrontForm = document.querySelector('#enquiryform');
if(storeFrontForm){
  var fields = storeFrontForm.querySelectorAll('.form-field > input[type="text"]');
  fields.forEach(element => {
    element.addEventListener("input", function(){
      if(element.name.replace('_', '').toLowerCase() !== 'jobfunction'){
        var functionName = 'check' + element.name.replace('_', '').toLowerCase();
        window[functionName](element);
      }
    });
  });
}

function formValidation(form, email = false, firstname = false, lastname = false, company = false, jobtitle = false, country = false, phone = false, consent = false, enquiry = false ){
  
    useFetchedStoreFrontsEmails(email).then((value) => {
      if(email){
        if (!value) return false;
      }
      if(firstname){
        if(!checkfirstname(firstname)) return false;
      }
      if(lastname)  {
        if(!checklastname(lastname)) return false;
      }
      if(company){
        if(!checkcompany(company)) return false;
      }
      if(jobtitle){
        if(!checkjobtitle(jobtitle)) return false;
      }
      if(country){
        if(!checkcountry(country)) return false;
      }
      if(phone){
        if(!checkphone(phone)) return false;
      }
      if(consent){
        if(!checkGdpr(consent)) return false;
      }
      if(enquiry){
        if(!checkmessage(enquiry)) return false;
      }
    
      var form_Id = form.id;
      var recaptcha = document.getElementById("recaptch_secret_key").value;
     if(recaptcha != ''){
      jQuery.ajax({
        url: "/wp-content/plugins/vms-automation/captcha.php",
        data: jQuery("form#" + form_Id).serialize(),
        type: "POST",
        complete: function (response) {
          //console.log("form submitted to curl ", data);
          let data_captcha = JSON.parse(response.responseText);
    if (data_captcha.status == 'success') {
      jQuery.ajax({
       url: "/wp-content/plugins/storefronts/storefront-ajaxcall.php",
       data: jQuery("form#enquiryform").serialize(),
       type: "POST",
       success: function (data) {
         console.log("form submitted to curl ", data);
       },
       error: function (ex) {
         console.log("form not submitted to curl");
       },
      });
      if(enquiry){
        form.style.display = "none";
        document.getElementById("enquiry").classList.add("enquirySuccess");
        document.getElementById("enq-success").style.display = "block"; 
      }
      else {
        form.style.display = "none";
        document.getElementById('enquiry3').classList.remove("hidden");
      }
    }
      else {
              document.getElementById("captcha").innerHTML = "Invalid Captcha";
            }
          },
          error: function (ex) {
            console.log("form not submitted to curl");
          },
        });
     }
     else{
      jQuery.ajax({
        url: "/wp-content/plugins/storefronts/storefront-ajaxcall.php",
        data: jQuery("form#enquiryform").serialize(),
        type: "POST",
        success: function (data) {
          console.log("form submitted to curl ", data);
        },
        error: function (ex) {
          console.log("form not submitted to curl");
        },
       });
       if(enquiry){
         form.style.display = "none";
         document.getElementById("enquiry").classList.add("enquirySuccess");
         document.getElementById("enq-success").style.display = "block"; 
       }
       else {
         form.style.display = "none";
         document.getElementById('enquiry3').classList.remove("hidden");
       }
     }
    });
}

// function to add new span with the value of placeholder
// @param: field - the field that you want to make red and move the placeholder
//         remove - if true it will remove the placeholder and the red border
function movePlaceholder(field, remove = false) {
	if (field.parentNode.getElementsByClassName('wrong').length <= 0) {
		var newSpan = document.createElement("span");
		newSpan.classList.add('wrong');
		newSpan.innerHTML = field.placeholder + ' *';
    if(field.placeholder === undefined){
      newSpan.innerHTML = "Country *";
    }
		field.classList.add('wrong-field');
    var small = field.parentElement.querySelector('small')
		field.parentNode.insertBefore(newSpan, small);
	}
	if (field.parentNode.querySelectorAll(".wrong").length > 0 && remove) {
		field.parentNode.querySelectorAll(".wrong")[0].style.color = "#252524";
		field.classList.remove('wrong-field');
	}
}

//toggle whitepaper form show
const btnShow = document.querySelector(".whitepaper__show");
const enquiryForm = document.querySelector(".enquiry-form-show");
const emailAdress = document.querySelector("#enq-email");

if(btnShow){
  btnShow.addEventListener("click", function () {
    useFetchedStoreFrontsEmails(this.form.Email).then((value) => {
      if (value) {
        enquiryForm.classList.remove("hidden");  
        btnShow.classList.add("hidden");
        emailAdress.classList.add('full-width')
      }
    });
  });
}

//toggle custom arrow for country select tag
document.addEventListener("click", function(evt) {
  var selectField = document.querySelector(".enquiry__input--select.select--country");
  targetElement = evt.target;

  if(targetElement == selectField) {
    selectField.classList.toggle('active');
  } else {
    selectField.classList.remove('active');
  }
});

//Project single collapse
function prjFunction() {
	var prjbtn = document.getElementById("prjBtn");
   		prjbtn.classList.toggle("prjtoggle--active");
   var prjtxt = document.getElementById("prjDIV");
   		prjtxt.classList.toggle("prj-show");
}
//Project single collapse end

async function fetchingStoreFrontsEmails() {
  const res = await fetch(urlToFetchStoreFrontsEmails);
  const data = res.text();
  return data;
}

async function useFetchedStoreFrontsEmails(email) {
  let data = await fetchingStoreFrontsEmails();
  data = data.replace(/\n/g, '');

  const excludedEmailsArr = data.split(",");
  excludedEmailsArr.shift();

  let valid = false;  
  const ea = email.value.trim();
  let emailDomain = ea.split("@");
  const matches = excludedEmailsArr.filter(element => {
    if (element.indexOf(emailDomain[1]) !== -1) {
      return true;
    }
  });

  if (matches.length > 0) {
    showError(email, "Please enter a work/business email address");
    movePlaceholder(email)
  } else if (!isRequired(ea)) {
    showError(email, "This field is mandatory");
    movePlaceholder(email)
  } else if (!isEmailValid(ea)) {
    showError(email, "Email is not valid");
    movePlaceholder(email);
  } else {
    showSuccess(email);
    movePlaceholder(email, true)
    valid = true;
  } 
  return valid;
}

const urlToFetchStoreFrontsEmails = "/wp-content/plugins/storefronts/free-disposable-email-providers.csv";
var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)([\w-]+\.)+[\w-]{2,4})?$/;
