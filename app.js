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
    $scope.playerInTokyo1 = null;
    $scope.playerInTokyo2 = null;
    $scope.winner = null;

    $scope.currentPlayer = 0;
    $scope.nbPlayers = 6;

    $scope.StringBoard = "🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢 🏢";

    $scope.updateBoard = function() {
        //TODO : update String Board from game data
    }

})


app.controller("left", function($scope) {})

app.controller("board", function($scope) {

});
app.controller("bottom", function($scope) {
    $scope.dicesFaces = ["1️⃣", "2️⃣", "3️⃣", "👊", "💀", "❤️"];

    $scope.dices = [
        { "face": "1️⃣", "locked": false },
        { "face": "2️⃣", "locked": false },
        { "face": "3️⃣", "locked": false },
        { "face": "👊", "locked": false },
        { "face": "💀", "locked": false },
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
        if ($scope.nbRolls != 3) {
            if (d.locked) {
                d.locked = false
            } else {
                d.locked = true
            }
        }
    }

    $scope.changePlayerTurn = function() {
        $scope.players[$scope.currentPlayer].playing = false
        $scope.resolveDices()
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
            { "face": "💀", "locked": false },
            { "face": "❤️", "locked": false }
        ];
        $scope.nbRolls = 3;
    }

    $scope.resolveDices = function() {
        counters = []
        $scope.dicesFaces.forEach(d => {
            counters.push(countFaces(d, $scope.dices))
        })
        points = 0
        life = 0
            //Ajout des points avec les dés 1 2 et 3
            //Dés 1
        if (counters[0] >= 3) {
            if (counters[0] == 4) {
                points += 2
            } else if (counters[0] == 5) {
                points += 3
            } else if (counters[0] == 6) {
                points += 4
            } else {
                points += 1
            }
        }
        //Dés 2 
        if (counters[1] >= 3) {
            if (counters[1] == 4) {
                points += 3
            } else if (counters[1] == 5) {
                points += 4
            } else if (counters[1] == 6) {
                points += 5
            } else {
                points += 2
            }
        }
        //Dés 3
        if (counters[2] >= 3) {
            if (counters[2] == 4) {
                points += 4
            } else if (counters[2] == 5) {
                points += 5
            } else if (counters[2] == 6) {
                points += 6
            } else {
                points += 3
            }
        }
        //Résolution des coups de poing
        if (counters[3] != 0) {
            //si il n'y a personne a tokyo on rentre
            if ($scope.playerInTokyo1 == null) {
                $scope.playerInTokyo1 = $scope.currentPlayer
                $scope.updateBoard();
                points += 1;

            }
            //si on est plus de 4 on remplie l'autre emplacement de tokyo
            if ($scope.playerInTokyo2 == null && $scope.nbPlayers > 4) {
                $scope.playerInTokyo2 = $scope.currentPlayer
                $scope.updateBoard();
                points += 1;
            }
            //Si on est a Tokyo
            if ($scope.currentPlayer == $scope.playerInTokyo1 || $scope.currentPlayer == $scope.playerInTokyo2) {
                $scope.hitNotTokyo(counters[3]);
            }
            //Si on est a Tokyo
            if ($scope.currentPlayer == $scope.playerInTokyo1 || $scope.currentPlayer == $scope.playerInTokyo2) {
                $scope.hitTokyo(counters[3]);
            }
        }
        //Résolution des têtes de mort
        life -= counters[4]
            //Résolution des coeurs
        life += counters[5]

        $scope.affectPlayer(points, life);
    }

    $scope.affectPlayer = function(points, life) {
        //update life and points, handle death and victory
        $scope.players[$scope.currentPlayer].life += life;
        if ($scope.players[$scope.currentPlayer].life > 10) {
            $scope.players[$scope.currentPlayer].life = 10;
        }
        if ($scope.players[$scope.currentPlayer].life <= 0) {
            $scope.players[$scope.currentPlayer].life = 0;
            $scope.players.remove($scope.currentPlayer);
        }

        $scope.players[$scope.currentPlayer].points += points;
        if ($scope.players[$scope.currentPlayer].points >= 20) {
            $scope.winner = $scope.currentPlayer
        }
    }

    $scope.hitNotTokyo = function(damage) {
        //TODO : hit the players not in tokyo
    }
    $scope.hitTokyo = function(damage) {
        //TODO : hit the players in tokyo
    }
    $scope.gainPointsFromTokyo = function() {
        //TODO : make a monster win points after a trun in tokyo
    }


});

countFaces = function(string, dices) {
    count = 0;
    dices.forEach(d => {
        if (d.face === string) {
            count += 1;
        }
    });
    return count;
}

//Faudrait faire en sorte que le bouton roll au bout de 3 fois devienne "calculer" ou un truc comme ça, dès que tu cliques dessus ça calcule tes points automatiquement (pour ça faut faire une fonction je peux m'en occuper) et quand tu cliques sur end turn tu passes au joueur suivant qu'en penses tu ?
//Vu

//lol