
function CloseImage() {
  var main = document.getElementById("mainimage");
  main.srcset = main.src;
}
function ShowImage(image) {
  var main = document.getElementById("mainimage");
  main.srcset = image.src;
}
function ViewImage(image) {
  var main = document.getElementById("mainimage");
  main.src = image.src;
}