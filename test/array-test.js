TestCase("ArrayTest", {
	"test array splice should modify array": function () {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.splice(2, 3);
		
		assertEquals([1, 2], arr);
	},

	"test array splice should return removed items": function () {
		var arr = [1, 2, 3, 4, 5];
		var result = arr.splice(2, 3);
		
		assertEquals([3, 4, 5], result);
	}
});

TestCase("ArrayLoopTest", {
	"test looping should iterate over all items":
	function () {
		var array = [1, 2, 3, 4, 5, 6];
		var result = [];
		
		// Standard for-loop
		for (var i = 0, l = array.length; i < l; i++) {
			result.push(array[i]);
		}
		assertEquals("123456", result.join(""));
	},
	
	"test for-in loop should iterate over all items":
	function () {
		var array = [1, 2, 3, 4, 5, 6];
		var result = [];
		
		for (var i in array) {
			if (array.hasOwnProperty(i)) {
				result.push(array[i]);
			}
		}
		assertEquals("123456", result.join(""));
	}
});