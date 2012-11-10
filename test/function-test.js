TestCase("FunctionTest", {
	"test function length property": function () {
		assertEquals(2, assert.length);
		if (/Chrome/.test(navigator.userAgent)) {
			assertEquals(0, document.getElementById.length);			
		} else {
			assertEquals(1, document.getElementById.length);
		}
		assertEquals(0, console.log.length);
	},
	
	"test function type is function": function () {
		assert("Should be true", typeof assert == "function");
	},
	
	"test scope": function () {
		function sum() {
			assertUndefined(i);
			assertException(function () {
				assertUndefined(someVar);
			}, "ReferenceError");
			var total = arguments[0];
			if (arguments.length > 1) {
				for (var i = 1, l = arguments.length; i < l; i++) {
					total += arguments[i];
				}
			}
			assertEquals(5, i);
			return total;
		}
		sum(1, 2, 3, 4, 5);
	}
});

TestCase("FormalParametersArgumentsTest", {
	"test dynamic relationship": function () {
		function modify(a, b) {
			b = 42;
			arguments[0] = arguments[1];
			return a;
		}
		assertEquals(42, modify(1, 2));
		if (/Chrome/.test(navigator.userAgent)) {
			assertEquals(42, modify(1));
		} else {
			assertUndefined(modify(1));
		}
	}
});

TestCase("FunctionBindTest", {
	"test bind calls original function with bound object as the this value": function () {
		var testObj = {
			getValue: function () {
				return this.value;
			}
		};
		var t = Object.create(testObj);
		t.value = 5;
		var s = Object.create(testObj);
		s.value = 1;
		
		String.prototype.dummy = testObj.getValue.bind(t);
		String.prototype.dummy1 = testObj.getValue.bind(s);
		assertEquals(5, "".dummy());
		assertEquals(1, "".dummy1());
	}
});
