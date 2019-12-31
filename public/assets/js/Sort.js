function Sort() {
    var sortingorder = order.value;
    var i, switching, b, shouldSwitch, first, second, text;
    switching = true;
    while (switching) {
      switching = false;
      b = list[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if(sortingorder === "price") {
            first = parseInt(b[i].getElementsByClassName(sortingorder)[0].innerHTML);
            second = parseInt(b[i + 1].getElementsByClassName(sortingorder)[0].innerHTML);
            if ( first > second) {
                shouldSwitch = true;
                break;
            }
        }
        else {
            text = b[i].getElementsByClassName(sortingorder)[0].innerHTML.toLowerCase();
            if(text.indexOf('d') != -1)
                first = parseInt(text) * 1440;
            else if(text.indexOf('h') != -1)
                first = parseInt(text) * 60;
            else
                first = parseInt(text);
            
            text = b[i + 1].getElementsByClassName(sortingorder)[0].innerHTML.toLowerCase();
            if(text.indexOf('d') != -1)
                second = parseInt(text) * 1440;
            else if(text.indexOf('h') != -1)
                second = parseInt(text) * 60;
            else
                second = parseInt(text);
                
            if (first < second) {
                shouldSwitch = true;
                break;
            }
        }
      }
      if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);

        switching = true;
      }
    }
}