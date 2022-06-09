/*********liveblog */
function liveBlogMethods(){
  if (0===document.getElementsByClassName('posts-liveblog').length) {
    return;
  }
  if (1025<window.screen.width) {
    return;
  }
  const relatedArticles = document.getElementById('relatedArticles');
  let liveBlog=document.getElementsByClassName('posts-liveblog')[0];
  let entries=liveBlog.getElementsByTagName('article');
  if (4>entries.length) {
    return;
  }
  entries[3].after(relatedArticles);
}
liveBlogMethods();

/*********Tabs */
function openCity(evt, cityName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Company A-Z scripts starts here
  let azBtn = document.querySelector('.c-az-filter--btn');
  let filters = document.querySelectorAll('.c-az-filter--active');
  if(azBtn && filters){
    window.addEventListener('resize',function(){
      addFilters();
    })
    function addFilters(){
      if(768 > filters && screen.width){
        let wrapper = document.querySelector('.az-wrapper').getBoundingClientRect();
        let navTab = document.querySelector('.navigation__tab');
        navTab.style.maxWidth = Math.round(wrapper.width) + 'px';
      }
      else{
        let navTab = document.querySelector('.navigation__tab');
        navTab.style.maxWidth = 'unset';
      }
      if(768 > azBtn && filters && screen.width){
        azBtn.addEventListener('click', function(){
          filters.forEach(function(filter){
            filter.classList.toggle('show');
            filter.addEventListener('click', function(){
              let select = filter.querySelector('.c-custom-select');
              select.classList.toggle('show');
              select.addEventListener('click', function(e){
                filters.forEach(function(filter){
                  filter.querySelector('.c-az-filter__text').innerHTML = filter.querySelector('.c-az-filter__text').getAttribute('default-value')
                })
                if(28 <= e.target.getAttribute('value').length ){
                  filter.querySelector('.c-az-filter__text').innerHTML = e.target.getAttribute('value').substring(0, 35) + '...';
                }
                else{
                  filter.querySelector('.c-az-filter__text').innerHTML = e.target.getAttribute('value')
                }
                sendAZRequest(e.target.getAttribute('value'), false)
              })
              let allOptions = filter.querySelectorAll('.reusable-select-component');
                allOptions.forEach(function(option){
                if(!option.querySelector('.show-all-btn') && !filter.classList.contains('c-az-filter--sort')){
                  let showAll = document.createElement('div');
                  showAll.classList.add('show-all-btn');
                  showAll.innerHTML = 'SHOW ALL';
                  showAll.addEventListener('click', function(e){
                    sendAZRequest(false, true);
                  })
                  option.appendChild(showAll);
                }
              })
            })
          })
        })
      }
      else{
        let defaultValues = [];
        if(filters){
          filters.forEach(function(filter){
            filter.addEventListener('click', function(e){
              let dynamicSelect = filter.querySelector('dynamic-select');
              let allDynamicSelects = document.querySelectorAll('dynamic-select')
              allDynamicSelects.forEach(function(select){
                if(dynamicSelect !== select){
                  select.classList.remove('show');
                  let allOptions = filter.querySelectorAll('.reusable-select-component');
                  allOptions.forEach(function(option){
                    option.addEventListener('click', function(e){
                      filters.forEach(function(filter){
                        filter.querySelector('.c-az-filter__text').innerHTML = filter.querySelector('.c-az-filter__text').getAttribute('default-value')
                      })
                      if( 28 <= e.target.getAttribute('value').length  ){
                        if(screen.width >= 768){
                          filter.querySelector('.c-az-filter__text').innerHTML = e.target.getAttribute('value').substring(0, 28) + '...';
                        }
                        else{
                          filter.querySelector('.c-az-filter__text').innerHTML = e.target.getAttribute('value').substring(0, 19) + '...';
                        }
                      }
                      else{
                        filter.querySelector('.c-az-filter__text').innerHTML = e.target.getAttribute('value')
                      }
                      sendAZRequest(e.target.getAttribute('value'), false)
                    })
                    if(!option.querySelector('.show-all-btn') && !filter.classList.contains('c-az-filter--sort')){
                      let showAll = document.createElement('div');
                      showAll.classList.add('show-all-btn');
                      showAll.innerHTML = 'SHOW ALL';
                      showAll.addEventListener('click', function(e){
                        sendAZRequest(false, true);
                      })
                      option.appendChild(showAll);
                    }
                  })
                }
              })
              dynamicSelect.classList.toggle('show');
            })
          })
        }
      }
    }
    addFilters();
    function sendAZRequest(value = false, restart = false){
      document.querySelector('.c-az-navigation').innerHTML = '<div class="thb-loading-bottom" id="loader"></div>';
      let wantedValues = [];
      let defaultValues = ['Region', 'Category', 'Sort By'];
      filters.forEach(function(filter){
        let item = filter.querySelector('.c-az-filter__text').innerHTML.replace('...', '');
        let index = defaultValues.indexOf(item);
        if (index !== -1) {
          wantedValues.push('');
        }
        else {
          wantedValues.push(encodeURIComponent(value));
        }
      })
      let request = new XMLHttpRequest();

      request.open('POST', document.querySelector('#ajax-url').value, true);
      request.onload = function () {
          if (200 <= this.status  && 400> this.status) {
            document.querySelector('.c-az-navigation').innerHTML = this.response;
            if(document.querySelector('#loader')){
              document.querySelector('#loader').remove();
            }
          }
      };
      request.onerror = function() {
      };

      if(restart){
        let reuqestQuery = 'action=companyaz_search&products_services='+ '' +'&region='+ '' +'&sort='+ '' +'&posttype=storefronts';
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        request.send(reuqestQuery);
      } else{
        let region = wantedValues[0] ? wantedValues[0] : "";
        let products_services = wantedValues[1] ? wantedValues[1] : "";
        let sort = wantedValues[2] ? wantedValues[2] : "";
        let reuqestQuery = 'action=companyaz_search&products_services='+ products_services +'&region='+ region +'&sort='+ sort +'&posttype=storefronts';
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        request.send(reuqestQuery);
      }

    }
  }
  {class dynamicSelect extends HTMLElement{
    connectedCallback() {
      this.render();
    }
    
    static get observedAttributes() {
      return ['items', 'className'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }

    render() {
      const items = this.attributes.items.value || '';
      const className = this.attributes.className.value || '';
      const items_list = items.split("|");
      let option = '';
      items_list.forEach(function(element){
        option += `<div value="${element.trim()}">${element.trim()}</div>`
      })
      this.innerHTML = `<div class="reusable-select-component ${className}">${option}</div>`;
    }
  }

  if(!window.customElements.get('dynamic-select')){
    window.customElements.define('dynamic-select', dynamicSelect);
  }
  
  jQuery(document).ready(function () {
    jQuery("#myInput").on("keyup", function () {
      let value = jQuery(this).val().toLowerCase();
      jQuery(".tabcontent .tab-content-area").filter(function () {
        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value) > -1);
		jQuery(".tabcontent h2").toggle(jQuery(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });
}
// IE pop-up for old <=ES5 browsers only
let popUp = document.getElementById("ie");
if(popUp){
  window.onload = function showIePopUp() {
    if (11==document.documentMode || 10==document.documentMode || 9==document.documentMode || 8==document.documentMode) {
        popUp.className += " display-message";
    }
  };
  let closeModalText = document.querySelector(".close-ie-modal-text");
  let closeModalCross = document.querySelector(".close-ie-modal-cross");
  closeModalText.onclick = function() {
      if (popUp.classList.contains('display-message')) {
          popUp.className -= " display-message";
      }
  };
  closeModalCross.onclick = function() {
      if (popUp.classList.contains('display-message')) {
          popUp.className -= " display-message";
      }
  };
}
