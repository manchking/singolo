
window.onload = function() {
  addNavClickHandler();
  addSliderClickHandler();
  addGalleryClickHandler();
  showHideModal();
  windowScrollHandler();
}

// Navigation
const addNavClickHandler = () => {
  document.querySelector('.nav-bar').addEventListener('click', (event) => {
    if(event.target.classList.contains('nav-bar__item__link')) {
      let clickedItem = event.target;
      switch(clickedItem.innerHTML){
        case 'HOME':
          scrollToId('home');
          break;
        case 'SERVICES':
          scrollToId('services');
          break;
        case 'PORTFOLIO':
          scrollToId('portfolio');
          break;
        case 'ABOUT':
          scrollToId('about');
          break;
        case 'CONTACT':
          scrollToId('contact');
          break;
      }
    }
  });
}

const scrollToId = (id) => {
  let el = document.getElementById(id);
  let navBarHeight = document.getElementById('home').offsetHeight;
  let y = el.getBoundingClientRect().top - navBarHeight;
  if(id !== 'home') y += pageYOffset;
  window.scrollTo({
    top: y,
    behavior: 'smooth'
  })
}

const windowScrollHandler = () => {
  let activeNav = document.getElementById('nav-bar_home');
  window.addEventListener('scroll', (event) => {
    let servicesPosY = document.getElementById('services').getBoundingClientRect().top;
    let portfolioPosY = document.getElementById('portfolio').getBoundingClientRect().top;
    let aboutPosY = document.getElementById('about').getBoundingClientRect().top;
    let contactPosY = document.getElementById('contact').getBoundingClientRect().top;
    let prevNav = document.querySelector('.nav-bar__item__link_active');
    if(window.pageYOffset < 70){
      activeNav = document.getElementById('nav-bar_home');
      prevNav.className = 'nav-bar__item__link';
      activeNav.className = 'nav-bar__item__link_active';
    }
    if(Math.abs(servicesPosY) < 100){
      activeNav = document.getElementById('nav-bar_services');
      prevNav.className = 'nav-bar__item__link';
      activeNav.className = 'nav-bar__item__link_active';
    }
    if(Math.abs(portfolioPosY) < 100){
      activeNav = document.getElementById('nav-bar_portfolio');
      prevNav.className = 'nav-bar__item__link';
      activeNav.className = 'nav-bar__item__link_active';
    }
    if(Math.abs(aboutPosY) < 100){
      activeNav = document.getElementById('nav-bar_about');
      prevNav.className = 'nav-bar__item__link';
      activeNav.className = 'nav-bar__item__link_active';
    }
    if(Math.abs(contactPosY) < 370){
      activeNav = document.getElementById('nav-bar_contact');
      prevNav.className = 'nav-bar__item__link';
      activeNav.className = 'nav-bar__item__link_active';
    }
  })
}

// Portfolio
const addGalleryClickHandler = () => {
  document.querySelector('.gallery').addEventListener('click', (event) => {
    let clickedItem = event.target;
    if(event.target.classList.contains('sorting-button')) {
      changeSortingTag(clickedItem);
      removeHighlightGalleryImg();
      sortingGalleryImgs(clickedItem);
    }
    if(event.target.classList.contains('gallery__preview')) {
      highlightGalleryImg(clickedItem);
    }
  })
}

const changeSortingTag = (clickedItem) => {
  let removeItem = document.querySelector('.sorting-button_active');
  removeItem.classList.remove('sorting-button_active');
  clickedItem.classList.add('sorting-button_active');
}

const sortingGalleryImgs = (clickedItem) => {
  let tag = clickedItem.value.toLowerCase();
  let galleryImgs = document.querySelectorAll('.gallery__preview');
  if (tag === 'all') {
    galleryImgs.forEach(img => {
      img.classList.remove('hidden');
    })
  } else{
    galleryImgs.forEach(img => {
      img.dataset.tag === tag? img.classList.remove('hidden') : img.classList.add('hidden');
    })
  }
}

const highlightGalleryImg = (clickedItem) => {
  let removeItem = document.querySelector('.gallery__preview_active');
  if(removeItem){
    removeItem.classList.remove('gallery__preview_active');
  }
  clickedItem.classList.add('gallery__preview_active');
}

const removeHighlightGalleryImg = () => {
  let removeItem = document.querySelector('.gallery__preview_active');
  if(removeItem){
    removeItem.classList.remove('gallery__preview_active');
  }
}

// Modal window
const showHideModal = () => {
  let form = document.forms.contact;
  form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let subject = form.subject.value;
    let description = form.description.value;
    if(!subject){
      subject = 'No subject';
    }
    if(!description){
      description = 'No description';
    }
    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<p class="modal__title">Mail send</p>
      <p><span class="modal__subtitle">Subject: </span>${subject}</p>
      <p><span class="modal__subtitle"> Description: </span>${description}</p>
      <input type="button" value="OK" class="modal__button">`;
    form.submit.disabled = 1;
    document.body.prepend(overlay);
    document.querySelector('.overlay').append(modal);
    document.querySelector('.modal__button').addEventListener('click', () => {
      document.querySelector('.overlay').remove();
      form.name.value = '';
      form.email.value = '';
      form.subject.value = '';
      form.description.value = '';
      form.submit.disabled = 0;
    })
  })
}

// Slider
const addSliderClickHandler = () => {
  let slides = Array.from(document.querySelectorAll('.slide'));
  let activeSlide = slides.find(item => item.hidden === false);
  let activeSlideIndex = slides.indexOf(activeSlide);
  let phoneVertical = document.querySelector('.phone__vertical');
  let phoneHorizontal = document.querySelector('.phone__horizontal');
  document.querySelector('.slider').addEventListener('click', (event) => {
    let clickedItem = event.target;
    // Slider buttons
    if(clickedItem.classList.contains('slider__prev')){
      activeSlideIndex--;
    }
    if(clickedItem.classList.contains('slider__next')){
      activeSlideIndex++;
    }
    if(activeSlideIndex === slides.length) activeSlideIndex = 0;
    if(activeSlideIndex < 0) activeSlideIndex = slides.length-1;
    slides.forEach(item => {item.style.opacity = 0; item.style.zIndex = "";});
    slides[activeSlideIndex].style.opacity = 100;
    slides[activeSlideIndex].style.zIndex = 10;
    // Phones
    if(clickedItem.classList.contains('phone__vertical')){
      if(phoneVertical.dataset.active === "true"){
        phoneVertical.classList.remove('iphone-vertical');
        phoneVertical.classList.add('iphone-vertical_disabled');
        phoneVertical.dataset.active = "false";
      } else{
        phoneVertical.classList.remove('iphone-vertical_disabled');
        phoneVertical.classList.add('iphone-vertical');
        phoneVertical.dataset.active = "true";
      }
    }
    if(clickedItem.classList.contains('phone__horizontal')){
      if(phoneHorizontal.dataset.active === "true"){
        phoneHorizontal.classList.remove('iphone-horizontal');
        phoneHorizontal.classList.add('iphone-horizontal_disabled');
        phoneHorizontal.dataset.active = "false";
      } else{
        phoneHorizontal.classList.remove('iphone-horizontal_disabled');
        phoneHorizontal.classList.add('iphone-horizontal');
        phoneHorizontal.dataset.active = "true";
      }
    }
  })
}
/*const addSliderClickHandler = () => {
  let slides = Array.from(document.querySelectorAll('.slide'));
  let activeSlide = slides[0];
  let activeSlideIndex = slides.indexOf(activeSlide);
  let prevSlideIndex = activeSlideIndex - 1;
  if(prevSlideIndex < 0) prevSlideIndex = slides.length-1;
  let nextSlideIndex = activeSlideIndex + 1;
  if(nextSlideIndex === slides.length) nextSlideIndex = 0;
  let phoneVertical = document.querySelector('.phone__vertical');
  let phoneHorizontal = document.querySelector('.phone__horizontal');
  let clickedItem;
  document.querySelector('.slider').addEventListener('click', (event) => {
    clickedItem = event.target;
    // Slider buttons
    if(clickedItem.classList.contains('slider__prev')){
      prevSlideIndex = activeSlideIndex;
      activeSlideIndex--;
      nextSlideIndex++;
      if(activeSlideIndex === slides.length) activeSlideIndex = 0;
      if(activeSlideIndex < 0) activeSlideIndex = slides.length-1;
      if(prevSlideIndex < 0) prevSlideIndex = slides.length-1;
      if(prevSlideIndex === slides.length) prevSlideIndex = 0;
    }
    if(clickedItem.classList.contains('slider__next')){
      slides[nextSlideIndex].style.transform = 'translate(-1020px)';
      slides[nextSlideIndex].style.left = '-1020px';
      slides[activeSlideIndex].style.transform = 'translate(0)';
      slides[activeSlideIndex].style.left = '0px';
      slides[activeSlideIndex].style.transform = 'translate(1020px)';
      slides[nextSlideIndex].style.transform = 'translate(1020px)';
      prevSlideIndex = activeSlideIndex;
      activeSlideIndex = nextSlideIndex;
      nextSlideIndex = activeSlideIndex + 1;
      if(nextSlideIndex === slides.length) nextSlideIndex = 0;
      //slides[prevSlideIndex].style.transform = 'translate(0px)';
      //slides[prevSlideIndex].style.left = '-1020px';
      //slides[nextSlideIndex].style.transform = 'translate(0px)';
      //slides[nextSlideIndex].style.left = 0 -slides[activeSlideIndex].offsetWidth + 'px';
    }
    //slides.forEach(item => {item.style.opacity = 0; item.style.zIndex = "";});
    //slides[activeSlideIndex].style.opacity = 100;
    //slides[activeSlideIndex].style.zIndex = 10

    // Phones
    if(clickedItem.classList.contains('phone__vertical')){
      if(phoneVertical.dataset.active === "true"){
        phoneVertical.classList.remove('iphone-vertical');
        phoneVertical.classList.add('iphone-vertical_disabled');
        phoneVertical.dataset.active = "false";
      } else{
        phoneVertical.classList.remove('iphone-vertical_disabled');
        phoneVertical.classList.add('iphone-vertical');
        phoneVertical.dataset.active = "true";
      }
    }
    if(clickedItem.classList.contains('phone__horizontal')){
      if(phoneHorizontal.dataset.active === "true"){
        phoneHorizontal.classList.remove('iphone-horizontal');
        phoneHorizontal.classList.add('iphone-horizontal_disabled');
        phoneHorizontal.dataset.active = "false";
      } else{
        phoneHorizontal.classList.remove('iphone-horizontal_disabled');
        phoneHorizontal.classList.add('iphone-horizontal');
        phoneHorizontal.dataset.active = "true";
      }
    }
  })
}
*/
//////////////////////////////////////////