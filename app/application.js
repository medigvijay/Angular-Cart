(function() {

angular.module("cartapp", [])
	.controller("appCtrl", ["$scope",'cartService', controller]);


	function controller($scope, cartService) {

		$scope.productList = [{"name":"Chat Masala","brandname":"MDH","img":"images/art.jpg","id":"pid1","price":10},{"name":"Sambhar Masala","brandname":"MTR","img":"images/art.jpg","id":"pid2","price":16},{"name":"Chana Masala","brandname":"Everest","img":"images/art.jpg","id":"pid3","price":21},{"name":"Tea Masala","brandname":"MTR","img":"images/art.jpg","id":"pid4","price":33}];

		
		$scope.cart = cartService.getCart();


		$scope.isCartEmpty = $scope.cart.length === 0 ? true : false;

		$scope.addItem = function(pro) {
			var items = $scope.productList.filter(function(item) {
				return item.id === pro.id;
			});
			var added = cartService.addToCart(items[0]);

			if(added) {
				$scope.cart = cartService.getCart();
				$scope.isCartEmpty = $scope.cart.length === 0 ? true : false;
			}
			$scope.$broadcast("cart-updated");
			return added;
		};

		$scope.removeItem = function(pro) {
			var items = $scope.productList.filter(function(item) {
				return item.id === pro.id;
			});
			var removed = cartService.removeFromCart(items[0]);
			if(removed) {
				$scope.cart = cartService.getCart();
				$scope.isCartEmpty = $scope.cart.length === 0 ? true : false;	
			}
			$scope.$broadcast("cart-updated");
			return removed;
		};

		$scope.deleteItem = function(pro) {
			var items = $scope.productList.filter(function(item) {
				return item.id === pro.id;
			});
			var removed = cartService.removeItem(items[0]);
			if(removed) {
				$scope.cart = cartService.getCart();
				$scope.isCartEmpty = $scope.cart.length === 0 ? true : false;	
			}
			$scope.$broadcast("item-deleted", pro.id);
			return removed;
		}
	}
})();