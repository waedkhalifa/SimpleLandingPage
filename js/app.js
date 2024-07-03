/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const allSections = document.querySelectorAll('section');
const list = document.getElementById('navbar__list');
const navbar = document.querySelector('.navbar__menu');
let time;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function smoothScroll (e,i){
    e.preventDefault();
    allSections[i].scrollIntoView({behavior:'smooth'});
}

function hideNavbar() {
    navbar.classList.add('hide-navbar');
}

function toggleHidden() {
    navbar.classList.remove('hide-navbar');
    clearTimeout(time);
    time=setTimeout(hideNavbar,3000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav and adding the items to the list

for (let i=0; i<allSections.length;i++){
    // creating li and a
    const li = document.createElement('li');
    const a = document.createElement('a');
    // add class to a
    a.classList.add('menu__link');
    // changing the content of a
    a.textContent = 'Section '+(i + 1);
    // giving ref to a
    a.href= '#'+allSections[i].id;

    // adding smooth move when moving from any item in navbar to specific section related to this item
    a.addEventListener('click', function(e) {
        smoothScroll(e, i);
    });
    
    li.appendChild(a);
    list.appendChild(li);
}


// Add class 'active' to section when near top of viewport

function makeActive(){
    for (const section of allSections) {
        const box = section.getBoundingClientRect();
        const activeLink = document.querySelector(`a[href="#${section.id}"]`);
        //Find a value that works best, but 150 seems to be a good start.
        if (box.top <= 150 && box.bottom >= 150) {
        //apply active state on current section and corresponding Nav link
        section.classList.add('active');
        activeLink.classList.add('active-item');
        } else {
        //Remove active state from other section and corresponding Nav link
        section.classList.remove('active');
        activeLink.classList.remove('active-item');
        }
     }
}

// add event listener when scrolling and making this section active
document.addEventListener('scroll', makeActive);

// add event listener when scrolling to hide the navbar while not scrolling (not scrolling for 2 seconds)
document.addEventListener('scroll', toggleHidden);
document.addEventListener('mousemove', toggleHidden);
