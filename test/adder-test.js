function adder(base) {
	return function (num) {
		return base + num;
	};
}

TestCase("AdderTest", {
	"test should add or subtract one from arg": function () {
		var inc = adder(1);
		var dec = adder(-1);
		
		assertEquals(3, inc(2));
		assertEquals(3, dec(4));
		assertEquals(3, inc(dec(3)));
	}
});