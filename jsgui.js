function JSgui() {

 this.currtool = "pointer";
 this.gridlines = "normal";
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
       $('#user_area').append('<div id="quadratic'+cjack+'" class="quadratic_function"> <div id="quadratic'+cjack+'header" class="quadratic_function_header"></div><div class="quadratic_equation"><input type="number" value="1" id="x^2_coefficient_'+ cjack +'" class="coefficient" oninput="quadArray['+ cjack + '].update('+ cjack +','+num+')" >' + '<p class="pow"> x<sup>2</sup> </p>'
       + "<p class='pow'> + </p>" + '<input type="number" value="0" id="x^1_coefficient_'+ cjack +'" class="coefficient" oninput="quadArray['+ cjack + '].update('+ cjack +','+num+')" + >' + '<p class="pow"> x + </p>' +
       '<input type="number" value="0" id="x^0_coefficient_'+ cjack +'" class="coefficient" oninput="quadArray['+ cjack + '].update('+ cjack +','+num+')" + > </div></div>');
     } else if(num == 1){
       $('#user_area').append('<div id="quadratic'+cjack+'" class="quadratic_function"> <div id="quadratic'+cjack+'header" class="quadratic_function_header">'
       +'</div><div class="quadratic_equation"><p class="pow">y = (x + </p><input type="number" value="0" id="a_quad_'+cjack+'" class="coefficient" oninput="quadArray['+cjack+'].update('+ cjack +','+num+')">'
       +'<p class="pow">)(x + </p><input type="number" value="0" id="b_quad_'+cjack+'" class="coefficient" oninput="quadArray['+cjack+'].update('+ cjack +','+num+')">'
       +'<p class="pow">)</p></div></div>');
     } else if(num == 2){
       $('#user_area').append('<div id="quadratic'+cjack+'" class="quadratic_function"> <div id="quadratic'+cjack+'header" class="quadratic_function_header">'
       +'</div><div class="quadratic_equation"><p class="pow">y = </p><input type="number" value="1" id="a_quad2_'+cjack+'" class="coefficient" oninput="quadArray['+cjack+'].update('+ cjack +','+num+')">'
       +'<p class="pow">(x - </p><input type="number" value="0" id="h_quad2_'+cjack+'" class="coefficient" oninput="quadArray['+cjack+'].update('+ cjack +','+num+')">'
       +'<p class="pow">)<sup>2</sup> + </p><input type="number" value="0" id="k_quad2_'+cjack+'" class="coefficient" oninput="quadArray['+cjack+'].update('+ cjack +','+num+')">'
       +'</div></div>');
     }

     $("#quadratic" + cjack).css('background-color', '#c71111');


     $('.quadratic_function_header').css('background-color', 'inherit');
     $('.quadratic_equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.quadratic_function').css('position', 'absolute');
     $('.quadratic_function_header').css('padding', '0');
     $('.quadratic_function_header').css('margin', '0');

     $('.quadratic_function').css('border-radius', '20px')
     $('.quadratic_function').css('height', '18px');
     $('.quadratic_function').css('width', '150px');
     $('.quadratic_function').css('padding', '14px');
     $('.quadratic_function').css('border-radius', '20px');

     $('.quadratic_function_header').css('width', '150px');
     $('.quadratic_function_header').css('height', '18px');
     $('.quadratic_function_header').css('padding','14px');
     $('.quadratic_function_header').css('border-radius', '20px');
     $('.quadratic_function_header').css('position', 'absolute');
     $('.quadratic_function_header').css('top','-1px');
     $('.quadratic_function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.quadratic_equation').css('width', '150px');
     $('.quadratic_equation').css('position', 'absolute');
     $('.quadratic_equation').css('z-index', '3');
     $('.quadratic_function_header').css('z-index',' 1');

        let qStr = "quadratic"+cjack;

        dragElement(document.getElementById(qStr));


   cjack++;
   }

 this.update = function(c, num) {
   console.log('update')
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
   console.log('ran');
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
 } else if(num == 2){
   let id = "quad" + c;
   let a = document.getElementById('a_quad2_' + c).value;
   let h = document.getElementById('h_quad2_' + c).value;
   let k = document.getElementById('k_quad2_' + c).value;
   newEquation = a + "*(x -" + h + ")^2 + " + k;

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
 if(cjack > 4){ alert("You can only have 5 of this function! Try playing around with some of the others.");}
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
 $('#user_area').append('<div id="linear'+ljack+'"class="linear_function"><div id="linear'+ljack+'header" class="linear_function_header"></div><div id="linear_equation" class="linear_equation"><p class="pow">y =</p> <input type="number" value="1" id="x_coefficient_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" >' + '<p id="linearPow" class="pow"> x + </p>' +
 '<input type="number" value="0" id="coefficient_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" + > </div></div>');


} else if(num == 1){

 $('#user_area').append('<div id="linear'+ljack+'"class="linear_function"><div id="linear'+ljack+'header" class="linear_function_header"></div><div class="linear_equation"><p id="linearPow" class="pow">y - </p> <input type="number" value="0" id="b_linear1_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" >' +'<p class="pow"> = </p>' + '<input type="number" value="1" id="m_linear1_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" >' + '<p id="linearPow" class="pow">(x - </p>' +
 '<input type="number" value="0" id="a_linear1_'+ ljack +'" class="coefficient" oninput="linearArray['+ ljack + '].update('+ ljack +','+num+')" + ><p id="linearPow" class="pow">)</p> </div></div>');

}

$("#linear" + ljack).css('background-color', '#108108');


$('.linear_function_header').css('background-color', 'inherit');
$('.linear_equation').css('background-color', 'inherit');
$('.pow').css('background-color', 'inherit');

$('.pow').css('display', 'inline');
$('.pow').css('color', 'white');

$('.linear_function').css('position', 'absolute');
$('.linear_function_header').css('padding', '0');
$('.linear_function_header').css('margin', '0');
$('.linear_function:hover').css('cursor','grab');

$('.linear_function').css('border-radius', '20px')
$('.linear_function').css('height', '18px');
$('.linear_function').css('width', '150px');
$('.linear_function').css('padding', '14px');
$('.linear_function').css('border-radius', '20px');

$('.linear_function_header').css('width', '150px');
$('.linear_function_header').css('height', '18px');
$('.linear_function_header').css('padding','14px');
$('.linear_function_header').css('border-radius', '20px');
$('.linear_function_header').css('position', 'absolute');
$('.linear_function_header').css('top','-1px');
$('.linear_function_header').css('left', '-0px');

$('.coefficient').css('width', '10');
$('.coefficient').css('border-style', 'none');
$('.coefficient').css('color', 'black');
$('.coefficient').css('background-color', 'white');
$('.coefficient').css('text-align', 'right');
$('.coefficient').css('border-radius', '5px');
$('.linear_equation').css('width', '150px');
$('.linear_equation').css('position', 'absolute');
$('.linear_equation').css('z-index', '3');
$('.linear_function_header').css('z-index',' 1');

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


function Cubic() {
   //init variables
   let newcolor = '#5d4fa9';
   let oldEquation = "x^3";
   let newEquation = "";
   let id = "cubic" + cbjack;
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
       $('#user_area').append('<div id="cubic'+cbjack+'"class="cubic_function"><div id="cubic'+cbjack+'header" class="cubic_function_header"></div><div id="cubic_equation" class="cubic_equation">'
       +'<p class="pow">y = </p><input type="number" value="1" id="a_cubic0_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       +'<p class="pow"> x<sup>3</sup> + </p><input type="number" value="0" id="b_cubic0_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       +'<p class="pow"> x<sup>2</sup> + </p><input type="number" value="0" id="c_cubic0_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       +'<p class="pow" >x + </p><input type="number" value="0" id="d_cubic0_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       + '</div></div>');
     } else if(num == 1) {
       $('#user_area').append('<div id="cubic'+cbjack+'"class="cubic_function"><div id="cubic'+cbjack+'header" class="cubic_function_header"></div><div id="cubic_equation" class="cubic_equation">'
       +'<p class="pow">y = </p><input type="number" value="1" id="a_cubic1_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       +'<p class="pow"> (x + </p><input type="number" value="0" id="i_cubic1_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       +'<p class="pow"> ) (x + </p><input type="number" value="0" id="j_cubic1_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       +'<p class="pow"> ) (x + </p><input type="number" value="0" id="k_cubic1_'+cbjack+'" class="coefficient" oninput="cubicArray['+cbjack+'].update('+ cbjack +','+num+')">'
       +'<p class="pow"> )'
       + '</div></div>');
     }

     //change this to function
     $("#cubic" + cbjack).css('background-color', '#5d4fa9');


     $('.cubic_function_header').css('background-color', 'inherit');
     $('.cubic_equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.cubic_function').css('position', 'absolute');
     $('.function_header').css('padding', '0');
     $('.function_header').css('margin', '0');

     $('.cubic_function').css('border-radius', '20px')
     $('.cubic_function').css('height', '18px');
     $('.cubic_function').css('width', '200px');
     $('.cubic_function').css('padding', '14px');
     $('.cubic_function').css('border-radius', '20px');

     $('.cubic_function_header').css('width', '200px');
     $('.cubic_function_header').css('height', '18px');
     $('.cubic_function_header').css('padding','14px');
     $('.cubic_function_header').css('border-radius', '20px');
     $('.cubic_function_header').css('position', 'absolute');
     $('.cubic_function_header').css('top','-1px');
     $('.cubic_function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.cubic_equation').css('width', '200px');
     $('.cubic_equation').css('position', 'absolute');
     $('.cubic_equation').css('z-index', '3');
     $('.cubic_function_header').css('z-index',' 1');

     //change this for function

        let cStr = "cubic"+cbjack;

        dragElement(document.getElementById(cStr));


   cbjack++;
   }

 this.update = function(cb, num) {
   if(num == 0){
     let id = "cubic" + cb;
     let a = document.getElementById('a_cubic0_' + cb).value;
     let b = document.getElementById('b_cubic0_' + cb).value;
     let c = document.getElementById('c_cubic0_' + cb).value;
     let d = document.getElementById('d_cubic0_' + cb).value;
     newEquation = a + "x^3 +" + b + "x^2 +" + c + "x +" + d;


     jsgcalc.removeLineById(id);

     jsgcalc.lines.push({
       equation: newEquation,
       color: newcolor,
       id: id
     });

     jsgcalc.draw();
     oldEquation = newEquation;
 } else if(num == 1){
    let id ="cubic" + cb;
    let a = document.getElementById('a_cubic1_' + cb).value;
    let i = document.getElementById('i_cubic1_' + cb).value;
    let j = document.getElementById('j_cubic1_' + cb).value;
    let k = document.getElementById('k_cubic1_' + cb).value;
    newEquation = a +"(x+" + i + " )(x +" + j + " )(x+" + k + " )";

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

let cbjack = 0;
this.defineCubic = function(num) {

 cubic_0 = new Cubic();
 cubic_1 = new Cubic();
 cubic_2 = new Cubic();
 cubic_3 = new Cubic();
 cubic_4 = new Cubic();

 cubicArray = [];
 cubicArray[0] = cubic_0;
 cubicArray[1] = cubic_1;
 cubicArray[2] = cubic_2;
 cubicArray[3] = cubic_3;
 cubicArray[4] = cubic_4;


 cubicArray[cbjack].init(num);

}

//Sqare squareRoot is all down here
function SquareRoot() {
 //init variables

 let newcolor = '#deea1f';
 let oldEquation = "sqrt(x)";
 let newEquation = "";
 let id = "squareRoot" + rjack;
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
     $('#user_area').append('<div id="squareRoot'+rjack+'"class="squareRoot_function"><div id="squareRoot'+rjack+'header" class="squareRoot_function_header"></div><div id="squareRoot_equation" class="squareRoot_equation">'
     +'<p class="pow">y = </p><input type="number" value="1" id="a_squareRoot0_'+rjack+'" class="coefficient" oninput="squareRootArray['+rjack+'].update('+ rjack +','+num+')">'
     +'<p class="pow">√</p><span class="pow" id="square_root_span">x - <input type="number" value="0" id="h_squareRoot0_'+rjack+'" class="coefficient" oninput="squareRootArray['+rjack+'].update('+ rjack +','+num+')"></span>'
     +'<p class="pow"> + </p><input type="number" value="0" id="k_squareRoot0_'+rjack+'" class="coefficient" oninput="squareRootArray['+rjack+'].update('+ rjack +','+num+')"></span>'
     +'</div></div>');
   }
   $("#squareRoot" + rjack).css('background-color', '#deea1f');


   $('.squareRoot_function_header').css('background-color', 'inherit');
   $('.squareRoot_equation').css('background-color', 'inherit');
   $('.pow').css('background-color', 'inherit');

   $('.pow').css('display', 'inline');
   $('.pow').css('color', 'white');

   $('.squareRoot_function').css('position', 'absolute');
   $('.squareRoot_function_header').css('padding', '0');
   $('.squareRoot_function_header').css('margin', '0');

   $('.squareRoot_function').css('border-radius', '20px')
   $('.squareRoot_function').css('height', '18px');
   $('.squareRoot_function').css('width', '150px');
   $('.squareRoot_function').css('padding', '14px');
   $('.squareRoot_function').css('border-radius', '20px');

   $('.squareRoot_function_header').css('width', '150px');
   $('.squareRoot_function_header').css('height', '18px');
   $('.squareRoot_function_header').css('padding','14px');
   $('.squareRoot_function_header').css('border-radius', '20px');
   $('.squareRoot_function_header').css('position', 'absolute');
   $('.squareRoot_function_header').css('top','-1px');
   $('.squareRoot_function_header').css('left', '-0px');

   $('.coefficient').css('width', '10');
   $('.coefficient').css('border-style', 'none');
   $('.coefficient').css('color', 'black');
   $('.coefficient').css('background-color', 'white');
   $('.coefficient').css('text-align', 'right');
   $('.coefficient').css('border-radius', '5px');
   $('.squareRoot_equation').css('width', '150px');
   $('.squareRoot_equation').css('position', 'absolute');
   $('.squareRoot_equation').css('z-index', '3');
   $('.squareRoot_function_header').css('z-index',' 1');

   //change this for function

      let rStr = "squareRoot"+rjack;

      dragElement(document.getElementById(rStr));


 rjack++;
 }

 this.update = function(r, num) {
   if(num == 0){
   let id = "squareRoot" + r;
   let a = document.getElementById('a_squareRoot0_' + r).value;
   let h = document.getElementById('h_squareRoot0_' + r).value;
   let k = document.getElementById('k_squareRoot0_' + r).value;
   newEquation =  a + "sqrt(x -" + h + ")" + "+" + k;

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
let rjack = 0;
this.defineSquareRoot = function(num) {

 squareRoot_0 = new SquareRoot();
 squareRoot_1 = new SquareRoot();
 squareRoot_2 = new SquareRoot();
 squareRoot_3 = new SquareRoot();
 squareRoot_4 = new SquareRoot();


 squareRootArray = [];
 squareRootArray[0] = squareRoot_0;
 squareRootArray[1] = squareRoot_1;
 squareRootArray[2] = squareRoot_2;
 squareRootArray[3] = squareRoot_3;
 squareRootArray[4] = squareRoot_4;

 squareRootArray[rjack].init(num);
}


function Reciprocal() {
   //init variables
   let newcolor = '#feb633';
   let oldEquation = "1/x";
   let newEquation = "";
   let id = "reciprocal" + rcjack;
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
       $('#user_area').append('<div id="reciprocal'+rcjack+'"class="reciprocal_function"><div id="reciprocal'+rcjack+'header" class="reciprocal_function_header"></div><div id="reciprocal_equation" class="reciprocal_equation">'
       +'<p class="pow">y = </p><div id="reciprocal_frac" class="frac"><span><input type="number" value="1" id="a_reciprocal0_'+rcjack+'" class="coefficient" oninput="reciprocalArray['+rcjack+'].update('+ rcjack +','+num+')"></span>'
       +'<span class="symbol">/</span>'  +'<span class="bottom">x - <input type="number" value="0" id="h_reciprocal0_'+rcjack+'" class="coefficient" oninput="reciprocalArray['+rcjack+'].update('+ rcjack +','+num+')"></span></div>'
       +'<p class="pow"> + </p><input type="number" value="0" id="k_reciprocal0_'+rcjack+'" class="coefficient" oninput="reciprocalArray['+rcjack+'].update('+ rcjack +','+num+')">'
       +'</div></div>');
     }

     //change this to function
     $("#reciprocal" +rcjack).css('background-color', '#feb633');

     $(".frac").css('background-color', 'inherit');
     $('.frac').css('color', 'white');


     $('.reciprocal_function_header').css('background-color', 'inherit');
     $('.reciprocal_equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.reciprocal_function').css('position', 'absolute');
     $('.reciprocal_function_header').css('padding', '0');
     $('.reciprocal_function_header').css('margin', '0');

     $('.reciprocal_function').css('border-radius', '20px')
     $('.reciprocal_function').css('height', '18px');
     $('.reciprocal_function').css('width', '150px');
     $('.reciprocal_function').css('padding', '14px');
     $('.reciprocal_function').css('border-radius', '20px');

     $('.reciprocal_function_header').css('width', '150px');
     $('.reciprocal_function_header').css('height', '18px');
     $('.reciprocal_function_header').css('padding','14px');
     $('.reciprocal_function_header').css('border-radius', '20px');
     $('.reciprocal_function_header').css('position', 'absolute');
     $('.reciprocal_function_header').css('top','-1px');
     $('.reciprocal_function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.reciprocal_equation').css('width', '150px');
     $('.reciprocal_equation').css('position', 'absolute');
     $('.reciprocal_equation').css('z-index', '3');
     $('.reciprocal_function_header').css('z-index',' 1');

     $('.reciprocal_equation').css('position', 'relative');
     $('.reciprocal_equation').css('top', '-10px');

     //change this for function

        let rStr = "reciprocal"+rcjack;

        dragElement(document.getElementById(rStr));


   rcjack++;
   }

 this.update = function(rc, num) {
   if(num == 0){
     let id="reciprocal" + rc
     let a = document.getElementById('a_reciprocal0_' + rc).value;
     let h = document.getElementById('h_reciprocal0_' + rc).value;
     let k = document.getElementById('k_reciprocal0_' + rc).value;
     newEquation = "( + " + a + "/(x - " + h + ")) + " + k;


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

let rcjack = 0;
this.defineReciprocal = function(num) {

 reciprocal_0 = new Reciprocal();
 reciprocal_1 = new Reciprocal();
 reciprocal_2 = new Reciprocal();
 reciprocal_3 = new Reciprocal();
 reciprocal_4 = new Reciprocal();

 reciprocalArray = [];
 reciprocalArray[0] = reciprocal_0;
 reciprocalArray[1] = reciprocal_1;
 reciprocalArray[2] = reciprocal_2;
 reciprocalArray[3] = reciprocal_3;
 reciprocalArray[4] = reciprocal_4;


 reciprocalArray[rcjack].init(num);

}

function Trig(num) {
   //init variables
   let oldEquation = "";
   if(num == 0){
     oldEquation = "sin(x)";
   } else if(num == 1){
     oldEquation = "cos(x)";
   }
   let newcolor = '#9f18fd';

   let newEquation = "";
   let id = "trig" + tjack;
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
       $('#user_area').append('<div id="trig'+tjack+'"class="trig_function"><div id="trig'+tjack+'header" class="trig_function_header"></div><div id="trig_equation" class="trig_equation">'
       +'<p class="pow">y = </p><input type="number" value="1" id="a_trig0_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'<p class="pow">sin(</p><input type="number" value="1" id="k_trig0_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'<p class="pow"> (x - </p><input type="number" value="0" id="c_trig0_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'<p class="pow">)) + </p><input type="number" value="0" id="d_trig0_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'</div></div>');
     } else if(num == 1){
       $('#user_area').append('<div id="trig'+tjack+'"class="trig_function"><div id="trig'+tjack+'header" class="trig_function_header"></div><div id="trig_equation" class="trig_equation">'
       +'<p class="pow">y = </p><input type="number" value="1" id="a_trig1_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'<p class="pow">cos(</p><input type="number" value="1" id="k_trig1_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'<p class="pow"> (x - </p><input type="number" value="0" id="c_trig1_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'<p class="pow">)) + </p><input type="number" value="0" id="d_trig1_'+tjack+'" class="coefficient" oninput="trigArray['+tjack+'].update('+ tjack +','+num+')">'
       +'</div></div>');
     }

     //change this to function
     $("#trig" + tjack).css('background-color', '#9f18fd');


     $('.trig_function_header').css('background-color', 'inherit');
     $('.trig_equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.trig_function').css('position', 'absolute');
     $('.trig_function_header').css('padding', '0');
     $('.trig_function_header').css('margin', '0');

     $('.trig_function').css('border-radius', '20px')
     $('.trig_function').css('height', '18px');
     $('.trig_function').css('width', '150px');
     $('.trig_function').css('padding', '14px');
     $('.trig_function').css('border-radius', '20px');

     $('.trig_function_header').css('width', '150px');
     $('.trig_function_header').css('height', '18px');
     $('.trig_function_header').css('padding','14px');
     $('.trig_function_header').css('border-radius', '20px');
     $('.trig_function_header').css('position', 'absolute');
     $('.trig_function_header').css('top','-1px');
     $('.trig_function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.trig_equation').css('width', '150px');
     $('.trig_equation').css('position', 'absolute');
     $('.trig_equation').css('z-index', '3');
     $('.trig_function_header').css('z-index',' 1');

     //change this for function

        let tStr = "trig"+tjack;

        dragElement(document.getElementById(tStr));


   tjack++;
   }

 this.update = function(t, num) {
   if(num == 0){
     let id = "trig" + t;
     let a = document.getElementById('a_trig0_' + t).value;
     let k = document.getElementById('k_trig0_' + t).value;
     let c = document.getElementById('c_trig0_' + t).value;
     let d = document.getElementById('d_trig0_' + t).value;
     newEquation = a + "*sin(" + k + "(x - " + c + ")) + " + d;



     jsgcalc.removeLineById(id);

     jsgcalc.lines.push({
       equation: newEquation,
       color: newcolor,
       id: id
     });

     jsgcalc.draw();
     oldEquation = newEquation;
 } else if(num == 1){
   let id = "trig" + t;
   let a = document.getElementById('a_trig1_' + t).value;
   let k = document.getElementById('k_trig1_' + t).value;
   let c = document.getElementById('c_trig1_' + t).value;
   let d = document.getElementById('d_trig1_' + t).value;
   newEquation = a + "*cos(" + k + "(x - " + c + ")) + " + d;


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

let tjack = 0;
this.defineTrig = function(num) {

 trig_0 = new Trig(num);
 trig_1 = new Trig(num);
 trig_2 = new Trig(num);
 trig_3 = new Trig(num);
 trig_4 = new Trig(num);

 trigArray = [];
 trigArray[0] = trig_0;
 trigArray[1] = trig_1;
 trigArray[2] = trig_2;
 trigArray[3] = trig_3;
 trigArray[4] = trig_4;


 trigArray[tjack].init(num);

}


function Exponential() {
   //init variables
   let newcolor = '#03fed1';
   let oldEquation = "2^x";
   let newEquation = "";
   let id = "exponential" + ejack;
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
        $('#user_area').append('<div id="exponential'+ejack+'"class="exponential_function"><div id="exponential'+ejack+'header" class="exponential_function_header"></div><div id="exponential_equation" class="exponential_equation">'
        +'<p class="pow">y = </p><input type="number" value="1" id="a_exponential0_'+ejack+'" class="coefficient" oninput="exponentialArray['+ejack+'].update('+ ejack +','+num+')">'
        +'<p class="pow"> (</p><input type="number" value="2" id="b_exponential0_'+ejack+'" class="coefficient" oninput="exponentialArray['+ejack+'].update('+ ejack +','+num+')">'
        +'<p class="pow">)<sup>x</sup> + </p><input type="number" value="0" id="c_exponential0_'+ejack+'" class="coefficient" oninput="exponentialArray['+ejack+'].update('+ ejack +','+num+')">'
        +'</div></div>');
     }

     //change this to function
     $("#exponential" + ejack).css('background-color', '#03fed1');


     $('.exponential_function_header').css('background-color', 'inherit');
     $('.exponential_equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.exponential_function').css('position', 'absolute');
     $('.exponential_function_header').css('padding', '0');
     $('.exponential_function_header').css('margin', '0');

     $('.exponential_function').css('border-radius', '20px')
     $('.exponential_function').css('height', '18px');
     $('.exponential_function').css('width', '120px');
     $('.exponential_function').css('padding', '14px');
     $('.exponential_function').css('border-radius', '20px');

     $('.exponential_function_header').css('width', '120px');
     $('.exponential_function_header').css('height', '18px');
     $('.exponential_function_header').css('padding','14px');
     $('.exponential_function_header').css('border-radius', '20px');
     $('.exponential_function_header').css('position', 'absolute');
     $('.exponential_function_header').css('top','-1px');
     $('.exponential_function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.exponential_equation').css('width', '120px');
     $('.exponential_equation').css('position', 'absolute');
     $('.exponential_equation').css('z-index', '3');
     $('.exponential_function_header').css('z-index',' 1');

     //change this for function

        let eStr = "exponential"+ejack;

        dragElement(document.getElementById(eStr));


   ejack++;
   }

 this.update = function(e, num) {
   if(num == 0){
     let id = "exponential" + e;
     let a = document.getElementById('a_exponential0_' + e).value;
     let b = document.getElementById('b_exponential0_' + e).value;
     let c = document.getElementById('c_exponential0_' + e).value;
     newEquation = a + "* (" + b + ")^x + " + c;



     jsgcalc.removeLineById(id);

     jsgcalc.lines.push({
       equation: newEquation,
       color: newcolor,
       id: id
     });

     jsgcalc.draw();
     oldEquation = newEquation;
 } else if(num == 1){


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

let ejack = 0;
this.defineExponential = function(num) {

 exponential_0 = new Exponential();
 exponential_1 = new Exponential();
 exponential_2 = new Exponential();
 exponential_3 = new Exponential();
 exponential_4 = new Exponential();

 exponentialArray = [];
 exponentialArray[0] = exponential_0;
 exponentialArray[1] = exponential_1;
 exponentialArray[2] = exponential_2;
 exponentialArray[3] = exponential_3;
 exponentialArray[4] = exponential_4;


 exponentialArray[ejack].init(num);

}

function Logarithmic() {
   //init variables
   let newcolor = '#fd2190';
   let oldEquation = "log(x)";
   let newEquation = "";
   let id = "logarithmic" + lgjack;
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
        $('#user_area').append('<div id="logarithmic'+lgjack+'"class="logarithmic_function"><div id="logarithmic'+lgjack+'header" class="logarithmic_function_header"></div><div id="logarithmic_equation" class="logarithmic_equation">'
        +'<p class="pow">y = </p><input type="number" value="1" id="a_logarithimic0_'+lgjack+'" class="coefficient" oninput="logarithmicArray['+lgjack+'].update('+ lgjack +','+num+')">'
        +'<p class="pow"> ln(x - </p><input type="number" value="0" id="h_logarithimic0_'+lgjack+'" class="coefficient" oninput="logarithmicArray['+lgjack+'].update('+ lgjack +','+num+')">'
        +'<p class="pow">) + </p><input type="number" value="0" id="k_logarithimic0_'+lgjack+'" class="coefficient" oninput="logarithmicArray['+lgjack+'].update('+ lgjack +','+num+')">'
        +'</div></div>');
     }

     //change this to function
     $("#logarithmic" + lgjack).css('background-color', '#fd2190');


     $('.logarithmic_function_header').css('background-color', 'inherit');
     $('.logarithmic_equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.logarithmic_function').css('position', 'absolute');
     $('.logarithmic_function_header').css('padding', '0');
     $('.logarithmic_function_header').css('margin', '0');

     $('.logarithmic_function').css('border-radius', '20px')
     $('.logarithmic_function').css('height', '18px');
     $('.logarithmic_function').css('width', '150px');
     $('.logarithmic_function').css('padding', '14px');
     $('.logarithmic_function').css('border-radius', '20px');

     $('.logarithmic_function_header').css('width', '150px');
     $('.logarithmic_function_header').css('height', '18px');
     $('.logarithmic_function_header').css('padding','14px');
     $('.logarithmic_function_header').css('border-radius', '20px');
     $('.logarithmic_function_header').css('position', 'absolute');
     $('.logarithmic_function_header').css('top','-1px');
     $('.logarithmic_function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.logarithmic_equation').css('width', '150px');
     $('.logarithmic_equation').css('position', 'absolute');
     $('.logarithmic_equation').css('z-index', '3');
     $('.logarithmic_function_header').css('z-index',' 1');

     //change this for function

        let lgStr = "logarithmic"+lgjack;

        dragElement(document.getElementById(lgStr));


   lgjack++;
   }

 this.update = function(c, num) {
   if(num == 0){
     let id = "logarithmic" + c;
     let a = document.getElementById('a_logarithimic0_' + c).value;
     let h = document.getElementById('h_logarithimic0_' + c).value;
     let k = document.getElementById('k_logarithimic0_' + c).value;
     newEquation = a + "*log(x -" + h + ") + " + k;

     jsgcalc.removeLineById(id);

     jsgcalc.lines.push({
       equation: newEquation,
       color: newcolor,
       id: id
     });

     jsgcalc.draw();
     oldEquation = newEquation;
 } else if(num == 1){


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

let lgjack = 0;
this.defineLogarithmic = function(num) {

 logarithmic_0 = new Logarithmic();
 logarithmic_1 = new Logarithmic();
 logarithmic_2 = new Logarithmic();
 logarithmic_3 = new Logarithmic();
 logarithmic_4 = new Logarithmic();

 logarithmicArray = [];
 logarithmicArray[0] = logarithmic_0;
 logarithmicArray[1] = logarithmic_1;
 logarithmicArray[2] = logarithmic_2;
 logarithmicArray[3] = logarithmic_3;
 logarithmicArray[4] = logarithmic_4;


 logarithmicArray[lgjack].init(num);

}


function AbsoluteValue() {
   //init variables
   let newcolor = '#242424';
   let oldEquation = "abs(x)";
   let newEquation = "";
   let id = "absoluteValue" + abjack;
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
        $('#user_area').append('<div id="absoluteValue'+abjack+'"class="absoluteValue_function"><div id="absoluteValue'+abjack+'header" class="absoluteValue_function_header"></div><div id="absoluteValue_equation" class="absoluteValue_equation">'
        +'<p class="pow">y = </p><input type="number" value="1" id="a_absoluteValue0_'+abjack+'" class="coefficient" oninput="absoluteValueArray['+abjack+'].update('+ abjack +','+num+')">'
        +'<p class="pow"> |x - </p><input type="number" value="0" id="h_absoluteValue0_'+abjack+'" class="coefficient" oninput="absoluteValueArray['+abjack+'].update('+ abjack +','+num+')">'
        +'<p class="pow"> | + </p><input type="number" value="0" id="k_absoluteValue0_'+abjack+'" class="coefficient" oninput="absoluteValueArray['+abjack+'].update('+ abjack +','+num+')">'
        +'</div></div>');
     }

     //change this to function
     $("#absoluteValue" + abjack).css('background-color', '#242424');


     $('.absoluteValue_function_header').css('background-color', 'inherit');
     $('.absoluteValue_equation').css('background-color', 'inherit');
     $('.pow').css('background-color', 'inherit');

     $('.pow').css('display', 'inline');
     $('.pow').css('color', 'white');

     $('.absoluteValue_function').css('position', 'absolute');
     $('.absoluteValue_function_header').css('padding', '0');
     $('.absoluteValue_function_header').css('margin', '0');

     $('.absoluteValue_function').css('border-radius', '20px')
     $('.absoluteValue_function').css('height', '18px');
     $('.absoluteValue_function').css('width', '150px');
     $('.absoluteValue_function').css('padding', '14px');
     $('.absoluteValue_function').css('border-radius', '20px');

     $('.absoluteValue_function_header').css('width', '150px');
     $('.absoluteValue_function_header').css('height', '18px');
     $('.absoluteValue_function_header').css('padding','14px');
     $('.absoluteValue_function_header').css('border-radius', '20px');
     $('.absoluteValue_function_header').css('position', 'absolute');
     $('.absoluteValue_function_header').css('top','-1px');
     $('.absoluteValue_function_header').css('left', '-0px');

     $('.coefficient').css('width', '10');
     $('.coefficient').css('border-style', 'none');
     $('.coefficient').css('color', 'black');
     $('.coefficient').css('background-color', 'white');
     $('.coefficient').css('text-align', 'right');
     $('.coefficient').css('border-radius', '5px');
     $('.absoluteValue_equation').css('width', '150px');
     $('.absoluteValue_equation').css('position', 'absolute');
     $('.absoluteValue_equation').css('z-index', '3');
     $('.absoluteValue_function_header').css('z-index',' 1');

     //change this for function

        let abStr = "absoluteValue"+abjack;

        dragElement(document.getElementById(abStr));


   abjack++;
   }

 this.update = function(c, num) {
   if(num == 0){
     let id = "absoluteValue" + c;
     let a = document.getElementById('a_absoluteValue0_' + c).value;
     let h = document.getElementById('h_absoluteValue0_' + c).value;
     let k = document.getElementById('k_absoluteValue0_' + c).value;
     newEquation = a + "* abs(x - " + h + ") + " + k;

     jsgcalc.removeLineById(id);

     jsgcalc.lines.push({
       equation: newEquation,
       color: newcolor,
       id: id
     });

     jsgcalc.draw();
     oldEquation = newEquation;
 } else if(num == 1){


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

let abjack = 0;
this.defineAbsoluteValue = function(num) {

 absoluteValue_0 = new AbsoluteValue();
 absoluteValue_1 = new AbsoluteValue();
 absoluteValue_2 = new AbsoluteValue();
 absoluteValue_3 = new AbsoluteValue();
 absoluteValue_4 = new AbsoluteValue();

 absoluteValueArray = [];
 absoluteValueArray[0] = absoluteValue_0;
 absoluteValueArray[1] = absoluteValue_1;
 absoluteValueArray[2] = absoluteValue_2;
 absoluteValueArray[3] = absoluteValue_3;
 absoluteValueArray[4] = absoluteValue_4;


 absoluteValueArray[abjack].init(num);

}

 //dragging elements
 this.tool = "drag"


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






jsgui = new JSgui;

$(document).ready(function() {
 //addEquations();
 //addQuadraticButton();
 //addLinearButton();
 //addsquareRootButton();
 //displayTemps(4);

 $(".toolbox_close a").click(function() {
   $(".toolbox").hide();
 })

 document.body.onselectstart = function () { return false; }
});
