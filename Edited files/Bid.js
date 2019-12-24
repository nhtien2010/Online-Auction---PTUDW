function Bid() {
    if(!isNaN(document.getElementById("offer").value) && document.getElementById("offer").value != "") {
        var current = parseFloat(document.getElementById("productinformation").getElementsByTagName("b")[1].innerHTML);
        var offer = parseFloat(document.getElementById("offer").value);
        var deal = parseFloat(document.getElementById("productinformation").getElementsByTagName("p")[2].innerHTML.split(" ")[1]);
        var time = parseInt(document.getElementById("productinformation").getElementsByTagName("b")[0].innerHTML.split(" ")[1]);

        if(offer <= current)
            alert("Offer is too low!");
        else if(offer >= deal) {
            document.getElementById("productinformation").getElementsByTagName("b")[1].innerHTML = deal + '$';
            document.getElementById("productinformation").getElementsByTagName("p")[3].innerHTML = 'Bidder: Erod Nelps (9.2 Rated)';
            document.getElementById("productinformation").getElementsByTagName("h2")[0].innerHTML += ' (Sold)';
            document.getElementById("productinformation").getElementsByTagName("b")[0].innerHTML = 'Bidded: ' + (time + 1) + ' times';
            document.getElementById("offer").disabled = true;
            alert("Bought!");
        }
        else {
            document.getElementById("productinformation").getElementsByTagName("b")[1].innerHTML = offer + '$';
            document.getElementById("productinformation").getElementsByTagName("p")[3].innerHTML = 'Bidder: Erod Nelps (9.2 Rated)';
            document.getElementById("productinformation").getElementsByTagName("b")[0].innerHTML = 'Bidded: ' + (time + 1) + ' times';
            alert("Complete!");
        }
    }

    document.getElementById("offer").value = "";
}