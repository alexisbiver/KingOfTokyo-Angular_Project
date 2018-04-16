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
    $scope.victory = function() {
        alert("yeah " + $scope.winner.name + " is the king of tokyo !!!")
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
            //si on est plus de 4 on remplis l'autre emplacement de tokyo
            else if ($scope.playerInTokyo1 != null && $scope.playerInTokyo2 == null && $scope.nbPlayers > 4) {
                $scope.playerInTokyo2 = $scope.currentPlayer
                $scope.updateBoard();
                points += 1;
            }
            //Si on est a Tokyo
            else if ($scope.currentPlayer == $scope.playerInTokyo1 || $scope.currentPlayer == $scope.playerInTokyo2) {
                $scope.hitNotTokyo(counters[3]);
            }
            //Si on est a Tokyo
            else {
                $scope.hitTokyo(counters[3]);
            }
        }
        //Résolution des têtes de mort
        life -= counters[4]
            //Résolution des coeurs
        life += counters[5]

        $scope.affectPlayer($scope.currentPlayer, points, life);
        console.log($scope)
    }

    $scope.affectPlayer = function(player, points, life) {
        //update life and points, handle death and victory
        $scope.players[player].life += life;
        if ($scope.players[player].life > 10) {
            $scope.players[player].life = 10;
        }
        if ($scope.players[player].life <= 0) {
            for (var i = 0; i < $scope.nbPlayers; i++) {
                $scope.players[i].life = 0;
                $scope.players.splice(i, 1); //Supprime 1 élément à partir de l'indice i
                $scope.nbPlayers -= 1;
                if (i == $scope.playerInTokyo1) {
                    $scope.playerInTokyo1 == null;
                } else if (i == $scope.playerInTokyo2) {
                    $scope.playerInTokyo2 == null;
                }
                if ($scope.players.length == 1) {
                    $scope.winner = $scope.players[0];
                    $scope.victory();
                }
            }
        }

        $scope.players[player].points += points;
        if ($scope.players[player].points >= 20) {
            $scope.winner = $scope.players[player]
            $scope.victory();
        }
    }

    $scope.hitNotTokyo = function(damage) {
        //TODO : hit the players not in tokyo
        for (var i = 0; i < $scope.nbPlayers; i++) {
            if (i != $scope.playerInTokyo1 || i != $scope.playerInTokyo2) {
                $scope.affectPlayer(i, 0, -damage)
            }
        }
    }

    $scope.hitTokyo = function(damage) {
        //TODO : hit the players in tokyo
        if ($scope.playerInTokyo1 != null) {
            $scope.affectPlayer($scope.playerInTokyo1, 0, -damage)
            $scope.goOut($scope.playerInTokyo1);
        }
        if ($scope.playerInTokyo2 != null) {
            $scope.affectPlayer($scope.playerInTokyo2, 0, -damage)
            $scope.goOut($scope.playerInTokyo2)
        }
    }

    $scope.gainPointsFromTokyo = function() {
        //TODO : make a monster win points after a turn in tokyo
    }
    $scope.updateBoard = function() {
        if ($scope.playerInTokyo1 != null) {
            console.log($scope.players[$scope.playerInTokyo1].emoji)
            $scope.StringBoard = $scope.players[$scope.playerInTokyo1].emoji
        }
        if ($scope.playerInTokyo2 != null) {
            console.log($scope.players[$scope.playerInTokyo2].emoji)
            $scope.StringBoard = $scope.players[$scope.playerInTokyo2].emoji
        }
    }

    $scope.goOut = function(playerInt) {
        $scope.modalTo = playerInt;
        $('#ModalCenter').modal('show');
        console.log("SORS")
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