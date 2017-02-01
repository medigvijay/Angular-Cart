angular.module("masalaapp")
.directive("summaryPane", summaryPane);


function summaryPane() {
	var pane = {
		restrict: "E",
		scope: {
			itemInCart: "&",
			cart: "@",
			removeAllFromCart: "&"
		},
		templateUrl: "summary/summary.tmlp.html",
		link: function(scope, element, attrs) {
		}
	}
	return pane;
}