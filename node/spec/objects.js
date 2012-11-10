describe('Objects', function () {
  it('should not have a setAttribute method by default', function () {
    var obj = {};
    expect(typeof obj.setAttribute).toEqual('undefined');
  });

  it('should not have own property once it is deleted', function () {
    var obj = { a : 'property' };
    delete obj.a;
    expect(typeof obj.a).toEqual('undefined');
  });

  it('should have prototype methods defined in class instances', function () {
    var Class = function() {};
    Class.prototype.aMethod = function(){};
    var obj = new Class();
    expect(typeof obj.aMethod).toEqual('function');
  });

  it('should still have prototype methods once prototype is deleted', function () {
    var Class = function() {};
    Class.prototype.aMethod = function(){};
    var obj = new Class();
    delete obj.prototype;
    expect(typeof obj.aMethod).toEqual('function');
  });

  it('should have prototype methods not be an object\'s own property', function () {
    var Class = function() {};
    Class.prototype.aMethod = function(){};
    var obj = new Class();
		expect(obj.hasOwnProperty('aMethod')).toBeFalsy();
  });

  it('should ollow overwriting a prototype method to an object\'s own property', function () {
    var Class = function() {};
    Class.prototype.aMethod = function(){return 'prototype method';};
    var obj = new Class();
    obj.aMethod = function(){return 'object method';};
    expect(obj.aMethod()).toEqual('object method');
    expect(obj.hasOwnProperty('aMethod')).toBeTruthy();
  });

  it('should ollow reverting an object\'s overwritten prototype method by deleting the overwriting method', function () {
    var Class = function() {};
    Class.prototype.aMethod = function(){return 'prototype method';};
    var obj = new Class();
    obj.aMethod = function(){return 'object method';};
    delete obj.aMethod;
    expect(obj.aMethod()).toEqual('prototype method');
    expect(obj.hasOwnProperty('aMethod')).toBeFalsy();
  });



  it('should allow conditional method overriding', function () {
    var BaseClass = function () {};
    BaseClass.prototype.destroy = function () {
      var self = this;
      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          delete this[i];
        } else {
          this['_old_' + i] = this[i];
          this[i] = (function (propName) {
            if (typeof self['_old_' + propName] === 'function') {
              return function () { 
                if (self._destroyed) {
                  return 'new function';
                } else {
                  return self['_old_' + propName].apply(this, arguments);
                }
              };
            } else {
              return undefined;
            }
          }(i));
        }
      }
      expect(this.testFunction()).toEqual('old function');
      this._destroyed = true;
    }

    BaseClass.prototype.testFunction = function () {
      return 'old function';
    };

    BaseClass.prototype.testAttribute = 'old attribute';

    var a = new BaseClass(); 
    a.destroy();
    expect(a.testFunction()).toEqual('new function');
    expect(a.testAttribute).not.toBeDefined();
  });

	it('should have typeof set to proper name', function() {
		var obj = {};
		expect(typeof obj).toEqual('object');
		var objName = 'Test';
		obj.name = objName;
		expect(typeof obj).toEqual(objName);
	});

  it('test', function () {
    var a = function () {
      throw new Error('Object is destroyed');
    };
    expect(function () {
      a();
    }).toThrow(new Error('Object is destroyed'));
  });
});
