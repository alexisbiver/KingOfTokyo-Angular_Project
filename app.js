var app = angular.module("GameApp", []);

app.controller("game", function($scope) {
    $scope.players = [{
            "name": "Dragon",
            "emoji": "🐉",
            "life": 10,
            "points": 0,
            "playing": true,
        },
        {
            "name": "Dinosaur",
            "emoji": "🦖",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Boar",
            "emoji": "🐗",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Gorilla",
            "emoji": "🦍",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Rhinoceros",
            "emoji": "🦏",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Buffalo",
            "emoji": "🐃",
            "life": 10,
            "points": 0,
            "playing": false,
        },
    ];
    $scope.playerInTokyo = null;
    $scope.currentPlayer = 0;
    $scope.nbPlayers = 6;

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
        if ($scope.nbRolls !=3) {
            if (d.locked) {
                d.locked = false
            } else {
                d.locked = true
            }
        }
    }

    $scope.changePlayerTurn = function() {
        $scope.players[$scope.currentPlayer].playing = false
        console.log($scope.players[$scope.currentPlayer].name)
        if ($scope.currentPlayer == $scope.nbPlayers - 1) {
            $scope.currentPlayer = 0
        } else {
            $scope.currentPlayer += 1
        }
        $scope.players[$scope.currentPlayer].playing = true
        $scope.dices = [
            { "face": "1️⃣", "locked": false },
            { "face": "2️⃣", "locked": false },
            { "face": "3️⃣", "locked": false },
            { "face": "👊", "locked": false },
            { "face": "💵", "locked": false },
            { "face": "❤️", "locked": false }
        ];
    }


});

//Faudrait faire en sorte que le bouton roll au bout de 3 fois devienne "calculer" ou un truc comme ça, dès que tu cliques dessus ça calcule tes points automatiquement (pour ça faut faire une fonction je peux m'en occuper) et quand tu cliques sur end turn tu passes au joueur suivant qu'en penses tu ?