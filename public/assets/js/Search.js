window.onresize = function() {WidthResize()};

var header = document.getElementById("header");
var sticky = header.offsetTop;
var category = document.getElementById("category");
var widthresize = document.getElementsByClassName("center");
var fullform = document.getElementById("fullform");
var thinform = document.getElementById("thinform");
var list = document.getElementsByClassName("list");
var names = document.getElementsByClassName("name");
var information = document.getElementsByClassName("information");
var filter =  document.getElementById("filter");
var catalog = document.getElementById("catalog");
var holder = document.getElementById("holder");
var toggle = document.getElementById("togglefilter");
var order = document.getElementById("order");
var centerlimit = screen.width * 0.40;

window.onload = function() { 
    for(var i = 0; i < widthresize.length; i++) {
    widthresize[i].style.width = centerlimit + 'px';
    }
    var size = window.innerWidth / screen.width;
    if(size > 0.4) {
        filter.style.display = "block";
        toggle.style.display = "none";
        catalog.classList.remove("width75");
        for(let item of information) {
            item.style.width = screen.width * 0.08 + "px";
        }
    }
    else {
        filter.style.display = "none";
        toggle.style.display = "inline-block";
        catalog.classList.add("width75");
        if(list[0].offsetWidth / 4.1 > 96) {
            for(let item of information) {
                item.style.width = list[0].offsetWidth / 4.1 + "px";
            }
        }
        else {
            for(let item of information) {
                item.style.width = "96px";
            }
        }   
    }

    size = 0.1 * information[0].offsetWidth;
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

    thinform.style.marginLeft = "5px";
    fullform.style.width = centerlimit + "px";
    fullform.style.marginLeft = (window.innerWidth / 2) - (centerlimit / 2) + 'px';

    if(window.innerWidth < centerlimit) {
    thinform.style.display = "block";
    fullform.style.display = "none";

    for(let item of widthresize) {
      item.style.marginLeft = "5px";
    }
    }
    else {
    thinform.style.display = "none";
    fullform.style.display = "block";

    for(let item of widthresize) {
      item.style.marginLeft = (window.innerWidth / 2) - (centerlimit / 2) + "px";  
    }
    }
    
    if(this.document.URL.split('=')[1])
        this.document.getElementById("search").value = this.document.URL.split('=')[1];
    Sort();
}

function WidthResize() {
    var size = window.innerWidth / screen.width;
    if(size > 0.4) {
        filter.style.display = "block";
        toggle.style.display = "none";
        catalog.classList.remove("width75");
        for(let item of information) {
            item.style.width = screen.width * 0.08 + "px";
        }
    }
    else {
        filter.style.display = "none";
        toggle.style.display = "inline-block";
        catalog.classList.add("width75");
        if(list[0].offsetWidth / 4.1 > 96) {
            for(let item of information) {
                item.style.width = list[0].offsetWidth / 4.1 + "px";
            }
        }
        else {
            for(let item of information) {
                item.style.width = "96px";
            }
        }   
    }
    

    size = 0.1 * information[0].offsetWidth;
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

    if(window.innerWidth < centerlimit) {
        thinform.style.display = "block";
        fullform.style.display = "none";

        for(let item of widthresize) {
            item.style.marginLeft = "5px";  
        }
    }
    else {
        thinform.style.display = "none";
        fullform.style.display = "block";
        fullform.style.marginLeft = (window.innerWidth / 2) - (centerlimit / 2) + "px";

        for(let item of widthresize) {
            item.style.marginLeft = (window.innerWidth / 2) - (centerlimit / 2) + "px";  
        }
    }
}

function OpenFilter() {
    if(filter.style.display === "none") {
        catalog.classList.remove("width75");
        filter.style.display = "inline-block";
        holder.style.width = Window.innerWidth - 19 + "px";
    }
    else
        filter.style.display = "none";
}