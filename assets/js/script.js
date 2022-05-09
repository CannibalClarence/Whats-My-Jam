var genres = ["Rock", "Reggae", "Lo-Fi", "Hip Hop", "R&amp;B Soul", "Metal", "Christian", "Rap", "Country", "EDM", "Jazz", "Pop"];
var radioList = document.querySelector('radioUl');
var radioTable = document.querySelector('radioDiv');
var artistTable = document.querySelector('artistDiv')


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

autocomplete(document.getElementById("myInput"), genres);

// Hiens api
function getButtonClass() {
  return document.getElementsByClassName("buttons");
}

var button = getButtonClass();


$(button).click(function() {
  var genre_id = $(this).attr("id");

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': '50k-radio-stations.p.rapidapi.com',
      'X-RapidAPI-Key': '88f69c111cmshd2e7367ba95a640p13988ejsna248c526036b'
    }
  };
  
  fetch('https://50k-radio-stations.p.rapidapi.com/get/channels?country_id=1&genre_id='+ genre_id +'&page=1', options)
  
  .then(response => response.json())
	.then(function(response) {

    // clear table content
    radioTable.innerHTML = "";

    let table = document.createElement('table');
    table.setAttribute("id", "table");

    // generate and populate table rows with data from api
    for (i= 0; i < 10; i++){

      let row_1 = document.createElement('tr');
      row_1.setAttribute("class", "stations col-12 text-white list-group-item mt-2 mb-2");

      var stationName = response.data[i].name;
      console.log(stationName);

      var streamLink = "https://www.fmradiofree.com/search?q=" + stationName;
                       
              row_1.innerHTML = "<td>" + stationName + "</td><td><a href="+ streamLink + "> CLICK TO FIND A STATION</a></td>";
              // get links to open in new tab 
              // row_1.getElementsByClassName("stations").target="_blank";

              table.appendChild(row_1);

      // append table to document div
      radioTable.appendChild(table);

    }
    })
	.catch(err => console.error(err));

});

  // $.ajax(settings).done(function (response) {
  //   // console.log(response);
  //   var parsed_data = JSON.parse(response);
  
  // let table = document.createElement('table');
  //     //create table
  //     for (i= 0; i < parsed_data.data.length; i++){
  //         //create table
          
  //         let row_1 = document.createElement('tr');
                       
  //         row_1.innerHTML = "<td>" + parsed_data.data[i] + "</td><td><a href="+ parsed_data.data[i].streams_url[0].url+">CLICK TO STREAM</a></td>";
  
  //         table.appendChild(row_1);
        
  //         // add rows of juicy cells of data
          
  //         //put in a nice link
  //         // parsed_data.data[i]
  //         // cell = "<a href="+ parsed_data.data[i].streams_url[0].url+">CLICK TO STREAM</a>"
  //     }
  // document.getElementById('radioDiv').appendChild(table);
  // // function pass
  
  // });
// })


// not working as expected!!



// var genre_id = $(this).attr('id');
// console.log($(this).attr('id'));

// $(button).click(function(){
//   var genre_id = $(this).attr('id');
//   console.log($(this).attr('id'));

// });





// const settings2 = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://50k-radio-stations.p.rapidapi.com/get/channels?country_id=1&page=1",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Host": "50k-radio-stations.p.rapidapi.com",
// 		"X-RapidAPI-Key": "88f69c111cmshd2e7367ba95a640p13988ejsna248c526036b"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);

// });





// // User input music api
// function getButtonClass() {
//   return document.getElementById("searchBtn");
// }

// var button = getButtonClass();

// function getInputClass() {
//   return document.getElementById("myInput")
// }

// var myInput = getInputClass();

// $(button).click(function() {
//   var myInput = $('myInput').val();
//   event.preventDefault();
//   localStorage.setItem("myInput", JSON.stringify(playlist_name));
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
//       'X-RapidAPI-Key': 'eebb2c5c60msh33ac5ceb4e95ca7p1dacdfjsnfa63b046ad4e'
//     }
//   };
  
//   fetch('https://spotify23.p.rapidapi.com/search/?q=search&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
//     .then(response => response.json())
//     .then(response => console.log(response))

// 	.then(function(response) {


// // clear table content
// artistTable.innerHTML = ""

// let table = document.createElement('table');
//     table.setAttribute("id", "table");

//     // generate and populate table rows with data from api
//     for (i= 0; i < 10; i++){

//       let row_1 = document.createElement('tr');
//       row_1.setAttribute("class", "stations col-12 text-white list-group-item mt-2 mb-2");

//       var playlistName = response.data[i].name;
//       console.log(playlistName);

//       var streamLink = "https://www.fmradiofree.com/search?q=" + stationName;
                       
//               row_1.innerHTML = "<td>" + stationName + "</td><td><a href="+ streamLink+">CLICK TO FIND A STATION</a></td>";
//               // get links to open in new tab 
//               // row_1.getElementsByClassName("stations").target="_blank";

//               table.appendChild(row_1);

//       // append table to document div
//       radioTable.appendChild(table);

//     }
//     })
// 	.catch(err => console.error(err));

// });





// User input music api
// function getButtonClass() {
//   return document.getElementById("searchBtn");
// }

// var button = getButtonClass();

// function getInputClass() {
//   return document.getElementById("myInput")
// }

// var myInput = getInputClass();

// $(button).click(function() {
//   var myInput = $('myInput').val();
//   event.preventDefault();
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'eebb2c5c60msh33ac5ceb4e95ca7p1dacdfjsnfa63b046ad4e'
// 	}
// };

// fetch('https://spotify23.p.rapidapi.com/search/?q=search'+ myInput + '&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
//   .then(function(response) {
    
    
//     // clear table content
//     artistTable.innerHTML = ""
    
//         // generate and populate table rows with data from api
//         for(i=1; i<data.length; i++) {
//           var resultData = 
//           '<img src="'+ data[i].playlist.url + '"><br>' +
//           '<strong>Artist Name:</strong> ' + data[i].artist.name + '<br/>' +
//           '<strong>Venue Name:</strong> ' + data[i].venue.name + '<br/>' +
//               '<strong>Venue Location:</strong> ' + data[i].venue.location + '<br>' +
//               '<a class="text-decoration-none" href="' + data[i].artist.url + '" target="_blank" ><strong>Concert Details</strong></a>';
//           $(artistTable).append('<hr>');
//           $(artistTable).append(resultData);
    
//           // append table to document div
//           radioTable.appendChild(table);
    
//         }
//         })
//     .catch(err => console.error(err));
// });