
var storage = document.getElementById("storage");
var representaion = document.getElementById("representation");
var productinformation = document.getElementById("productinformation");
var sellerinformation = document.getElementById("sellerinformation");
var information = document.getElementsByClassName("information");
var list = document.getElementsByClassName("list");
var centerlimit = screen.width*0.4;

window.onresize = function() {WidthResize()};

window.onload = function() {
    representaion.style.width = screen.width * 0.18 + 'px';
    sellerinformation.style.width = screen.width * 0.12 + 'px';
    productinformation.style.width = screen.width * 0.27 + 'px';  
    storage.style.width = screen.width * 0.6 + 'px';
    
    this.WidthResize();
}

function WidthResize() {
    var size = window.innerWidth / screen.width;
    if(size > 0.6) {
        productinformation.style.width = screen.width * 0.27 + 'px';  
        storage.style.width = screen.width * 0.6 + 'px';
        storage.style.marginLeft = (size - 0.6) * 0.5 * screen.width + 'px';      
    }
    else if(size > 0.4) {
        storage.style.width = window.innerWidth + 'px';
        productinformation.style.width = (window.innerWidth - representaion.offsetWidth - sellerinformation.offsetWidth) * 0.85 + 'px';         
        storage.style.marginLeft = '3px';
        storage.style.marginRight = '3px';
        storage.style.width = 'auto';
    }
    else {
        productinformation.style.width = screen.width * 0.27 + 'px';  
        storage.style.width = screen.width * 0.6 + 'px';
        storage.style.marginLeft = '3px';
    }

    if(size > 0.4) {
        for(let item of information) {
            item.style.width = screen.width * 0.08 + "px";
        }
    }
    else {
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
}