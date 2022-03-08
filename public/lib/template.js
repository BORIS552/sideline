let selected_template = 0;

function templateOne() {
    console.log("Tempalte One");
    selected_template = 1;
    localStorage.setItem("selected_template", "1");
    window.location.reload();
}

function templateTwo() {
    console.log("Tempalte Two");
    selected_template = 2;
   localStorage.setItem("selected_template", "2");
   window.location.reload();
}

function templateThree() {
    console.log("Template Three");
    selected_template = 3;
   localStorage.setItem("selected_template", "3");
   window.location.reload();
}

// function templateFour() {
//     console.log("Template Four");
//     selected_template = 4;
//    localStorage.setItem("selected_template", "4");
//    window.location.reload();
// }