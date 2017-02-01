	angular.module("masalaapp")
	.directive("productBox", productBox);


	function productBox() {
		var box = {
			restrict: "E",
			scope: {
				itemInCart: "&",
				addToCart: "&",
				removeFromCart: "&",
				product: "@"
			},
			templateUrl: "products/product-box.tmpl.html",
			link: function(scope, element, attrs) {
			}
		}
		return box;
	}