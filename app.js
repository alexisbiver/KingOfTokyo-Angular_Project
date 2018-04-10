var app = angular.module("GameApp", []);

app.controller("left", function($scope) {
    $scope.players = [
        {
          "name" : "Dragon",
          "emoji": "🐉",
          "life": 10,
          "points": 0,
        },
        {
          "name" : "Dinosaur",
          "emoji": "🦖",
          "life": 10,
          "points": 0,
        },
        {
          "name" : "Boar",
          "emoji": "🐗",
          "life": 10,
          "points": 0,
        },
        {
          "name" : "Gorilla",
          "emoji": "🦍",
          "life": 10,
          "points": 0,
        },
        {
          "name" : "Rhinoceros",
          "emoji": "🦏",
          "life": 10,
          "points": 0,
        },
        {
          "name" : "Buffalo",
          "emoji": "🐃",
          "life": 10,
          "points": 0,
        },

    ];
}

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