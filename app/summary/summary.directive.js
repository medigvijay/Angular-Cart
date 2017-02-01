angular.module("cartapp")
	.directive("summarypane", summaryPane);

function summaryPane($parse, $interpolate, cartService) {
	return {
		restrict: "E",
		scope: {
			isCartEmpty: "=",
		},
		templateUrl: "summary/summary.tpl.html",
		link: function(scope, elem, attrs) {
			scope.cart = cartService.getCart();
			scope.totalPrice = cartService.getCartValue();
			scope.$on("cart-updated", function() {
				scope.cart = cartService.getCart();
				scope.totalPrice = cartService.getCartValue();
			});

			// scope.addItem = function(id) {
			// 	var added = cartService.addToCart(id);
			// 	if(added) {
			// 		scope.itemInCart = true;
			// 		scope.itemCount += 1;
			// 	}
			// };

			scope.removeItemFromCart = function(item) {
				var removed = scope.$parent.deleteItem(item);
				if(removed) {
					scope.cart = cartService.getCart();
					scope.totalPrice = cartService.getCartValue();
				}
			};
		}
	};
}