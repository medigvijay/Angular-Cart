(function() {
	angular.module("masalaapp", [])
	.controller("masalaCtrl", ['$scope', 'productService', masalaController]);


	function masalaController($scope, productService) {


		$scope.isCartEmpty = true;

		$scope.productList = [{
			"name": "Chat Masala",
			"brandname": "MDH",
			"img": "images/art.jpg",
			"id": "pid1"
		},
		{
			"name": "Sambhar Masala",
			"brandname": "MTR",
			"img": "images/art.jpg",
			"id": "pid2"
		},
		{
			"name": "Chana Masala",
			"brandname": "Everest",
			"img": "images/art.jpg",
			"id": "pid3"
		},
		{
			"name": "Tea Masala",
			"brandname": "MTR",
			"img": "images/art.jpg",
			"id": "pid4"
		}];
		$scope.cart = [];

		/*productService.getAllProducts()
		.then(function(data) {
			$scope.productList = data.list;
		});
*/
		$scope.itemInCart = function(pid) {
			for(var i = 0; i < $scope.cart.length; i++) {
				if($scope.cart[i].id === pid) {
					return true;
				}
			}
			//
			return false;
		}

		$scope.addToCart = function(pid) {
			var item = null;
			// check if item already in cart
			// Just if yes increment the count and update the total Price

			if($scope.itemInCart(pid)) {
				for(var i = 0; i < $scope.cart.length; i++) {
					if(pid == $scope.cart[i].id) {
						$scope.cart[i].itemCount += 1;
						$scope.cart[i].totalPrice += 10;// assuming prise of one item is 10 // need to get it from item list;
					}
				}
			}
			// else
			else {
				for(var i = 0; i < $scope.productList.length; i++) {
					var cp = $scope.productList[i];
					if($scope.productList[i].id === pid) {
						$scope.cart.push({
							name: cp.name,
							itemCount: 1,
							totalPrice: cp.price 
						})
					}
				}
			}
			$scope.updateSummary();
			$scope.isCartEmpty = false;
			if(!$scope.$$phase)$scope.$apply();

			//$scope.broadcast("CART-UPDATED", cart);
		}

		$scope.updateCount = function(pid) {
			var total = 0;
			var count = $scope.cart.reduce(function(total, item) {
				if(item.id === pid) {
					total++;
				}
			});
			return total;
		}

		$scope.removeAllFromCart = function(pid) {
			$scope.cart = $scope.cart.filter(function(item) {
				return item.id !== pid;
			});
			if(!$scope.cart.length) {
				$scope.isCartEmpty = false;
			}
			$scope.updateSummary();
			if(!$scope.$$phase)$scope.$apply();
		}

		$scope.removeFromCart = function(pid) {
			var item = null;
			// check if item already in cart
			// Just if yes increment the count and update the total Price

			if($scope.itemInCart(pid) !== 0) {
				for(var i = 0; i < $scope.cart.length; i++) {
					if(pid == $scope.cart[i].id) {
						$scope.cart[i].itemCount -= 1;
						$scope.cart[i].totalPrice -= 10;// assuming prise of one item is 10 // need to get it from item list;
					}
				}
			} else {
				// else
				for(var i = 0; i < $scope.productList.length; i++) {
					var cp = $scope.productList[i];
					if($scope.productList[i].id === pid) {
						$scope.cart.splice(i, 1);
					}
				}
			}
			
			$scope.updateSummary();
			if(!$scope.cart.length) {
				$scope.isCartEmpty = true;
			}
		}



		$scope.updateSummary = function() {
			var total = 0;
			$scope.totalPrice = 0;
			$scope.cart.reduce(function(totalprice, item) {
				total+= item.price;
			});
			$scope.totalPrice = total;
		}

	}

	
})();