angular.module("cartapp")
	.service("cartService", function() {
		this.cart = {};

		this.cart.items = [];
		this.cart.totalPrice = 0;

		this.addToCart = function(item) {
			var added = false;
			var itemExists = false;
			for(var i = 0; i < this.cart.items.length; i++) {
				var currItem = this.cart.items[i];
				if(currItem.id === item.id) {
					this.cart.items[i].totalPrice += item.price;
					this.cart.items[i].itemCount += 1;
					itemExists = true;
					added = true;
				}
			}
			if(!itemExists) {
				this.cart.items.push({
					id: item.id,
					price: item.price,
					totalPrice: item.price,
					itemCount: 1,
					name: item.name
				});
				added = true;
			}
			this.cart.totalPrice = 0;
			for(var i = 0; i < this.cart.items.length; i++) {
				this.cart.totalPrice += this.cart.items[i].totalPrice;
			}
			return added;
		}
		function updateTotal(total, item){
			return total+item.totalPrice;
		}

		this.removeFromCart = function(item) {
			var removed = false;
			for(var i = 0; i < this.cart.items.length; i++) {
				var currItem = this.cart.items[i];
				if(currItem.id === item.id) {
					if(currItem.itemCount === 1) {
						this.cart.items.splice(i, 1);
						removed = true;
					} else {
						this.cart.items[i].totalPrice -= item.price;
						this.cart.items[i].itemCount -= 1;
						removed = true;
					}
					removed = true;
				}
			}
			return removed;
		};

		this.removeItem = function(pro) {
			var removed = false;
			for(var i = 0; i < this.cart.items.length; i++) {
				if(this.cart.items[i].id === pro.id) {
					this.cart.items.splice(i, 1);
					removed = true;
				}
			}
			return removed;
		};

		this.getCart = function() {
			return this.cart.items.slice();
		};

		this.getCartValue = function() {
			return this.cart.totalPrice;
		};

	});