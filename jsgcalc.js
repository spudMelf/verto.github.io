
function dump(text) {
	console.log(text);
}

function float_fix(num) {
	//Rounds floating points
	return Math.round(num * 10000000) / 10000000
}

function JSgCalc (element){
	this.graph = document.getElementById(element);

	this.graphElement = $("#"+element);
	this.width = $("#wrapper").width();
	this.height = $("#wrapper").height();
	this.maxgridlines = {x : 13, y : 13};
	this.charHeight = 8;
	this.startDrag = {x : 0, y : 0};
	this.prevDrag = {x : 0, y : 0};
	this.startCoord = {x1 : 0, y1 : 0, x2 : 0, y2 : 0};
	this.currCoord = {x1 : -5, y1 : -5, x2 : 5, y2 : 5};
	this.mousebutton = 0;
	this.canvasX = this.graph.offsetLeft;
	this.canvasY = this.graph.offsetTop;
	this.calccache = new Object;
	this.quality = 1;
	this.zoomFactor = 0.1;
	this.lines = [];
	this.fillareapath;


	this.arbRound = function(value, roundTo) {
		return Math.round(value/roundTo)*roundTo;
	};

	this.resizeDesk = function() {
		$('#desk').css('width', $('#desk').width() + 10);
		$('#desk').css('height', $('#desk').width() + 10);

	}

	this.resizeCanvas = function() {
		$('#background').css('width', this.width + 2);
		$('#background').css('height', this.height+ 5);
	}

	this.arbFloor = function(value, roundTo) {
		return Math.floor(value/roundTo)*roundTo;
	};

	this.copyCoord = function(coord) {
		return {x1 : coord.x1, y1 : coord.y1, x2 : coord.x2, y2 : coord.y2};
	};

	this.clearScreen = function() {
		//this.ctx.fillStyle = "rgba(255,255,255,0.0)";
		this.ctx.clearRect (0, 0, this.width, this.height);
	};

	this.getEquation = function(lineid) {
		if(this.lines[lineid])
			return this.lines[lineid].equation;
		return false;
	};

	this.getEquationPosition = function(id) {
		for(let i = 0; i < this.lines.length; i++) {
			if(id === this.lines[i].id)
				return i;
		}
	}

	this.removeLine = function(equation) {
		let newLineArray = [];
		for(let i = 0; i < this.lines.length; i++) {
			if(equation !== this.lines[i].equation)
			newLineArray.push(this.lines[i]);
		}
		this.lines = newLineArray;

	}

	this.removeLineById = function(id) {
		let newLineArray = [];
		for(let i = 0; i < this.lines.length; i++) {
			if(id !== this.lines[i].id)
			newLineArray.push(this.lines[i]);
		}
		this.lines = newLineArray;

	}

	this.drawEquation = function(equation, color, thickness, right, left) {

		if(!equation)
			return false;

		var x1 = this.currCoord.x1;
		var x2 = this.currCoord.x2;
		var y1 = this.currCoord.y1;
		var y2 = this.currCoord.y2;

		var xrange = x2 - x1;
		var yrange = y2 - y1;

		var scale = this.getScale();

		if(!this.calccache[equation])
			this.calccache[equation] = new Object;

		this.ctx.strokeStyle = color;
		var old_linewidth = this.ctx.linewidth
		if(thickness)
			this.ctx.linewidth = thickness;
		this.ctx.beginPath();
		//We don't want to draw lines that go off the screen too much, so we keep track of how many times we've had
		//to go off the screen here
		var lineExists = 0;
		var lastpoint = 0;

		this.fillareapath = [];
		this.fillareapath.push([0, this.height - ((-y1) * scale.y)]);
		//Loop through each pixel

		var inverseQuality = 1.0 / this.quality;
		var inverseScaleX = 1.0 / scale.x;

		var maxxval = this.width + inverseQuality;


		var f = Calc.makeFunction(equation);

		for(var i = 0; i <= maxxval; i += inverseQuality) {
			var xval = i * inverseScaleX + x1;	//calculate the x-value for a given pixel
      var yval = f(xval);

			var ypos = this.height - ((yval - y1) * scale.y);
			//The line is on the screen, or pretty close to it
			if(ypos >= (this.height * -1) && ypos <= this.height * 2) {
				if(lineExists > 1)
					this.ctx.beginPath();

				if(lastpoint !== false && ((lastpoint > 0 && yval < 0) || (lastpoint < 0 && yval > 0))) {
					this.ctx.moveTo(i, ypos);
				}
				else {
					this.ctx.lineTo(i, ypos);
				}

				lineExists = 0;
				lastpoint = false;
			}
			else if(lineExists <= 1) {	//The line is off the screen
				this.ctx.lineTo(i, ypos);
				lastpoint = yval;
				this.ctx.stroke();
				lineExists++;
			}
			this.fillareapath.push([i, ypos]);
			//this.ctx.fillRect(i - 0.5, ypos - 0.5, 1, 1);
		}
		this.fillareapath.push([maxxval, this.height - ((-y1) * scale.y)]);
		this.ctx.stroke();
		this.ctx.linewidth = old_linewidth
	};

	this.filterLines = function(array) {
		//remove extra lines from this.lines for easier use in other functions
		let filLines = [];
		filLines.push(array[0]);
		for(let i = 1; i < array.length; i++){
			let count = 0;
			for(let c = 0; c < filLines.length; c++){
				if(filLines[c].id === array[i].id)
				{
					continue;
				}
				else {
					count++;
				}
				if(count === filLines.length)
					filLines.push(array[i]);
			}
		}
		return filLines;
	}

	this.rearrangeLines = function(filLines) {
		//sort lines based on domain
		let reLines = [];
		reLines.push(filLines[0]);
		for(let i = 1; i < filLines.length; i++) {
			for(let r = reLines.length - 1; r >= 0; r--) {
				if(filLines[i].right > reLines[r].right) {
					reLines.splice(r + 1, 0, filLines[i]);
					r = -1;
				}
				if(r === 0){
					if(filLines[i].right < reLines[r].right){
					reLines.splice(0, 0, filLines[i]);
					}
				}
			}
		}
		return reLines;
	}

/*	this.existsOverDomain = function(lines) {
		//determines if functions are defined from whole interval -8 to 8

		if(lines[0].left != -8) {
			return [-8, this.lines[0].left];
		}

		if(lines[lines.length - 1].right != 8){
			return [this.lines[lines.length - 1].right, 8];
		}

		for(let i = 0; i < lines.length - 1; i++) {
			if(lines[i].right != lines[i + 1].left) {
				return [lines[i].right, lines[i + 1].left];
			}
		}
		return 0;
	}

	this.highlightDomainError = function(twoValArray) {
		/*
		let scale = this.getScale();
	  left = (this.width / 2) + twoValArray[0] * scale.x;
		right = (this.width / 2) + twoValArray[1] * scale.x;

		this.ctx.globalAlpha = 0.2;
		this.ctx.fillStyle = 'red';
		this.ctx.fillRect(left, 0, right-left, this.graph.height);

		$('#resolve_button').append('<input id="resolve" type="button" value="Resolve Issues" onclick="jsgcalc.resolve(' + left + ', ' + right + ')">');

		alert('Uh oh, looks like you have some issues with your domains [' + twoValArray[0] + ' < x < ' + twoValArray[1] + ']!');

	}

	this.resolve = function(left, right) {
		this.ctx.clearRect(left, 0, right-left, this.graph.height);
		this.ctx.globalAlpha = 1.0;
		jsgcalc.drawGrid();
		jsgcalc.draw();
		let resolve = document.getElementById('resolve');
		resolve.remove();
	}

	this.isContinuous = function(lines) {
		for(let i = 0; i < lines.length - 1; i++) {
			if(this.evalExp(lines[i].equation, lines[i].right) != this.evalExp(lines[i + 1].equation, lines[i + 1].left))
				return [this.lines[i], this.lines[i + 1]];
		}
		return 0;
	}

	this.highlightLineValueError = function(array) {
		let line1 = array[0];
		let line2 = array[1];

		let pLine = line1.right;
		if(line1.right > line2.right) {
			pLine = line2.right;
		}

		for(let i = 0; i < this.lines.length; i++){
			if(line1.id == this.lines[i].id || line2.id == this.lines[i].id) {
			}
		}
		jsgcalc.draw();
		alert('Line value error at x = ' + pLine);
		//$('#resolve_button').append('<input id="resolve_value" type="button" value="Resolve Issues" onclick="jsgcalc.resolveDiscontinuity()">');
		//alert('Press resolve issues before procedding!');
	}

	this.resolveDiscontinuity = function() {
	for(let i = 0; i < this.lines.length; i++) {
		this.lines[i].color = '#407294';
	}
	jsgcalc.draw();

	let re = document.getElementById('resolve_value');
	re.remove();
}

*/

	this.drawFillArea = function() {
		if (this.fillareapath.length < 1) {
			return;
		}

		this.ctx.beginPath();
		this.ctx.fillStyle="rgba(0, 0, 0, 0.1)";
		for(var i = 0; i < this.fillareapath.length; i++) {
			if (i === 0) {
				this.ctx.lineTo(this.fillareapath[i][0], this.fillareapath[i][1]);
			}
			else {
				this.ctx.lineTo(this.fillareapath[i][0], this.fillareapath[i][1]);
			}
		}
		this.ctx.fill();
	}

	this.drawGrid = function() {
		this.clearScreen();

		var x1 = this.currCoord.x1;
		var x2 = this.currCoord.x2;
		var y1 = this.currCoord.y1;
		var y2 = this.currCoord.y2;

		var xrange = x2 - x1;
		var yrange = y2 - y1;

		//Calculate the numeric value of each pixel (scale of the graph)
		var xscale = Math.max(xrange/this.width, 1E-20);
		var yscale = Math.max(yrange/this.height, 1E-20);

		//Calculate the scale of the gridlines
		for(i = 0.000000000001, c = 0; xrange/i > this.maxgridlines.x -1; c++) {
			if(c % 3 === 1) i *= 2.5;	//alternating between 2, 5 and 10
			else i *= 2;

            // Ensure we don't get into an infinite loop
            if (c > 10000) {
                break;
            }
		}
		this.xgridscale = i;

		//do the same for the y-axis
		for(i = 0.000000000001, c = 0; yrange/i > this.maxgridlines.y -1; c++) {
			if(c % 3 == 1) i *= 2.5;
			else i *= 2;

            // Ensure we don't get into an infinite loop
            if (c > 10000) {
                break;
            }
		}
		this.ygridscale = i;

		this.ctx.font = "10pt 'open sans'";	//set the font
		this.ctx.textAlign = "center";

		var xaxis = yaxis = null;

		//currx is the current gridline being drawn, as a numerical value (not a pixel value)
		var currx = this.arbFloor(x1, this.xgridscale);	//set it to before the lowest x-value on the screen
		var curry = this.arbFloor(y1, this.ygridscale);
		var xmainaxis = this.charHeight * 1.5;	//the next two variables are the axis on which text is going to be placed
		var ymainaxis = -1;
		currx = float_fix(currx);	//flix floating point errors
		curry = float_fix(curry);

		if(y2 >= 0 && y1 <= 0)	//y=0 appears on the screen - move the text to follow
			xmainaxis = this.height - ((0-y1)/(y2-y1))*this.height + (this.charHeight * 1.5);
		else if(y1 > 0)	//the smallest value of y is below the screen - the x-axis labels get pushed to the bottom of the screen
			xmainaxis = this.height - 5;

		//the x-axis labels have to be a certain distance from the bottom of the screen
		if(xmainaxis > this.height - (this.charHeight / 2))
			xmainaxis = this.height - 5;

		//do the same as above with the y-axis
		if(x2 >= 0 && x1 <= 0)	//y-axis in the middle of the screen
			ymainaxis = ((0-x1)/(x2-x1))*this.width - 2;
		else if(x2 < 0)	//y-axis on the right side of the screen
			ymainaxis = this.width-6;

		if(ymainaxis < (this.ctx.measureText(curry).width + 1)) {
			ymainaxis = -1;
		}

		var sigdigs = String(currx).length + 3;
		//VERTICAL LINES
		for(i = 0; i < this.maxgridlines.x; i++) {
			xpos = ((currx-x1)/(x2-x1))*this.width;	//position of the line (in pixels)
			//make sure it is on the screen
			if(xpos-0.5 > this.width + 1 || xpos < 0) {
				currx += this.xgridscale;
				continue;
			}

			//currx = Calc.roundToSignificantFigures(currx, sigdigs);
			currx =  float_fix(currx);

			if(currx === 0)
				xaxis = xpos;

			if(jsgui.gridlines === "normal" || (jsgui.gridlines === "less" && Calc.roundFloat(currx) % Calc.roundFloat((this.xgridscale*2)) === 0)) {
				this.ctx.fillStyle = "#000000";
				this.ctx.fillRect (xpos-0.5, 0, 1, this.height);
			}
			this.ctx.fillStyle = "#000000";

			//Draw label
			if (currx != 0) {
				var xtextwidth = this.ctx.measureText(currx).width;
				if (xpos + xtextwidth * 0.5 > this.width) //cannot overflow the screen
					xpos = this.width - xtextwidth * 0.5 + 1;
				else
					if (xpos - xtextwidth * 0.5 < 0)
						xpos = xtextwidth * 0.5 + 1;
				this.ctx.fillText(currx, xpos, xmainaxis);
			}

			currx += this.xgridscale;

		}
		this.ctx.textAlign = "right";
		sigdigs = String(curry).length + 3;

		//HORIZONTAL LINES
		for(i = 0; i < this.maxgridlines.y; i++) {
			ypos = this.height - ((curry-y1)/(y2-y1))*this.height;	//position of the line (in pixels)
			//make sure it is on the screen
			if(ypos-0.5 > this.height + 1 || ypos < 0) {
				curry += this.ygridscale;
				continue;
			}

			//curry = Calc.roundToSignificantFigures(curry, sigdigs);
			curry = float_fix(curry);

			if(curry == 0)
				yaxis = ypos;

			if(jsgui.gridlines == "normal" || (jsgui.gridlines == "less" && Calc.roundFloat(curry) % (Calc.roundFloat(this.ygridscale*2)) == 0)) {
				this.ctx.fillStyle = "#000000";
				this.ctx.fillRect (0, ypos-0.5, this.width, 1);
			}
			this.ctx.fillStyle = "#000000";

			//Draw label
			if (curry != 0) {
				var ytextwidth = this.ctx.measureText(curry).width;
				if (ypos + (this.charHeight / 2) > this.height) //cannot overflow the screen
					ypos = this.height - (this.charHeight / 2) - 1;
				if (ypos - 4 < 0)
					ypos = 4;
				var xaxispos = ymainaxis;
				if (ymainaxis == -1)
					xaxispos = ytextwidth + 1;
				this.ctx.fillText(curry, xaxispos, ypos + 3);
			}
			curry += this.ygridscale;
		}
		//Draw the axis
		if(xaxis)
			this.ctx.fillRect (xaxis-0.5, 0, 1, this.height);
		if(yaxis)
			this.ctx.fillRect (0, yaxis-0.5, this.width, 1);
	};
	//get the pixel coordinates of a value
	this.getCoord = function(x, y) {
		var xpos = ((x-this.currCoord.x1)/(this.currCoord.x2-this.currCoord.x1))*this.width;
		var ypos = this.height - ((y-this.currCoord.y1)/(this.currCoord.y2-this.currCoord.y1))*this.height;
		return {x : xpos, y : ypos};
	};

	this.draw = function() {
		this.drawGrid();
		for(var i in this.lines) {
			    this.drawEquation(this.lines[i].equation, this.lines[i].color, 3);
		}
	};

	var started = false;
		this.checkMove = function(x, y) {
			if(x === this.prevDrag.x && y === this.prevDrag.y)
				return;

			var scale = this.getScale();
			if(this.mousebutton === 1) {
				if(jsgui.currtool === "zoombox" || jsgui.currtool === "zoombox_active") {	//ZOOM BOX
					this.draw();
					this.ctx.strokeStyle = "rgb(150,150,150)";
					this.ctx.strokeRect (this.startDrag.x, this.startDrag.y, x-this.startDrag.x, y-this.startDrag.y);
				}
				else { //CLICK AND DRAG
					//dump(scale.x + " " + scale.y + " -- " + this.startCoord.x1 + " " + this.startCoord.y1);
					//dump(this.startCoord.x1 + " " +(y - this.startDrag.y) / scale.y);
					this.currCoord.x1 = this.startCoord.x1 - ((x - this.startDrag.x) / scale.x);
					this.currCoord.x2 = this.startCoord.x2 - ((x - this.startDrag.x) / scale.x);

					this.currCoord.y1 = this.startCoord.y1 + ((y - this.startDrag.y) / scale.y);

					this.currCoord.y2 = this.startCoord.y2 + ((y - this.startDrag.y) / scale.y);

					this.draw();
				}
			}
			this.prevDrag = {x : x, y : y};
		}

	this.mouseDown = function(event) {
				document.body.style.cursor = "hand";
				if(this.mousebutton == 0) {
					if(jsgui.currtool === "zoombox") {
						jsgui.currtool = "zoombox_active";
					}
					this.startDrag.x = event.pageX - this.canvasX;
					this.startDrag.y = event.pageY - this.canvasY;
					this.startCoord = this.copyCoord(this.currCoord);
				}
				this.mousebutton = 1;
		};

	this.mouseUp = function(event) {
				//document.body.style.cursor = "auto";
			if(jsgui.currtool === "zoombox_active") {
					this.doZoomBox(this.startDrag.x, this.startDrag.y, event.pageX - this.canvasX, event.pageY - this.canvasY);
					jsgui.setTool("pointer");
				}
				if(jsgui.currtool === "zoomin") {
					if(Math.abs((event.pageX - this.canvasX) - this.startDrag.x) + Math.abs((event.pageY - this.canvasY) - this.startDrag.y) < 5)
						this.zoom(0.10, event);
				}
				if(jsgui.currtool === "zoomout") {
					if(Math.abs((event.pageX - this.canvasX) - this.startDrag.x) + Math.abs((event.pageY - this.canvasY) - this.startDrag.y) < 5)
						this.zoom(-0.10, event);
				}
				this.mousebutton = 0;
				this.startCoord = this.copyCoord(this.currCoord);
		};


	//Gets the scale (pixels per unit)
	this.getScale = function() {
		return {x : (this.width / (this.startCoord.x2 - this.startCoord.x1)),
			y : (this.height / (this.startCoord.y2 - this.startCoord.y1))}
	};

	this.resizeGraph = function(width, height) {
		var oldheight = this.height;
		var oldwidth = this.width;

		//Resize the elements
		$("#graph").width(width);
		$("#graph").height(height);
		this.ctx.height = height;
		this.ctx.width = width;
		this.graph.height = height;
		this.graph.width = width;
		this.height = height;
		this.width = width;
		dump("Resized to " + width + "x" + height);

		//Compute the new boundaries of the graph
		this.currCoord.x1 *= (width/oldwidth);
		this.currCoord.x2 *= (width/oldwidth);
		this.currCoord.y1 *= (height/oldheight);
		this.currCoord.y2 *= (height/oldheight);
		this.startCoord = this.copyCoord(this.currCoord);

		//Compute how many grid lines to show
		this.maxgridlines.x = 0.015 * width;
		this.maxgridlines.y = 0.015 * height;
		this.draw();
	};

	this.initCanvas = function() {
		if (this.graph.getContext){
			this.ctx = this.graph.getContext('2d');
			this.ctx.globalAlpha = 0.0;
			$("#graph_wrapper").width($("#graph_wrapper").width() - $("#sidewrapper").innerWidth() - $("#toolbar").innerWidth());
			this.resizeGraph($("#graph_wrapper").innerWidth(), $("#graph_wrapper").height());
			this.currCoord = {x1 : -5 * (this.width / this.height), y1 : -5, x2 : 5 * (this.width / this.height), y2 : 5};
			this.startCoord = this.copyCoord(this.currCoord);
			jsgcalc.resizeCanvas();
			jsgcalc.draw();

			var self = this;
			$("#graph").mousemove(function(event) {
				self.canvasX = self.graph.offsetLeft;
				self.canvasY = self.graph.offsetTop;
				self.checkMove(event.pageX - self.canvasX, event.pageY - self.canvasY);
			}).mousedown(function(event) {
				self.mouseDown(event);
			}).mousewheel(function(event, delta) {
				self.mouseWheel(event, delta);
				return false;
			}).mouseup(function(event) {
				self.mouseUp(event);
			});
		}
	};
};

$(document).ready(function() {
	jsgcalc = new JSgCalc("graph");

	jsgcalc.initCanvas();
});
