
function filterSelect(c) {
  let productItem = document.getElementsByClassName("product-item");
  if (c == "all") c = "";
  for (let i = 0; i < productItem.length; i++) {
    filRemoveClass(productItem[i], "show");
    if (productItem[i].className.indexOf(c) > -1){ // if 
      filAddClass(productItem[i], "show");
    }    
  }
}

// Add class -Filter 
function filAddClass(element, name) {
  let arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}
// Remove Class -Filter 
function filRemoveClass(element, name) {
  let arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}      
// Add active class to the current button highlight
let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btnf");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    let active = document.getElementsByClassName("active");
    active[0].className = active[0].className.replace(" active", "");
    this.className += " active";
  });
}
      