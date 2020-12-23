function JSgui() {

 this.currtool = "pointer";
 this.gridlines = "normal";
}



this.displayTemps = function(index){
 console.log('test');
 let funcArray = ["#linear_templates", "#quadratic_templates", "#square_root_templates"];
 for(let i = 0; i < funcArray.length; i++){
   if(i == index){
     $(funcArray[i]).css('display', 'block');
   } else {
     $(funcArray[i]).css('display', 'none');
   }
 }
}
//Quadratic(y=x^2) Programming is all down here -----------------------------

function Quadratic() {
   //init variables
   let newcolor = '#c71111';
   let oldEquation = "x^2";
   let newEquation = "";
   let id = "quad" + cjack;
   //add to jsgcalc.js
   jsgcalc.lines.push({
     equation: oldEquation,
     color: newcolor,
     id: id
   });

   jsgcalc.draw();


   //init boxes on screen
   this.init = function(num) {
     if(num == 0){
       $('#user_area').append('<div id="quadratic'+cjack+'" class="function"> <div class="function_header"></div><div class="equation"><input type="number" value="1" id="x^2_coefficient_'+ cjack +'" class="coefficient" oninput="quadArray['+ cjack + '].update('+ cjack +','+num+')" >' + '<p class="pow"> x<sup>2</sup> </p>'
       + "<p class='pow'> + </p>" + '<input type="number" value="0" id="x^1_coefficient_'+ cjack +'" class="coefficient" oninput="quadArray['+ cjack + '].update('+ cjack +','+num+')" + >' + '<p class="pow"> x + </p>' +
       '<input type="number" value="0" id="x^0_coefficient_'+ cjack +'" class="coefficient" oninput="quadArray['+ cjack + '].update('+ cjack +','+num+')" + > </div></div>');
     } else if(num == 1){
       $('#user_area').append('<div id="quadratic'+cjack+'" class="function"> <div class="function_header">'
       +'</div><div class="equation"><p class="pow">y = (x + </p><input type="number" value="0" id="a_quad_'+cjack+'" class="coefficient" oninput="quadArray['+cjack+'].update"('+ cjack +','+num+')" + >'
       +'<p class="pow">)(x + </p><input type="number" value="0" id="b_quad_'+cjack+'" class="coefficient" oninput="quadArray['+cjack+'].update"('+ cjack +','+num+')" + >'
       +'<p class="pow">)</p></div></div>');
     }

     $("#quadratic" + cjack).css('background-color', '#c71111');


     $('.function_header').css('background-color', 'inherit');
     $('.equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.function').css('position', 'absolute');
     $('.function_header').css('padding', '0');
     $('.function_header').css('margin', '0');

     $('.function').css('border-radius', '20px')
     $('.function').css('height', '18px');
     $('.function').css('width', '150px');
     $('.function').css('padding', '14px');
     $('.function').css('border-radius', '20px');

     $('.function_header').css('width', '150px');
     $('.function_header').css('height', '18px');
     $('.function_header').css('padding','14px');
     $('.function_header').css('border-radius', '20px');
     $('.function_header').css('position', 'absolute');
     $('.function_header').css('top','-1px');
     $('.function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.equation').css('width', '150px');
     $('.equation').css('position', 'absolute');
     $('.equation').css('z-index', '3');
     $('.function_header').css('z-index',' 1');

        let qStr = "quadratic"+cjack;

        dragElement(document.getElementById("quadratic0"));


   cjack++;
   }

 this.update = function(c, num) {
   if(num == 0){
     let id = "quad" + c;
     let x2 = document.getElementById('x^2_coefficient_' + c).value;
     let x1 = document.getElementById('x^1_coefficient_' + c).value;
     let x0 = document.getElementById('x^0_coefficient_' + c).value;
     newEquation = x2 + "x^2 + " + x1 + "x + " + x0;



     jsgcalc.removeLineById(id);

     jsgcalc.lines.push({
       equation: newEquation,
       color: newcolor,
       id: id
     });

     jsgcalc.draw();
     oldEquation = newEquation;
 } else if(num == 1){
   let id = "quad" + c;
   let a = document.getElementById('a_quad_' + c).value;
   let b = document.getElementById('b_quad_' + c).value;
   newEquation = "(x + " + a + ") * (x + " + b + ")";

   jsgcalc.removeLineById(id);

   jsgcalc.lines.push({
     equation: newEquation,
     color: newcolor,
     id: id
   });

   jsgcalc.draw();
   oldEquation = newEquation;
 }
}

}

let cjack = 0;
this.defineQuadratic = function(num) {
 console.log("cjack: " + cjack);
 quad_0 = new Quadratic();
 quad_1 = new Quadratic();
 quad_2 = new Quadratic();
 quad_3 = new Quadratic();
 quad_4 = new Quadratic();

 quadArray = [];
 quadArray[0] = quad_0;
 quadArray[1] = quad_1;
 quadArray[2] = quad_2;
 quadArray[3] = quad_3;
 quadArray[4] = quad_4;


 quadArray[cjack].init(num);

}


//Linear(y=x) Programming is all down here ----------------------------------
function Linear() {
 //init variables
 let newcolor = '#108108';
 let oldEquation = "x";
 let newEquation = "";
 let id = "linear" + ljack;
 //add to jsgcalc.js
 jsgcalc.lines.push({
   equation: oldEquation,
   color: newcolor,
   id: id
 });

 jsgcalc.draw();

 //init boxes on screen
 this.init = function(num) {
 if(num == 0){
 $('#user_area').append('<div id="linear'+ljack+'"class="function"><div id="linear'+ljack+'header" class="function_header"></div><div id="linear_equation" class="equation"><p class="pow">y =</p> <input type="number" value="1" id="x_coefficient_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" >' + '<p id="linearPow" class="pow"> x + </p>' +
 '<input type="number" value="0" id="coefficient_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" + > </div></div>');


} else if(num == 1){

 $('#user_area').append('<div id="linear'+ljack+'"class="function"><div id="linear'+ljack+'header" class="function_header"></div><div class="equation"><p id="linearPow" class="pow">y - </p> <input type="number" value="0" id="b_linear1_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" >' +'<p class="pow"> = </p>' + '<input type="number" value="1" id="m_linear1_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" >' + '<p id="linearPow" class="pow">(x - </p>' +
 '<input type="number" value="0" id="a_linear1_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" + ><p id="linearPow" class="pow">)</p> </div></div>');

}

$("#linear" + ljack).css('background-color', '#108108');


$('.function_header').css('background-color', 'inherit');
$('.equation').css('background-color', 'inherit');
$('.pow').css('background-color', 'inherit');

$('.pow').css('display', 'inline');
$('.pow').css('color', 'white');

$('.function').css('position', 'absolute');
$('.function_header').css('padding', '0');
$('.function_header').css('margin', '0');

$('.function').css('border-radius', '20px')
$('.function').css('height', '18px');
$('.function').css('width', '150px');
$('.function').css('padding', '14px');
$('.function').css('border-radius', '20px');

$('.function_header').css('width', '150px');
$('.function_header').css('height', '18px');
$('.function_header').css('padding','14px');
$('.function_header').css('border-radius', '20px');
$('.function_header').css('position', 'absolute');
$('.function_header').css('top','-1px');
$('.function_header').css('left', '-0px');

$('.coefficient').css('width', '10');
$('.coefficient').css('border-style', 'none');
$('.coefficient').css('color', 'black');
$('.coefficient').css('background-color', 'white');
$('.coefficient').css('text-align', 'right');
$('.coefficient').css('border-radius', '5px');
$('.equation').css('width', '150px');
$('.equation').css('position', 'absolute');
$('.equation').css('z-index', '3');
$('.function_header').css('z-index',' 1');

   let tStr = "linear"+ljack;

   dragElement(document.getElementById(tStr), true);

   ljack++;

 }

 this.update = function(l, num) {
   if(num == 0){
     let id = "linear" + l;
     let x1 = document.getElementById('x_coefficient_' + l).value;
     let x0 = document.getElementById('coefficient_' + l).value;
     newEquation =  x1 + "x + " + x0;

     jsgcalc.removeLineById(id);

     jsgcalc.lines.push({
       equation: newEquation,
       color: newcolor,
       id: id
     });

     jsgcalc.draw();
     oldEquation = newEquation;
   }
   else if(num == 1){
   let id = "linear" + l;
   let a = document.getElementById('a_linear1_' + l).value;
   let b = document.getElementById('b_linear1_' + l).value;
   let m1 = document.getElementById('m_linear1_' + l).value;
   newEquation = m1 + "* (x - " + a + ") + " + b;

   jsgcalc.removeLineById(id);

   jsgcalc.lines.push({
     equation: newEquation,
     color: newcolor,
     id: id
   });

   jsgcalc.draw();
   oldEquation = newEquation;
 }
 }
}

this.addLinearButton = function() {
 $('#my_equations').append('<div> <input type="button" value="y=x" id="linearButton" onclick="defineLinear()"</div>');
 $('#linearButton').css('margin', '10px');
}

let ljack = 0;
this.defineLinear = function(num) {
 console.log('defined ' + ljack);
 if(ljack > 4){
   alert("Max functions exceeded: You can only have 5 of this type of function!");
 } else {
   linear_0 = new Linear();
   linear_1 = new Linear();
   linear_2 = new Linear();
   linear_3 = new Linear();
   linear_4 = new Linear();

  linearArray = [];
  linearArray[0] = linear_0;
  linearArray[1] = linear_1;
  linearArray[2] = linear_2;
  linearArray[3] = linear_3;
  linearArray[4] = linear_4;

 linearArray[ljack].init(num);
}
}


//Sqare root is all down here
function Root() {
 //init variables

 let newcolor = '#00000';
 let oldEquation = "sqrt(x)";
 let newEquation = "";
 let id = "root" + rjack;
 //add to jsgcalc.js
 jsgcalc.lines.push({
   equation: oldEquation,
   color: newcolor,
   id: id
 });



 jsgcalc.draw();


 //init boxes on screen
 this.init = function() {
 $('#graph_inputs').append('<div class="root_function"> <input type="number" value="1" id="a_coefficient_' + rjack + '" class="coefficient" oninput="rootArray['+ rjack +'].update('+rjack+')">'
   + '<p class = "pow"> √(x + </p>' + '<input type="number" value="0" id="b_coefficient_'+ rjack +'" class="coefficient" oninput="rootArray['+ rjack +'].update('+rjack+')">' + '<p class = "pow"> ) </p>'
   + '<p class = "pow"> + </p>' + '<input type="number" value="0" id="h_coefficient_' + rjack + '" class="coefficient" oninput="rootArray['+ rjack +'].update('+rjack+')"></div>');


 $('.coefficient').css('width', '30');
 $('.pow').css('display', 'inline');
 $('.root_function').css('margin-top', '10px');
 rjack++;
 }

 this.update = function(num) {

   let id = "root" + num;
   let a = document.getElementById('a_coefficient_' + num).value;
   let b = document.getElementById('b_coefficient_' + num).value;
   let h = document.getElementById('h_coefficient_' + num).value;
   newEquation =  a + "sqrt(x +" + b + ")" + "+" + h;

   jsgcalc.removeLineById(id);

   jsgcalc.lines.push({
     equation: newEquation,
     color: newcolor,
     id: id
   });



   jsgcalc.draw();

   oldEquation = newEquation;
 }

}

this.addRootButton = function() {
 $('#my_equations').append('<div> <input type="button" value="y=√x" id="rootButton" onclick="defineRoot()"></div>');
 $('#rootButton').css('margin', '10px');
 $('#rootButton').css('z-index', '1000000');
}

let rjack = 0;
this.defineRoot = function() {

 root_0 = new Root();
 root_1 = new Root();
 root_2 = new Root();

 rootArray = [];
 rootArray[0] = root_0;
 rootArray[1] = root_1;
 rootArray[2] = root_2;

 rootArray[rjack].init();
}



this.myEquations = function() {
   $('#my_equations').css('display', 'none');
   $('#additions_button').css('background-color', 'inherit')
   $('#graph_inputs').css('display', 'block');
   $('#equations_button').css('background-color', '#c5c5c5');
 }

 //dragging elements
 this.tool = "drag";


 function dragElement(elmnt) {
 var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
 let tool = this.tool;
 if (document.getElementById(elmnt.id + "header")) {

   /* if present, the header is where you move the DIV from:*/
   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
   console.log(this.tool);
 }

 function dragMouseDown() {
   let e = window.event;
   e.preventDefault();
   // get the mouse cursor position at startup:
   pos3 = e.clientX;
   pos4 = e.clientY;
   console.log("dragMouseDown:" + tool);
   if(tool == "drag"){
   document.onmouseup = closeDragElement;
   // call a function whenever the cursor moves:
   document.onmousemove = elementDrag;
 }

}
 function elementDrag(e) {
   e = e || window.event;
   e.preventDefault();
   // calculate the new cursor position:
   pos1 = pos3 - e.clientX;
   pos2 = pos4 - e.clientY;
   pos3 = e.clientX;
   pos4 = e.clientY;
   // set the element's new position:
   elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
   elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
 }

 function closeDragElement() {
   /* stop moving when mouse button is released:*/
   document.onmouseup = null;
   document.onmousemove = null;
 }
}

//




jsgui = new JSgui;



$(document).ready(function() {
 //addEquations();
 //addQuadraticButton();
 //addLinearButton();
 //addRootButton();
 //displayTemps(4);

 $(".toolbox_close a").click(function() {
   $(".toolbox").hide();
 })

 document.body.onselectstart = function () { return false; }
});
