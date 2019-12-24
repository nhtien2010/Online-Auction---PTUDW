
window.onscroll = function() {StickyHeader()};
window.onresize = function() {WidthResize()};


var header = document.getElementById("header");
var sticky = header.offsetTop;
var menu = document.getElementById("menu");
var category = document.getElementById("category");
var widthresize = document.getElementsByClassName("center");
var fullform = document.getElementById("fullform");
var thinform = document.getElementById("thinform");
var welcome = document.getElementById("welcome");
var information = document.getElementsByClassName("information");
var list = document.getElementsByClassName("list");
var names = document.getElementsByClassName("name");
var centerlimit = screen.width * 0.40;

window.onload = function() { 
  for(var i = 0; i < widthresize.length; i++) {
    widthresize[i].style.width = centerlimit + 'px';
  }

  thinform.style.marginLeft = "0px";
  fullform.style.width = centerlimit + "px";
  fullform.style.marginLeft = (window.innerWidth / 2) - (centerlimit / 2) + 'px';
  welcome.style.fontSize = 0.01 * window.innerWidth + 14 + "px";
  welcome.style.top = 0.005 * window.innerWidth + "px";

  StickyHeader();
  WidthResize();
}

function StickyHeader() {
  if(window.pageYOffset >= (menu.offsetTop + menu.offsetHeight)) {
    header.style.height = 110 + 'px';
    category.style.display = "block";
  }
  else {
    header.style.height = 86 + 'px';
    category.style.display = "none";
  }
}

function WidthResize() {
    if(window.innerWidth < 3200) {
        welcome.style.fontSize = 0.01 * window.innerWidth + 14 + "px";
        welcome.style.top = 0.005 * window.innerWidth + "px";
    }

    if(window.innerWidth < centerlimit) {
      thinform.style.display = "block";
      fullform.style.display = "none";

      for(let item of widthresize) {
          item.style.marginLeft = "3px"; 
          item.style.width = window.innerWidth - 20 + "px";
      }
    }
    else {
      thinform.style.display = "none";
      fullform.style.display = "block";
      fullform.style.marginLeft = (window.innerWidth / 2) - (centerlimit / 2) + "px";

      for(let item of widthresize) {
          item.style.marginLeft = (window.innerWidth / 2) - (centerlimit / 2) + "px";
          item.style.width = centerlimit + "px";
      }
    }

    if(window.innerWidth > centerlimit) {
        for(let item of information) {
            item.style.width = centerlimit / 5.2 + "px";
        }
    }
    else {
        if(list[0].offsetWidth / 5.2 > 64 && list[0].offsetWidth / 5.2 < centerlimit / 5.2) {
            for(let item of information) {
                item.style.width = list[0].offsetWidth / 5.2 + "px";
            }
        }
        else {
            for(let item of information) {
                item.style.width = "64px";
            }
        }   
    }
    
    var size = 0.1 * information[0].offsetWidth;
    if(size > 8) {
        for(let item of list) {
            item.style.fontSize = size + "px";
        }
        
        for(var i = 0; i < names.length; i++)
        {
            names[i].style.fontSize = size + 3 + "px";
        }
    }
    else {
        for(let item of list) {
            item.style.fontSize = "8px";
        }
        for(var i = 0; i < names.length; i++)
        {
            names[i].style.fontSize = "11px";
        }
    }
}