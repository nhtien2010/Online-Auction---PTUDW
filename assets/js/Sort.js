var order = document.getElementById("order");
Sort();
function Sort() {
    var list = document.getElementsByClassName("product");
    list = Array.prototype.slice.call(list);
    var sortingorder = order.value;
    var first, second, text;
    list.sort(function (a, b) {
        if (sortingorder == 5) {
            first = parseInt(a.children[0].getElementsByTagName("p")[sortingorder].innerHTML);
            second = parseInt(b.children[0].getElementsByTagName("p")[sortingorder].innerHTML);
            return first - second;
        }
        else {
            text = a.children[0].getElementsByTagName("p")[sortingorder].innerHTML.toLowerCase();
            if (text.indexOf('d') != -1)
                first = parseInt(text) * 1440;
            else if (text.indexOf('h') != -1)
                first = parseInt(text) * 60;
            else
                first = parseInt(text);

            text = b.children[0].getElementsByTagName("p")[sortingorder].innerHTML.toLowerCase();
            if (text.indexOf('d') != -1)
                second = parseInt(text) * 1440;
            else if (text.indexOf('h') != -1)
                second = parseInt(text) * 60;
            else
                second = parseInt(text);

            return first - second;
        }
    });

    $('.page').empty();

    for (var i = 0, len = list.length; i < len; i++) {
        $('.page')[parseInt(i / 24)].appendChild(list[i]);
    }
}