//Polyfill
//This polyfill covers the main use case which is creating a new object for which the prototype has been chosen but doesn't take the second argument into account.
//
//Note that while the setting of null as [[Prototype]] is supported in the real ES5 Object.create, this polyfill cannot support it due to a limitation inherent in versions of ECMAScript lower than 5.
//
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
//
//Angular DataTables is using Object.create() to instanciate options and columns.
//If you need to support IE8, then you need to add this Polyfill.
if (typeof Object.create !== "function") {
	Object.create = function (proto, propertiesObject) {
		if (!(proto === null || typeof proto === "object" || typeof proto === "function")) {
			throw TypeError('Argument must be an object, or null');
		}
		var temp = new Object();
		temp.__proto__ = proto;
		Object.defineProperties(temp, propertiesObject);
		return temp;
	};
}