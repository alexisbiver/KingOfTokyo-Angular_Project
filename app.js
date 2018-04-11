var app = angular.module("GameApp", []);

monsterEmotes = ["🐦", "🕷", "🦖", "🐙", "🦍", "🐉", "🦈"]

app.controller("bottom", function($scope) {
    $scope.dicesFaces = ["1️⃣", "2️⃣", "3️⃣", "👊", "💵", "❤️"];

    $scope.dices = [
        { "face": "1️⃣", "locked": false },
        { "face": "2️⃣", "locked": false },
        { "face": "3️⃣", "locked": false },
        { "face": "👊", "locked": false },
        { "face": "💵", "locked": false },
        { "face": "❤️", "locked": false }
    ];

    $scope.nbRolls = 0;

    $scope.roll = function() {
        if ($scope.nbRolls < 3) {

        }
        for (var i = 0; i < $scope.articles.length; i++) {
            total += $scope.articles[i].price * $scope.articles[i].quantity;
        }
        return total;
    };

    function calculateDiscount(newValue, oldValue, scope) {
        $scope.discount = (newValue > 100) ? newValue * 0.10 : 0;
    };

    $scope.finalTotal = function() {
        return $scope.total() - $scope.discount;
    };
});