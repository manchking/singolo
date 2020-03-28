
window.onload = function() {
  addNavClickHandler();
  addSliderClickHandler();
  addGalleryClickHandler();
  showHideModal();
  windowScrollHandler();
  burgerNavHandler();
  windowScrollHandlerTest();
}

const windowScrollHandlerTest = () => {
  let activeNav = document.querySelector('.nav-sidebar__item__link_active');
  window.addEventListener('scroll', (event) => {
    let servicesPosY = document.getElementById('services').getBoundingClientRect().top;
    let portfolioPosY = document.getElementById('portfolio').getBoundingClientRect().top;
    let aboutPosY = document.getElementById('about').getBoundingClientRect().top;
    let contactPosY = document.getElementById('contact').getBoundingClientRect().top;
    let prevNav = document.querySelector('.nav-sidebar__item__link_active');
    if(window.pageYOffset < 70){
      activeNav = document.getElementById('nav-sidebar_home');
      prevNav.className = 'nav-sidebar__item__link';
      activeNav.className = 'nav-sidebar__item__link_active';
    }
    if(Math.abs(servicesPosY) < 100){
      activeNav = document.getElementById('nav-sidebar_services');
      prevNav.className = 'nav-sidebar__item__link';
      activeNav.className = 'nav-sidebar__item__link_active';
    }
    if(Math.abs(portfolioPosY) < 100){
      activeNav = document.getElementById('nav-sidebar_portfolio');
      prevNav.className = 'nav-sidebar__item__link';
      activeNav.className = 'nav-sidebar__item__link_active';
    }
    if(Math.abs(aboutPosY) < 100){
      activeNav = document.getElementById('nav-sidebar_about');
      prevNav.className = 'nav-sidebar__item__link';
      activeNav.className = 'nav-sidebar__item__link_active';
    }
    if(Math.abs(contactPosY) < 370){
      activeNav = document.getElementById('nav-sidebar_contact');
      prevNav.className = 'nav-sidebar__item__link';
      activeNav.className = 'nav-sidebar__item__link_active';
    }
  })
}

//Burger
const burgerNavHandler = () => {
  let burger = document.querySelector('.header__burger');
  let sidebar = document.querySelector('.nav-sidebar');
  let logo = document.querySelector('.header__logo');
  let overlay = document.querySelector('.overlay');
  let toggleBurger = function(){
    burger.classList.toggle('open');
    sidebar.classList.toggle('open');
    logo.classList.toggle('left');
    overlay.classList.toggle('hidden');
  }
  burger.addEventListener('click', (event) => {
      toggleBurger();
  })
  sidebar.addEventListener('blur', toggleBurger);
  sidebar.addEventListener('click', (event) => {
    if(event.target.classList.contains('nav-sidebar__item__link')) {
      let clickedItem = event.target;
      switch(clickedItem.innerHTML){
        case 'HOME':
          scrollToId('home');
          sidebar.blur();
          break;
        case 'SERVICES':
          scrollToId('services');
          sidebar.blur();
          break;
        case 'PORTFOLIO':
          scrollToId('portfolio');
          sidebar.blur();
          break;
        case 'ABOUT':
          scrollToId('about');
          sidebar.blur();
          break;
        case 'CONTACT':
          scrollToId('contact');
          sidebar.blur();
          break;
      }
    }
  })
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
  let activeNav = document.querySelector('.nav-bar__item__link_active');
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
  let overlay = document.querySelector('.overlay');
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
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<p class="modal__title">Mail send</p>
      <p><span class="modal__subtitle">Subject: </span>${subject}</p>
      <p><span class="modal__subtitle"> Description: </span>${description}</p>
      <input type="button" value="OK" class="modal__button">`;
    form.submit.disabled = 1;
    overlay.classList.toggle('hidden');
    overlay.append(modal);
    document.querySelector('.modal__button').addEventListener('click', () => {
      overlay.classList.toggle('hidden');
      form.name.value = '';
      form.email.value = '';
      form.subject.value = '';
      form.description.value = '';
      form.submit.disabled = 0;
      modal.remove();
    })
  })
}

//const addSliderClickHandler = () => {
//  let
//    slider = document.querySelector('.slider'),
//    sliderContainer = slider.querySelector('.slider__container'),
//    controlPrev = slider.querySelector('.slider__prev'),
//    controlNext = slider.querySelector('.slider__next'),
//    slides = slider.querySelectorAll('.slide'),
//    activeIndex = 0,
//    containerWidth = parseFloat(getComputedStyle(sliderContainer).width),
//    slideWidth = parseFloat(getComputedStyle(slides[0]).width),
//    step = slideWidth / containerWidth * 100;
//
//  let changeSlide = (direction) => {
//    let leftIndex, rightIndex;
//    if(activeIndex - 1 < 0) leftIndex = slides.length - 1;
//    if(activeIndex + 1 >= slides.length - 1) rightIndex = 0;
//   if(direction === 'left'){
//      slides[rightIndex].style.left = step+'%';
//    }
//  }
//
//  document.querySelector('.slider').addEventListener('click', (event) => {
//    if(event.target === controlPrev) changeSlide('left');
//  })
//}

// Slider
const addSliderClickHandler = () => {
  let slider = document.querySelector('.slider');
  let slides = Array.from(document.querySelectorAll('.slide'));
  let activeSlide = slides.find(item => item.hidden === false);
  let activeSlideIndex = slides.indexOf(activeSlide);
  let phoneVertical = document.querySelector('.phone__vertical');
  let phoneHorizontal = document.querySelector('.phone__horizontal');
  document.querySelector('.slider').addEventListener('click', (event) => {
    let clickedItem = event.target;
    // Slider buttons
    if(clickedItem.classList.contains('slider__prev')){
      slider.classList.toggle('blue');
      activeSlideIndex--;
    }
    if(clickedItem.classList.contains('slider__next')){
      slider.classList.toggle('blue');
      activeSlideIndex++;
    }
    if(activeSlideIndex === slides.length) activeSlideIndex = 0;
    if(activeSlideIndex < 0) activeSlideIndex = slides.length-1;
    slides.forEach(item => {item.classList.remove('slide_active')});
    slides[activeSlideIndex].classList.toggle('slide_active');
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