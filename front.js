const but = document.querySelector(".buttonmod");
const poplist = document.querySelector(".poplist");

var gameDisplay = document.getElementById("Game_Display");
var gamelist = document.getElementById("p_game_li");

var frontDisplay = document.getElementById("Frontend_Display");
var frontlist = document.getElementById("p_frontend_li");

var backDisplay = document.getElementById("Backend_Display");
var backlist = document.getElementById("p_backend_li");
// var skill = document.getElementById("skill_item");

// but.addEventListener("animationend", (e) => {
//     e.preventDefault();
//     but.classList.remove("animate");
// });


// but.addEventListener("hover",(e)=>{
//    // poplist.classList.add("enter");

//     poplist.classList.add("exit");
// })


let mousePos = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
    mousePos = { x: event.clientX, y: event.clientY };


    if (mousePos.x> window.innerWidth-100 ){
    poplist.classList.add("exit");
  
   // console.log(mousePos.x);

    }
    else{
        poplist.classList.remove("exit");
    }
});


gamelist.addEventListener('click',(e)=>{

    backDisplay.classList.add("project_Disabled");
    frontDisplay.classList.add("project_Disabled");
    gameDisplay.classList.remove("project_Disabled");
});


frontlist.addEventListener('click',(e)=>{

    backDisplay.classList.add("project_Disabled");  
    gameDisplay.classList.add("project_Disabled");
    frontDisplay.classList.remove("project_Disabled");
});

backlist.addEventListener('click',(e)=>{
   
    gameDisplay.classList.add("project_Disabled");
    frontDisplay.classList.add("project_Disabled");
    backDisplay.classList.remove("project_Disabled")
});

// -------------------------------SLDER ------------------------------//


class PhotoSlider{
    constructor(righticon,lefticon,image, imageUL){
        this.right = document.getElementById(righticon);
        this.left = document.getElementById(lefticon);
        this.img = document.querySelectorAll(image);
        this.imgUL = document.querySelector(imageUL);
        this.currentSlide = 0
    }
    leftclick(){
        if (this.currentSlide === 0 ) {
            this.currentSlide = this.img.length -1;
        } else {
            this.currentSlide--;
        }
    
          this.imgUL.style.transform = `translateX(-${this.currentSlide *0.65* window.innerWidth }px)`;
    }
    rightclick(){
        if (this.currentSlide === this.img.length - 1) {
            this.currentSlide = 0;
        } else {
            this.currentSlide++;
        }
        this.imgUL.style.transform = `translateX(-${this.currentSlide *0.65* window.innerWidth }px)`;
    }
}

let slider = new PhotoSlider("right","left",".slideIMG.Picasso",".sliderUL");

slider.left.addEventListener('click',(e)=>{
    slider.leftclick();
})

slider.right.addEventListener('click',(e)=>{
    slider.rightclick();
})


// let slider = new PhotoSlider("right","left",".slideIMG img",".sliderUL");

// slider.left.addEventListener('click',(e)=>{
//     slider.leftclick();
// })

// slider.right.addEventListener('click',(e)=>{
//     slider.rightclick();
// })


// let currentSlide = 0;

// var arrowIconsright = document.getElementById("right");
// var imageCount = document.querySelectorAll(".slideIMG img");
// var images = document.querySelector(".sliderUL");
// var arrowIconsleft = document.getElementById("left");

// // var dots = document.querySelectorAll(".dot");

// arrowIconsright.addEventListener('click',(e)=>{

//     if (currentSlide === imageCount.length - 1) {
//         currentSlide = 0;
//     } else {
//         currentSlide++;
//     }
//     images.style.transform = `translateX(-${currentSlide *0.5* window.innerWidth }px)`;
// })



// arrowIconsleft.addEventListener('click',(e)=>{

//     if (currentSlide === 0 ) {
//         currentSlide = imageCount.length -1;
//     } else {
//         currentSlide--;
//     }

//       images.style.transform = `translateX(-${currentSlide *0.5* window.innerWidth }px)`;

// })


