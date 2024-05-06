try{
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	// Set initial canvas dimensions
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Update canvas dimensions when window is resized
	window.addEventListener('resize', function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

	var particles = [];

	function Particle(x, y, rgb) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 7 + 1;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
	}

	Particle.prototype.update = function() {
		this.x += this.speedX;
		this.y += this.speedY;

		if (this.size > 0.2) this.size -= 0.1;
	};

	Particle.prototype.draw = function() {
		let color = '173, 216, 230'
		if (theme=='light'){
			color = '45, 90, 150'
		}
		ctx.fillStyle = `rgba(${color},`+ this.size +')';
		ctx.strokeStyle = `rgba(${color},`+ this.size +')';

		ctx.lineWidth = 2;		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	};

	function createParticle(e) {
		var xPos = e.x+scrollX;
		var yPos = e.y+scrollY;

		for (var i = 0; i < 5; i++) {
			particles.push(new Particle(xPos, yPos));
		}
	}

	function animateParticles() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();

		if (particles[i].size <= 0.2) {
			particles.splice(i, 1);
			i--;
		}
		}	

		requestAnimationFrame(animateParticles);
	}

	window.addEventListener('click', (event)=>{
		let iterations=0
		let max = 25
		let int = setInterval(() => {
			iterations+=1;
			if (iterations==max){
				clearInterval(int);
				return;
			} else{
				var xPos = event.clientX+scrollX;
				var yPos = event.clientY+scrollY;

				for (var i = 0; i < 5; i++) {
					particles.push(new Particle(xPos, yPos));
				}
			}
		}, 10);
	});
	let blurred = false;
	animateParticles();
	let particleCreation = setInterval(() => {
		blurred==false?createParticle({x: Math.random() * canvas.width, y: Math.random() * canvas.height}):null;
	}, 50);
	window.addEventListener('blur', () => {
		blurred=true;	
	})
	window.addEventListener('focus', ()=>{
		blurred=false;
	})
}
catch(e){
	showErrorModal(e, 'canvas.js');
	console.error(e)
}