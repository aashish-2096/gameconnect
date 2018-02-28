var player_1 = prompt("Player one :  Enter your name , You'll be blue");
var playerone_Color = 'rgb(86, 151, 255)';

var player_2 = prompt("Player two :  Enter your name , You'll be red");
var playertwo_Color = 'rgb(237, 45, 73)';

$('#p1').text(player_1 + " is Blue").css('color',playerone_Color);
$('#p2').text(player_2 +" is Red").css('color',playertwo_Color);

var  game_on = true;
var table = $('table tr');

function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}
function  checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for( var row = 5;row > -1 ;row--){
    colorReport = returnColor(row,colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return row;
    }
}
}

function colorMatchCheck(one,two,three,four){
  return (one === two && one === three && one ===four && one != 'rgb(128, 128, 128)' && one !== undefined)
}

function horizontalWinCheck()
{
  for (var row = 0; row <6; row++){
    for(var col = 0; col <4 ;col++){
       if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
         console.log("HorizontalWin");
         return(row,col);
         return true;
       }
       else {
         continue;
       }
    }
  }
}

function verticalWinCheck()
{
  for (var col= 0; col<7 ; col++){
    for(var row = 0; row <3  ;row++){
       if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
         console.log("HorizontalWin");
         return(row,col);
         return true;
       }
       else {
         continue;
       }
    }
  }
}

function diagonalWinCheck(){
 for(var row = 0;row<5;row++){
   for (var col = 0;col<7;col++){
     if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
       console.log("Diagonal Win +ve slope");
       return(row,col);
       return true;
     }
     else if (colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))) {
       console.log("Diagonal Win -ve slope");
       return true;
     }
   }
 }
}

var count = 0;
function winning(name)
{
  $('h3').text(" ");
  $('h2').text(" ");
  if(count < 1){
  $('h1').text(name+" Have won !! Refresh the page to play again");
  count ++;
  }
}
var currentPlayer = 1;
var currentColor = playerone_Color;
var currentName = player_1;

$('h3').text(player_1+" It is your chance drop the chip");
$('.board button').on('click' ,function()
{
var col = $(this).closest("td").index();
var bottomAvail = checkBottom(col);
changeColor(bottomAvail,col,currentColor);

if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
winning(currentName);
}

currentPlayer = currentPlayer *-1;
if(currentPlayer === 1)
{
  currentName = player_1;
  currentColor = playerone_Color;
  $('h3').text(currentName +" Your turn to  roll");
}

else{
  currentName = player_2;
  currentColor = playertwo_Color;
    $('h3').text(currentName +" Your turn to  roll");
}
})
