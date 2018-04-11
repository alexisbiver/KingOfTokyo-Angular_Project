var app = angular.module("GameApp", []);

app.controller("game", function($scope) {
    $scope.players = [{
            "name": "Dragon",
            "emoji": "🐉",
            "life": 10,
            "points": 0,
        },
        {
            "name": "Dinosaur",
            "emoji": "🦖",
            "life": 10,
            "points": 0,
        },
        {
            "name": "Boar",
            "emoji": "🐗",
            "life": 10,
            "points": 0,
        },
        {
            "name": "Gorilla",
            "emoji": "🦍",
            "life": 10,
            "points": 0,
        },
        {
            "name": "Rhinoceros",
            "emoji": "🦏",
            "life": 10,
            "points": 0,
        },
        {
            "name": "Buffalo",
            "emoji": "🐃",
            "life": 10,
            "points": 0,
        },
    ];
    $scope.playerInTokyo = null;
    $scope.currentPlayer = 0;
    $scope.nbPlayers = 6;

    $scope.changePlayerTurn = function() {
        if ($scope.currentPlayer == $scope.nbPlayers - 1) {
            $scope.currentPlayer = 0
        } else {
            $scope.currentPlayer += 1
        }
    }
})

app.controller("left", function($scope) {})

app.controller("board", function($scope) {

    $scope.StringBoard = "🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢";

});
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

    $scope.nbRolls = 3;

    $scope.roll = function() {
        if ($scope.nbRolls > 0) {
            $scope.dices.forEach(d => {
                if (!d.locked) {
                    d.face = $scope.dicesFaces[Math.floor(Math.random() * 6)];
                }
            });
            $scope.nbRolls -= 1;
        }
    };

    $scope.lock = function(d) {
        if (d.locked) {
            d.locked = false
        } else {
            d.locked = true
        }
    }


});