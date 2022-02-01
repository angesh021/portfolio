/*----------- scroll effect on content to fade out --------------*/ 
const scrollElements = document.querySelectorAll(".revealUp");


const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("activ");
};

const hideScrollElement = (element) => {
  element.classList.remove("activ");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.50)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

/*----------- hide and show nav header on scroll --------------*/ 

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-70px";
  }
  prevScrollpos = currentScrollPos;
}


/*----------- typewriting effect on name --------------*/ 
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { font-size: 55px; font-weight: 700; color: var(--skin-color);}";
    document.body.appendChild(css);
};







(() =>{
  
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
          if(!section.classList.contains("active")){
              section.classList.add("hide");
          }
    })
 
 })();
 



window.addEventListener("load", () =>{
    // preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
    document.querySelector(".preloader").style.display="none";
    },600)
})








/*----------------- navigation menu --------------------*/

(() =>{
  
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu(){
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect(){
  	document.querySelector(".fade-out-effect").classList.add("active");
  	setTimeout(() =>{
      document.querySelector(".fade-out-effect").classList.remove("active");
  	},300)
  }
  // attach an event handler to document
  document.addEventListener("click", (event) =>{
     if(event.target.classList.contains('link-item')){
     	/* make sure event.target.hash has a value before overridding default behavior*/
     	if(event.target.hash !==""){
     		// prevent default anchor click behavior
     		event.preventDefault();
     		const hash = event.target.hash;
     		// deactivate existing active 'section'
     		document.querySelector(".section.active").classList.add("hide");
     		document.querySelector(".section.active").classList.remove("active");
     		// activate new 'section'
     		document.querySelector(hash).classList.add("active");
     		document.querySelector(hash).classList.remove("hide");
     		/* deactivate existing active navigation menu 'link-item' */
     		navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
     		navMenu.querySelector(".active").classList.remove("active","inner-shadow");
     		/* if clicked 'link-item is contained within the navigation menu' */
     		if(navMenu.classList.contains("open")){
     		  // activate new navigation menu 'link-item'
     		  event.target.classList.add("active","inner-shadow");
     		  event.target.classList.remove("outer-shadow","hover-in-shadow");
     		  // hide navigation menu
     		  hideNavMenu();
     	    }
     	    else{
              let navItems = navMenu.querySelectorAll(".link-item");
              navItems.forEach((item) =>{
              	if(hash === item.hash){
              		// activate new navigation menu 'link-item'
              		item.classList.add("active","inner-shadow");
     		        item.classList.remove("outer-shadow","hover-in-shadow");
              	}
              })
              fadeOutEffect();
     	    }
     	    // add hash (#) to url
     	    window.location.hash = hash;
     	}
     }
  })

})();


/*------------ about section tabs ------------------*/

(() =>{
  const aboutSection = document.querySelector(".about-section"),
  tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) =>{
     /* if event.target contains 'tab-item' class and not contains
     'active' class */
      if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains("active")){
        const target = event.target.getAttribute("data-target");
        // deactivate existing active 'tab-item'
        tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
        // activate new 'tab-item'
        event.target.classList.add("active","outer-shadow");
        // deactivate existing active 'tab-content'
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        // activate new 'tab-content'
        aboutSection.querySelector(target).classList.add("active");
      }
  })
})();

function bodyScrollingToggle(){
document.body.classList.toggle("hidden-scrolling");
}




