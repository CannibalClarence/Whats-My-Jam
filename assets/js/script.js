var genres = ["Rock", "Reggae", "Lo-Fi", "Hip Hop", "R&amp;B Soul", "Metal", "Christian", "Rap", "Country", "EDM", "Jazz", "Pop"];

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {return false;}
        currentFocus = -1;
        /* create div element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "searchbox-list");
        a.setAttribute("class", "searchbox-items");
        /* append div element as child of autocomplete container*/
        this.parentNode.appendChild(a);
        /* for each item in array */
        for (i = 0; i < arr.length; i++) {
            /* check if item starts with same letters as text field value */
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /* create div element for each matching element */
                b = document.createElement("DIV");
                /* make matching letters bold */
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "<strong>";
                b.innerHTML += arr[i].substr(val.length);
                /* insert input field to hold current array item's value */
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /* execute a function when item value (DIV element) is clicked */
                b.addEventListener("click", function(e) {
                    /* insert the value for the autocomplete text field */
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /* close list of autocompleted values or any other opened lists of autocompleted values */
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    /* execute a function presses key on the keyboard */
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /* if arrow key DOWN is pressed then increase currentFocus variable */
            currentFocus++;
            /* make current item more visible */
            addActive(x);
        } else if (e.keyCode == 38) {
            /* if UP arrow pressed then decrease currentFocus variable */
            currentFocus--;
            /* make current item more visible */
            addActive(x);
        } else if (e.keycode == 13) {
            /* if ENTER key pressed, prevent form from being submitted */
            e.preventDefault();
            if (currentFocus > -1) {
                /* and simulate a click on "active" item */
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /* function to classify item as "active" */
        if (!x) return false;
        /* start by removing "active" class on all autocomplete items */
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /* close all autocomplete lists in the document except one passed as argument */
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elemnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /* execute function when someone clicks in the document */
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("myInput"), genres);
