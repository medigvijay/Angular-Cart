console.log(angular.module("masalaapp"));
	angular.module("masalaapp")
	.service("productService", function($http) {
		this.getProductList = function () {
			return $http.get("data/list.json");
		};
	});