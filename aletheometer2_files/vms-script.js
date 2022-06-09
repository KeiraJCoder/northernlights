//Collapsible 
//alert(1);
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
async function fetchingEmails() {
  const res = await fetch(urlToFetchEmails);
  const data = res.text();

  return data;
}

async function useFetchedEmails(email) {
  let data = await fetchingEmails();
  data = data.replace(/\n/g, '');

  const excludedEmailsArr = data.split(",");
  excludedEmailsArr.shift();
  for ( let i = 0; i < excludedEmailsArr.length; ++i ) {
    excludedEmailsArr[i] = excludedEmailsArr[i].replace( /(\r\n|\n|\r)/gm, "" );
  }
  
  let valid = false;  
  const ea = email.value.trim();
  let emailDomain = ea.split("@");

  if (excludedEmailsArr.includes(emailDomain[1])) {
    showError_1(email, "Please enter a work/business email address");
    movePlaceholder(email)
  } else if (!isRequired_1(ea)) {
    showError_1(email, "This field is mandatory");
    movePlaceholder(email)
  } else if (!isEmailValid_1(ea)) {
    showError_1(email, "Email is not valid");
    movePlaceholder(email);
  } else {
    showSuccess_1(email);
    movePlaceholder(email, true)
    valid = true;
  } 

  return valid;
}

const checkEmail_1 = (email) => {
  useFetchedEmails(email);
};


const checkFirstName_1 = (firstname) => {
  let valid = false;
  const fn = firstname.value.trim();
  if (!isRequired_1(fn)) {
    showError_1(firstname, "This field is mandatory");
    movePlaceholder(firstname);
  } else if (firstname.value.length < 2) {
    showError_1(firstname, "First name has to be more than 2 characters");
    movePlaceholder(firstname);
  } else {
    showSuccess_1(firstname);
    movePlaceholder(firstname, true)
    valid = true;
  }
  return valid;
};

const checkLastName_1 = (lastname) => {
  let valid = false;
  const ln = lastname.value.trim();
  if (!isRequired_1(ln)) {
    showError_1(lastname, "This field is mandatory");
    movePlaceholder(lastname);
  } else {
    showSuccess_1(lastname);
    movePlaceholder(lastname, true);
    valid = true;
  }
  return valid;
};

const checkCompany_1 = (company) => {
  let valid = false;
  const comp = company.value.trim();
  if (!isRequired_1(comp)) {
    showError_1(company, "This field is mandatory");
    movePlaceholder(company);
  } else {
    showSuccess_1(company);
    movePlaceholder(company, true);
    valid = true;
  }
  return valid;
};

const checkJobTitle_1 = (jobtitle) => {
  let valid = false;
  const jt = jobtitle.value.trim();
  if (!isRequired_1(jt)) {
    showError_1(jobtitle, "This field is mandatory");
    movePlaceholder(jobtitle);
  } else {
    showSuccess_1(jobtitle);
    movePlaceholder(jobtitle, true);
    valid = true;
  }
  return valid;
};

const checkCountry_1 = (country) => {
  let valid = false;
  const co = country.value;
  if (!isRequired_1(co)) {
    showError_1(country, "Please pick a country");
    movePlaceholder(country);
  } else if (co == "0") {
    showError_1(country, "Please pick a country");
    movePlaceholder(country);
    valid = false;
    return valid;
  } else {
    showSuccess_1(country);
    movePlaceholder(country, true);
    valid = true;
  }
  return valid;
};

const checkPhone_1 = (phone) => {
  let valid = false;
  const ph = phone.value.trim();
  if (!isRequired_1(ph)) {
    showError_1(phone, "This field is mandatory");
    movePlaceholder(phone);
  } else if (phone.value.length <= 3) {
    showError_1(phone, "Please enter more characters");
    movePlaceholder(phone);
  } else {
    showSuccess_1(phone);
    movePlaceholder(phone, true);
    valid = true;
  }
  return valid;
};

const checkMessage = (enquiry) => {
  let valid = false;
  const msg = enquiry.value.trim();
  if (!isRequired(msg)) {
    showError(enquiry, "This field is mandatory");
  } else if (enquiry.value.length < 10) {
    showError(enquiry, "Please enter more characters");
  } else {
    showSuccess(enquiry);
    valid = true;
  }
  return valid;
};

const checkConsent_1 = (sendGR) => {
  let valid = false;
  const consent = sendGR.checked;
  if (!consent) {
    showError_1(sendGR, "Consent is required");
    //movePlaceholder(sendGR);
  } else {
    showSuccess_1(sendGR);
    //movePlaceholder(sendGR, true);
    valid = true;
  }
  return valid;
};

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

const isEmailValid_1 = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
// this function returns true if the user input is empty
const isRequired_1 = (value) => (value === "" ? false : true);
const showError_1 = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  const label = formField;
  error.textContent = message;
  // input.style.border = "1px solid #EB0000";
  // label.style.color = "#EB0000";
  // label.style.fontSize = "14px";
};

const showSuccess_1 = (input) => {
  // get the form-field element
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  const label = formField;
  error.textContent = "";
  // input.style.border = "1px solid #7F7F7F";
  // label.style.color = "#7F7F7F";
};

function VMSformValidation(
  form,
  email,
  firstname,
  lastname,
  company,
  jobtitle,
  country,
  phone,
  sendGR = false
) {

  checkEmail_1(email);
  checkFirstName_1(firstname);
  checkLastName_1(lastname);
  checkCompany_1(company);
  checkJobTitle_1(jobtitle);
  checkCountry_1(country);
  checkPhone_1(phone);

  /**
   * Summary. (Validate enquiry field)
   *
   * Description. (Check if enquiry field is required in (enquiry/whitepaper) and then execute block for the corrrect validation rules)
   *
   * @param enquiry
   */
  
  useFetchedEmails(email).then((value) => {
    var wpValid = 
      value &&
      checkFirstName_1(firstname) &&
      checkLastName_1(lastname) &&
      checkCompany_1(company) &&
      checkJobTitle_1(jobtitle) &&
      checkCountry_1(country) &&
      checkPhone_1(phone);
    if (sendGR) { wpValid &&= checkConsent_1(sendGR); }

    var form_Id = form.id;
    var recaptcha = document.getElementById("recaptch_secret_key").value;
    if (wpValid) {
     if(recaptcha != '') {
      jQuery.ajax({
        //url: "/wp-admin/admin-ajax.php?action=ajaxcaptchavalidation",
        url: "/wp-content/plugins/vms-automation/captcha.php",
        data: jQuery("form#" + form_Id).serialize(),
        type: "POST",
        complete: function (response) {
          // console.log("form submitted to curl ", data);
          let data_captcha = JSON.parse(response.responseText);
          if (data_captcha.status == 'success') {
            // ajax start
            jQuery.ajax({
              url: "/wp-content/plugins/vms-automation/handler-ajaxcall.php",
              data: jQuery("form#" + form_Id).serialize(),
              type: "POST",
              success: function (data) {
                // console.log("form submitted to curl ", data);
              },
              error: function (ex) {
                console.log("form not submitted to curl");
              },
            });
            // ajax end
            form.style.display = "none";
            if (form_Id == "enquiryform_1") {
              document.getElementById('enquiry3_1').classList.remove("hidden");
            } else {
              document.getElementById('enquiry3_2').classList.remove("hidden");
            }
          }
          else {
            alert('Inavlid Captcha');
            //document.getElementById('err_msg').classList.remove("hidden");
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
        url: "/wp-content/plugins/vms-automation/handler-ajaxcall.php",
        data: jQuery("form#" + form_Id).serialize(),
        type: "POST",
        success: function (data) {
          console.log("form submitted to curl ", data);
        },
        error: function (ex) {
          console.log("form not submitted to curl");
        },
       });
       form.style.display = "none";
       if (form_Id == "enquiryform_1") {
         document.getElementById('enquiry3_1').classList.remove("hidden");
       } else {
         document.getElementById('enquiry3_2').classList.remove("hidden");
       }
    }
   }
 });


  const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
      // cancel the previous timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // setup a new timer
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };

  form.addEventListener(
    "input",
    debounce(function (e) {
      switch (e.target.id) {
        case "enq-email-vms":
          checkEmail_1(email);
          break;
        case "enq-first-name":
          checkFirstName_1(firstname);
          break;
        case "enq-last-name":
          checkLastName_1(lastname);
          break;
        case "enq-company":
          checkCompany_1(company);
          break;
        case "enq-job-title":
          checkJobTitle_1(jobtitle);
          break;
        case "enq-message":
          if (enquiry) {
            checkMessage(enquiry);
          }
          break;
        case "enq-country":
          checkCountry_1(country);
          break;
        case "enq-phone":
          checkPhone_1(phone);
          break;
        case "enq-gdpr":
          if (sendGR) {
            checkConsent_1(sendGR);
          }
          break;
      }
    })
  );
}

// function to add new span with the value of placeholder
// @param: field - the field that you want to make red and move the placeholder
//         remove - if true it will remove the placeholder and the red border
function movePlaceholder(field, remove = false) {
  if (field.parentNode.getElementsByClassName('wrong').length <= 0) {
    var newSpan = document.createElement("span");
    newSpan.classList.add('wrong');
    newSpan.innerHTML = field.placeholder + ' *';
    if (field.placeholder === undefined) {
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


// toggle whitepaper form show
const btnShow1 = document.querySelector(".whitepaper__show_1");
const enquiryForm1 = document.querySelector(".enquiry-form-show_1");
const emailAdress1 = document.querySelector("#enq-email-vms");
const emailErrorMsg = document.querySelector('.email-error-message');
const urlToFetchEmails = "/wp-content/plugins/vms-automation/free-disposable-email-providers.csv";
var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)([\w-]+\.)+[\w-]{2,4})?$/;

jQuery('#vms_description_1').hide();

if (btnShow1) {
  btnShow1.addEventListener("click", function () {
    useFetchedEmails(this.form.Email).then((value) => {
      if (value) {
        enquiryForm1.classList.remove("hidden");
        btnShow1.classList.add("hidden");
      }
    });
  });
}


//toggle whitepaper form show
if (btnShow1) {
  const btnShow2 = document.querySelector(".whitepaper__show_2");
  const enquiryForm2 = document.querySelector(".enquiry-form-show_2");
  const emailAdress2 = document.querySelector("#enq-email-vms");
  enquiryForm2.classList.remove("hidden");
  btnShow2.classList.add("hidden");
}

//Project single collapse
function prjFunction() {
  var prjbtn = document.getElementById("prjBtn");
  prjbtn.classList.toggle("prjtoggle--active");
  var prjtxt = document.getElementById("prjDIV");
  prjtxt.classList.toggle("prj-show");
}
//Project single collapse end