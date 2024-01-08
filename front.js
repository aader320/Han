const but = document.querySelector(".buttonmod");
const poplist = document.querySelector(".poplist");

var gameDisplay = document.getElementById("Game_Display");
var gamelist = document.getElementById("p_game_li");

var frontDisplay = document.getElementById("Frontend_Display");
var frontlist = document.getElementById("p_frontend_li");
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
   
    frontDisplay.classList.add("project_Disabled");
    gameDisplay.classList.remove("project_Disabled");
});


frontlist.addEventListener('click',(e)=>{
   
    gameDisplay.classList.add("project_Disabled");
    frontDisplay.classList.remove("project_Disabled");
});
