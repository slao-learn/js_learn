TestCase("InheritTest", {
	"test should crate more spheres based on existing":
	function () {
		(function () {
			var circle = new Circle(6);
			var sphere = Object.create(circle);
			
			sphere.area = function () {
				return 4 * circle.area.call(this);
			};
			
			var sphere2 = Object.create(sphere);
			sphere2.radius = 10;
			
			assertEquals(1257, Math.round(sphere2.area()));
			assertEquals(452, Math.round(sphere.area()));
			assertEquals(113, Math.round(circle.area()));
		}());
	}	
});
