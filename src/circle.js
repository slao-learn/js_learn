function Circle(radius) {
	this.radius = radius;
}

function CircleProtected(radius) {
	if (!(this instanceof CircleProtected)) {
		return new CircleProtected(radius);
	}
	this.radius = radius;
}

(function (p) {
	p.diameter = function () {
		return this.radius * 2;
	};
	
	p.circumference = function () {
		return this.diameter() * Math.PI;
	} ;
	
	p.area = function () {
		return this.radius * this.radius * Math.PI;
	};
}(Circle.prototype));