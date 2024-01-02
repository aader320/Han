const but = document.querySelector(".buttonmod");
const poplist = document.querySelector(".poplist");
// but.addEventListener("click",(e)=>{
//     e.preventDefault();
//     but.classList.add("animate");


// })

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

