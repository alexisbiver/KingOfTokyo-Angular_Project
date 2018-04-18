var app = angular.module("GameApp", []);

app.controller("game", function($scope) {
    $scope.players = [{
            "name": "Flame On You",
            "emoji": "🐉",
            "life": 10,
            "points": 0,
            "playing": true,
        },
        {
            "name": "Mister T",
            "emoji": "🦖",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Poulpi",
            "emoji": "🦑",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Donkey Boss",
            "emoji": "🦍",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Impalor",
            "emoji": "🦏",
            "life": 10,
            "points": 0,
            "playing": false,
        },
        {
            "name": "Cow Dude",
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
    $scope.previousPlayer = 5;
    $scope.nbPlayers = 6;

    $scope.emojisNotInTokyo = []
    $scope.emojiTokyo1 = "💥";
    $scope.emojiTokyo2 = "💥";

    $scope.victory = function() {
        $('#VictoryModal').modal('show');
    }
})


app.controller("left", function($scope) {})

app.controller("board", function($scope) {});

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
    $scope.turnchanged = false;

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
        if ($scope.nbRolls != 3) {
            $scope.resolveDices()
            $scope.dices = [
                { "face": "1️⃣", "locked": false },
                { "face": "2️⃣", "locked": false },
                { "face": "3️⃣", "locked": false },
                { "face": "👊", "locked": false },
                { "face": "💀", "locked": false },
                { "face": "❤️", "locked": false }
            ];
            $scope.nbRolls = 3;
            $scope.gainPointsFromTokyo();
            $scope.emojiPlayerNotinTokyo();
            $scope.turnchanged = false;
        }
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
        //Résolution des têtes de mort
        life -= counters[4]
            //Résolution des coeurs
        if ($scope.currentPlayer != $scope.playerInTokyo1 || $scope.currentPlayer != $scope.playerInTokyo2) {
            life += counters[5]
        }

        //Résolution des coups de poing
        if (counters[3] != 0) {
            //si il n'y a personne a tokyo on rentre
            if ($scope.playerInTokyo1 == null) {
                $scope.playerInTokyo1 = $scope.currentPlayer
                points += 1;

            }
            //si on est plus de 4 on remplis l'autre emplacement de tokyo
            else if ($scope.playerInTokyo1 != null && $scope.playerInTokyo2 == null && $scope.nbPlayers > 4) {
                $scope.playerInTokyo2 = $scope.currentPlayer
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
        $scope.affectPlayer($scope.currentPlayer, points, life);
    }

    $scope.affectPlayer = function(player, points, life) {
        //update life and points, handle death and victory
        $scope.players[player].life += life;
        if ($scope.players[player].life > 10) {
            $scope.players[player].life = 10;
        }
        if ($scope.players[player].life <= 0) {
            $scope.players[player].life = 0;
            $scope.players.splice(player, 1); //Supprime 1 élément à partir de l'indice i
            $scope.nbPlayers -= 1;
            if (player == $scope.playerInTokyo1) {
                $scope.$parent.playerInTokyo1 = null;
                $scope.playerInTokyo1 = null;

            }
            if (player == $scope.playerInTokyo2) {
                $scope.$parent.playerInTokyo2 = null;
                $scope.playerInTokyo2 = null;
            }
            if ($scope.players.length == 1) {
                $scope.$parent.winner = $scope.players[0];
                $scope.victory();
            }
            //on a pas changé de tour et quelqu'un meurt
            if ($scope.turnchanged == false) {
                //C'était le joueur courant
                if ($scope.currentPlayer >= $scope.nbPlayers) {
                    $scope.currentPlayer = 0
                }
                if ($scope.previousPlayer >= $scope.nbPlayers) {
                    $scope.previousPlayer = $scope.nbPlayers - 1
                }
                $scope.turnchanged = true;
            }
            //on a déjà changé de tour et quelqu'un meurt
            else {
                $scope.previousPlayer -= 1;
                $scope.currentPlayer -= 1;
                if ($scope.currentPlayer <= 0) {
                    $scope.currentPlayer = 0
                }
                if ($scope.previousPlayer <= 0) {
                    $scope.previousPlayer = 0
                }
                $scope.players[$scope.previousPlayer].playing = false
                $scope.players[$scope.currentPlayer].playing = true
            }
        } else {
            $scope.players[player].points += points;
            if ($scope.players[player].points >= 20) {
                $scope.$parent.winner = $scope.players[player]
                $scope.victory();
            }
            if ($scope.turnchanged == false) {
                $scope.previousPlayer = $scope.currentPlayer;
                $scope.currentPlayer = $scope.nextPlayer();
                $scope.players[$scope.previousPlayer].playing = false
                $scope.players[$scope.currentPlayer].playing = true
                $scope.turnchanged = true;
            }
        }
    }

    $scope.hitNotTokyo = function(damage) {
        //TODO : hit the players not in tokyo
        for (var i = 0; i < $scope.nbPlayers; i++) {
            if (i !== $scope.playerInTokyo1 && i !== $scope.playerInTokyo2) {
                $scope.affectPlayer(i, 0, -damage)
            }
        }
    }

    $scope.hitTokyo = function(damage) {
        //TODO : hit the players in tokyo
        if ($scope.playerInTokyo2 != null && $scope.playerInTokyo1 != null) {
            $scope.affectPlayer($scope.playerInTokyo2, 0, -damage)
            $scope.affectPlayer($scope.playerInTokyo1, 0, -damage)
        } else if ($scope.playerInTokyo1 != null) {
            $scope.affectPlayer($scope.playerInTokyo1, 0, -damage)
        } else if ($scope.playerInTokyo2 != null) {
            $scope.affectPlayer($scope.playerInTokyo2, 0, -damage)
        }
        if ($scope.playerInTokyo2 != null && $scope.playerInTokyo1 != null) {
            $scope.goOut($scope.playerInTokyo1, $scope.playerInTokyo2)
        } else if ($scope.playerInTokyo1 != null) {
            $scope.goOut($scope.playerInTokyo1);
        } else if ($scope.playerInTokyo2 != null) {
            $scope.goOut($scope.playerInTokyo2)
        }
    }

    $scope.gainPointsFromTokyo = function() {
        //TODO : make a monster win points after a turn in tokyo
        if ($scope.playerInTokyo1 == $scope.currentPlayer || $scope.playerInTokyo2 == $scope.currentPlayer) {
            $scope.affectPlayer($scope.currentPlayer, 2, 0)
        }
    }

    $scope.goOut = function(playerInt1, playerInt2 = null) {
        $scope.modal1 = playerInt1;
        $('#ModalCenter').modal('show');
        if (playerInt2 != null) {
            $scope.modal2 = playerInt2;
            $('#SecondModal').modal('show');
        }
    }

    $scope.leaveTokyo = function(playerInt) {
        if ($scope.playerInTokyo1 == playerInt) {
            if ($scope.playerInTokyo2 != $scope.previousPlayer) {
                $scope.playerInTokyo1 = $scope.previousPlayer;
            } else {
                $scope.playerInTokyo1 = null;
            }
            $('#ModalCenter').modal('hide');
        } else if ($scope.playerInTokyo2 == playerInt) {
            if ($scope.playerInTokyo1 != $scope.previousPlayer) {
                $scope.playerInTokyo2 = $scope.previousPlayer;
            } else {
                $scope.playerInTokyo2 = null;
            }
            $('#SecondModal').modal('hide');
        }
        $scope.emojiPlayerNotinTokyo()
    }

    $scope.emojiPlayerNotinTokyo = function() {
        $scope.$parent.emojisNotInTokyo = []
        $scope.$parent.emojiTokyo1 = "💥";
        $scope.$parent.emojiTokyo2 = "💥";
        for (var i = 0; i < $scope.nbPlayers; i++) {
            if (i != $scope.playerInTokyo1 && i != $scope.playerInTokyo2) {
                $scope.$parent.emojisNotInTokyo.push($scope.players[i].emoji)
            }
        }
        if ($scope.playerInTokyo1 != null) {
            $scope.$parent.emojiTokyo1 = $scope.players[$scope.playerInTokyo1].emoji;
        }

        if ($scope.playerInTokyo2 != null) {
            $scope.$parent.emojiTokyo2 = $scope.players[$scope.playerInTokyo2].emoji;
        }
    }

    $scope.nextPlayer = function() {
        var next = null
        for (var i = 0; i < $scope.nbPlayers; i++) {
            if ($scope.players[i].playing) {
                if (i >= $scope.nbPlayers - 1) {
                    next = 0;
                } else {
                    next = i + 1;
                }
            }
        }
        return next;
    }

    $scope.previousP = function() {
        var previous = null
        for (var i = 0; i < $scope.nbPlayers; i++) {
            if ($scope.players[i].playing) {
                if (i <= 0) {
                    previous = $scope.nbPlayers;
                } else {
                    previous = i - 1;
                }
            }
        }
        return previous;
    }
    $scope.emojiPlayerNotinTokyo()
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