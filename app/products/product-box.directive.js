angular.module("cartapp")
	.directive("productbox", productBox);

function productBox($parse, $interpolate, cartService) {
	return {
		restrict: "E",
		scope: {
			item: "=",
		},
		templateUrl: "products/product.tpl.html",
		link: function(scope, elem, attrs) {
			scope.itemInCart = false;
			scope.itemCount = 0;

			scope.$on("item-deleted", function(abc,id) {
				if(id === scope.item.id) {
					scope.itemInCart = false;
					scope.itemCount = 0;
				}
			});
			scope.addItem = function(id) {
				var added = scope.$parent.addItem(scope.item);
				if(added) {
					scope.itemInCart = true;
					scope.itemCount += 1;
				}
			};

			scope.removeItem = function(id) {
				if(scope.itemCount > 0) {
					var removed = scope.$parent.removeItem(scope.item);
					if(removed) {
						scope.itemCount -= 1;
						if(scope.itemCount === 0) {
							scope.itemInCart = false;
						}	
					}
				}
				
			};
		}
	};
}