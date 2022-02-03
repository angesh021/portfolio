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
     if(event.target.classList.contains("link-item")){
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













/*------------------------- About Section Tabs --------------------*/

(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");

            // deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            //activate new 'tab-item'
            event.target.classList.add("active", "outer-shadow");

            //deactivate existing 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            //activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();






/*------------------------- Project animation --------------------*/

const slides=document.querySelector(".slider").children;
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const indicator=document.querySelector(".indicator");
let index=0;

  prev.addEventListener("click",function(){
      prevSlide();
      updateCircleIndicator(); 
      resetTimer();
  })

  next.addEventListener("click",function(){
     nextSlide(); 
     updateCircleIndicator();
     resetTimer();
     
  })

  // create circle indicators
   function circleIndicator(){
       for(let i=0; i< slides.length; i++){
           const div=document.createElement("div");
                 div.innerHTML=i+1;
               div.setAttribute("onclick","indicateSlide(this)")
               div.id=i;
               if(i==0){
                   div.className="active";
               }
              indicator.appendChild(div);
       }
   }
   circleIndicator();

   function indicateSlide(element){
        index=element.id;
        changeSlide();
        updateCircleIndicator();
        resetTimer();
   }
    
   function updateCircleIndicator(){
       for(let i=0; i<indicator.children.length; i++){
           indicator.children[i].classList.remove("active");
       }
       indicator.children[index].classList.add("active");
   }

  function prevSlide(){
       if(index==0){
           index=slides.length-1;
       }
       else{
           index--;
       }
       changeSlide();
  }

  function nextSlide(){
     if(index==slides.length-1){
         index=0;
     }
     else{
         index++;
     }
     changeSlide();
  }

  function changeSlide(){
             for(let i=0; i<slides.length; i++){
                  slides[i].classList.remove("active");
             }

      slides[index].classList.add("active");
  }

  function resetTimer(){
        // when click to indicator or controls button 
        // stop timer 
        clearInterval(timer);
        // then started again timer
        timer=setInterval(autoPlay,20000);
  }

 
 function autoPlay(){
     nextSlide();
     updateCircleIndicator();
 }

 /* let timer=setInterval(autoPlay,20000); */



 /*-------------------------popup- stop scrolling ----------------------------*/ 


function bodyScrollingToggle(){
  document.body.classList.toggle("hidden-scrolling");
}

function disableScrolling(){
  
  document.body.style.overflow = 'hidden';
  
}

function enableScrolling(){
  window.location.href = "https://angesh021.github.io/portfolio/index.html#portfolio";
}


/*-------------------------project popup ----------------------------*/ 
(() =>{
    const filterContainer = document.querySelector(".portfolio-filter"),
    porfolioItemsContainer = document.querySelector(".project"),
    portfolioItems = document.querySelectorAll(".slider").children,
    popup = document.querySelector(".portfolio-popup"),
    close = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;


   

    projectDetailsBtn.addEventListener("click", () =>{
      popupDetailsToggle();
    })

 
    
    function popupDetailsToggle(){
      if(projectDetailsContainer.classList.contains("active")){
        projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
        projectDetailsBtn.querySelector("i").classList.add("fa-plus");
        projectDetailsContainer.classList.remove("active");
        projectDetailsContainer.style.maxHeight = 0 + "px"
      }
      else{
        projectDetailsBtn.querySelector("i").classList.add("fa-minus");
        projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
        projectDetailsContainer.classList.add("active");
        projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight +"px";
        popup.scrollTo(0, projectDetailsContainer.offsetTop);

      }
      
    }
})();


var btnDetail2 = document.getElementById("details-btn2");
var popupDetail2 = document.getElementById("popup-details2");
btnDetail2.onclick = function(event) {
  if (popupDetail2.style.overflow !== "visible") {
    popupDetail2.style.overflow = "visible";
    control.style.display = "none";
    indicators.style.display = "none";
    btnDetail2.querySelector("i").classList.add("fa-minus");
    btnDetail2.querySelector("i").classList.remove("fa-plus");
    popupDetail2.style.maxHeight = popupDetail2.scrollHeight +"px";
    popup.scrollTo(0, popupDetail2.offsetTop);
  }
  else{
    popupDetail2.style.overflow = "hidden";
    btnDetail2.querySelector("i").classList.remove("fa-minus");
    btnDetail2.querySelector("i").classList.add("fa-plus");
    popupDetail2.classList.remove("active");
    popupDetail2.style.maxHeight = 0 + "px"

  }
}


var btnDetail3 = document.getElementById("details-btn3");
var popupDetail3 = document.getElementById("popup-details3");
btnDetail3.onclick = function(event) {
  if (popupDetail3.style.overflow !== "visible") {
    popupDetail3.style.overflow = "visible";
    control.style.display = "none";
    indicators.style.display = "none";
    btnDetail3.querySelector("i").classList.add("fa-minus");
    btnDetail3.querySelector("i").classList.remove("fa-plus");
    popupDetail3.style.maxHeight = popupDetail3.scrollHeight +"px";
    popup.scrollTo(0, popupDetail3.offsetTop);
  }
  else{
    popupDetail3.style.overflow = "hidden";
    btnDetail3.querySelector("i").classList.remove("fa-minus");
    btnDetail3.querySelector("i").classList.add("fa-plus");
    popupDetail3.classList.remove("active");
    popupDetail3.style.maxHeight = 0 + "px"

  }
}



//////////////////----Modal Framework ------------------------------------------------------

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");


var moda = document.getElementById("mode");


        
// Get the button that opens the modal
var btn = document.getElementById("button");
var btn2 = document.getElementById("button2");
var btn3 = document.getElementById("button3");

var control = document.getElementsByClassName("controls")[0];
var indicators = document.getElementsByClassName("indicator")[0];


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("pp-close")[0];
var span2 = document.getElementsByClassName("pp-close2")[0];
var span3 = document.getElementsByClassName("pp-close3")[0];



// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  control.style.display = "none";
  indicators.style.display = "none";
  disableScrolling();
}


btn2.onclick = function() {
    modal2.style.display = "block";
    control.style.display = "none";
    indicators.style.display = "none";
    disableScrolling();
  }

  btn3.onclick = function() {
    modal3.style.display = "block";
    control.style.display = "none";
    indicators.style.display = "none";
    disableScrolling();
  }
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  control.style.display = "block";
  indicators.style.display = "flex";
  enableScrolling();
}
span2.onclick = function() {
  modal2.style.display = "none";
  control.style.display = "block";
  indicators.style.display = "flex";
  enableScrolling();
}
span3.onclick = function() {
  modal3.style.display = "none";
  control.style.display = "block";
  indicators.style.display = "flex";
  enableScrolling();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    control.style.display = "block";
    indicators.style.display = "flex";
  }
}
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
    control.style.display = "block";
    indicators.style.display = "flex";
  }
}
window.onclick = function(event) {
    if (event.target == modal3) {
      modal3.style.display = "none";
      control.style.display = "block";
      indicators.style.display = "flex";
    }
  }





