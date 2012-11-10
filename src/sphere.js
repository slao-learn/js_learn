function Sphere(radius) {
	Circle.call(this, radius);
}

Sphere.prototype = (function () {
	function F() {};
	F.prototype = Circle.prototype;
	return new F();
}());

// Don't forget the constructor - else it will resolve as
// Circle through the prototype chain
Sphere.prototype.constructor = Sphere;
Sphere.prototype._super = Circle.prototype;

Sphere.prototype.area = function () {
	return 4 * this._super.area.call(this);
};
