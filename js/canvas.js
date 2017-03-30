window.onload = function() {
	var oCG 	 = document.getElementById('background-canvas');
	var oCGR 	 = oCG.getContext('2d');
	var WIDTH    = window.innerWidth;
	var HEIGHT   = window.innerHeight;
	var POINT    = 40;
	var R 	 	 = 10;
	var circleArr = [];
	oCG.width = WIDTH;
	oCG.height = HEIGHT;
	oCG.style.backgroundColor = '#f1f1f1';

	function drawLine(x, y, xx, yy, o) {
		oCGR.beginPath();
		oCGR.strokeStyle = 'rgba(0,0,0,' + o + ')';
		oCGR.moveTo(x, y);
		oCGR.lineTo(xx, yy);
		oCGR.closePath();
		oCGR.stroke();
	}

	function drawCircle(x, y, r) {
		oCGR.beginPath();
		oCGR.fillStyle = 'rgba(0,0,0,.4)';
		oCGR.arc(x, y, r, 0, 2*Math.PI);
		oCGR.closePath();
		oCGR.fill();
	}

	function init() {
		
		var i;
		for(i = 0; i < POINT; i++) {
			var temp1 = Math.random() > 0.5 ? 1 : -1;
			var temp2 = Math.random() > 0.5 ? 1 : -1;
			circleArr.push({ 
				x: WIDTH * Math.random(), 
				y: HEIGHT * Math.random(), 
				r: R * Math.random(),
				moveX: temp1 * Math.random(),
				moveY: temp2 * Math.random(),
			})
		}
	}

	function draw() {
		oCGR.clearRect(0, 0, WIDTH, HEIGHT);
		var i,j,k;
		for(i = 0; i < POINT; i++) {
			var circle = circleArr[i];
			drawCircle(circle.x, circle.y, circle.r);
		}
		for(j = 0; j < POINT; j++) {
			for(k = 0; k < POINT; k++) {
				if( j !== k) {
					var A = Math.abs(circleArr[k].x - circleArr[j].x);
					var	B = Math.abs(circleArr[k].y - circleArr[j].y);
					var lineLength = Math.sqrt(A*A + B*B);
					var C = 1/lineLength*7-0.009;
					var lineOpacity = C > 0.03 ? 0.03 : C;
					if (lineOpacity > 0) {
						drawLine(circleArr[j].x, circleArr[j].y, circleArr[k].x, circleArr[k].y, lineOpacity);
					}
				}
			}
		}
	}

	function move() {
		var i;
		for(i = 0; i < POINT; i++) {
			var circle = circleArr[i];
			circle.x += circle.moveX;
			circle.y += circle.moveY;
			if(circle.x > WIDTH || circle.x < 0){
				circle.moveX *= -1;
			}
			if(circle.y > HEIGHT || circle.y < 0){
				circle.moveY *= -1;
			}
		}
	}




	init();
	setInterval(function() {
		draw();
		move();
	}, 16);
}

	