var inputElement = document.querySelector("#file");
var header = document.querySelector("td");
var lines = [];


//add an event listener to wait for the file
inputElement.addEventListener("change", function(e){
  var reader = new FileReader()
  reader.onload = function(){
     lines = reader.result.split("\n").map(function (line){
      return line.split(',');
      })
    lines.unshift(["Name", " Passed ", " Failed ", "Pass Percentage (%)"]);
    //add the percentage element of the lines array
    percentage();
    //adding the new total row
    newRow();
    //generate the table
    generate_table();
    //set the colors for the percentage column
    color();
    //remove the input element
     inputElement.parentNode.removeChild(inputElement);
  }
  reader.readAsText(inputElement.files[0]);
}, false);

//creating the percentage column
function percentage(){
  for (var i = 1; i < lines.length; i++) {
    var total = parseInt(lines[i][1]) + parseInt(lines[i][2]) + parseInt(lines[i][3]);
    var totalExceptions = parseInt(lines[i][2]) + parseInt(lines[i][3]);
    var percentColumn = (parseInt(lines[i][1])/total) * 100;
    //adding the totalExceptions column by removing the wrong and exceptions column
    lines[i].pop();
    lines[i].pop();
    lines[i].push(totalExceptions);
    lines[i].push(percentColumn);
  }
}

function newRow() {
  var totalPass = 0;
  var totalFail = 0;
  var averagePercentage = 0;
  for (var i = 1; i < lines.length; i++) {
    totalFail += parseInt(lines[i][2]);
    totalPass += parseInt(lines[i][1]);
    averagePercentage += (parseInt(lines[i][3]))/(lines.length - 1);
  }
  lines.push(["Total", totalPass, totalFail, averagePercentage]);
}

//function for setting colors for the percentage column
function color() {
  //get all the cells in the table
  var currentCell = document.getElementsByTagName("td");
  //We start from the seventh cell because that's where our number is and loop
    for (var i = 7; i < currentCell.length; i++) {
      if (parseInt(currentCell[i].textContent) >= 95) {
        currentCell[i].classList.add("pass");
      }else if (parseInt(currentCell[i].textContent) >= 80) {
        currentCell[i].classList.add("average");
      }else {
        currentCell[i].classList.add("fail");
      }
      i += 3;
    }
}

//generating the Table dynamically
function generate_table() {

  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < lines.length; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < lines[0].length; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      //using parseInt to only the numbers but only ones we can get numbers for
      if (isNaN(parseInt(lines[i][j]))) {
        //make the text node the contents of the <td>
        var cellText = document.createTextNode(lines[i][j]);
      }else {
        //make the text node the contents of the <td>
        var cellText = document.createTextNode(parseInt(lines[i][j]));
      }
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}
