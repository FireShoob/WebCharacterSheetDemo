function displayTotalPerPerson(person, total) {
    var deck = new DeckOfCards();
    deck.shuffle();
    document.getElementById("totalMessage").innerText = deck.toString();
}
var Color;
(function (Color) {
    Color[Color["Default"] = 0] = "Default";
    Color[Color["Black"] = 1] = "Black";
    Color[Color["Red"] = 2] = "Red";
})(Color || (Color = {}));
var Suit;
(function (Suit) {
    Suit[Suit["Spades"] = 4] = "Spades";
    Suit[Suit["Clubs"] = 1] = "Clubs";
    Suit[Suit["Diamonds"] = 2] = "Diamonds";
    Suit[Suit["Hearts"] = 3] = "Hearts";
    Suit[Suit["Joker"] = 5] = "Joker";
})(Suit || (Suit = {}));
var Rank;
(function (Rank) {
    Rank[Rank["Ace"] = 1] = "Ace";
    Rank[Rank["Two"] = 2] = "Two";
    Rank[Rank["Three"] = 3] = "Three";
    Rank[Rank["Four"] = 4] = "Four";
    Rank[Rank["Five"] = 5] = "Five";
    Rank[Rank["Six"] = 6] = "Six";
    Rank[Rank["Seven"] = 7] = "Seven";
    Rank[Rank["Eight"] = 8] = "Eight";
    Rank[Rank["Nine"] = 9] = "Nine";
    Rank[Rank["Ten"] = 10] = "Ten";
    Rank[Rank["Jack"] = 11] = "Jack";
    Rank[Rank["Queen"] = 12] = "Queen";
    Rank[Rank["King"] = 13] = "King";
})(Rank || (Rank = {}));
var DiceType;
(function (DiceType) {
    DiceType[DiceType["d4"] = 4] = "d4";
    DiceType[DiceType["d6"] = 6] = "d6";
    DiceType[DiceType["d8"] = 8] = "d8";
    DiceType[DiceType["d10"] = 10] = "d10";
    DiceType[DiceType["d12"] = 12] = "d12";
    DiceType[DiceType["d20"] = 20] = "d20";
})(DiceType || (DiceType = {}));
var Trait;
(function (Trait) {
    Trait[Trait["Deftness"] = 0] = "Deftness";
    Trait[Trait["Nimbleness"] = 1] = "Nimbleness";
    Trait[Trait["Quickness"] = 2] = "Quickness";
    Trait[Trait["Strength"] = 3] = "Strength";
    Trait[Trait["Vigor"] = 4] = "Vigor";
    Trait[Trait["Cognition"] = 5] = "Cognition";
    Trait[Trait["Knowledge"] = 6] = "Knowledge";
    Trait[Trait["Mien"] = 7] = "Mien";
    Trait[Trait["Smarts"] = 8] = "Smarts";
    Trait[Trait["Grit"] = 9] = "Grit";
    Trait[Trait["Pace"] = 10] = "Pace";
    Trait[Trait["Size"] = 11] = "Size";
    Trait[Trait["Wind"] = 12] = "Wind";
})(Trait || (Trait = {}));
var Aptitude;
(function (Aptitude) {
})(Aptitude || (Aptitude = {}));
var Card = /** @class */ (function () {
    function Card(suit, rank, joker, color) {
        if (joker === void 0) { joker = false; }
        if (color === void 0) { color = Color.Default; }
        this.joker = joker;
        this.suit = suit;
        this.rank = rank;
        if (color == Color.Default) {
            this.color = (this.suit == (Suit.Hearts | Suit.Diamonds)) ? (Color.Red) : (Color.Black);
        }
        else {
            this.color = color;
        }
    }
    Card.prototype.toString = function () {
        if (this.joker) {
            return Color[this.color] + " Joker";
        }
        return Rank[this.rank] + " of " + Suit[this.suit];
    };
    Card.prototype.getDiceLevel = function () {
        return this.suit.valueOf();
        //Important Note about modeling Joker as its own Suit, In Deadlands Classic if you draw a joker
        // And then a second when determining the level of your d12, you are awarded the rare 5d12
    };
    Card.prototype.getDiceType = function () {
        if (this.joker || (this.rank == Rank.Ace)) {
            return DiceType.d12;
        }
        else if (this.rank == Rank.Two) {
            return DiceType.d4;
        }
        else if (this.rank == (Rank.Three | Rank.Four | Rank.Five | Rank.Six | Rank.Seven | Rank.Eight)) {
            return DiceType.d6;
        }
        else if (this.rank == (Rank.Nine | Rank.Ten | Rank.Jack)) {
            return DiceType.d8;
        }
        else if (this.rank == (Rank.Queen | Rank.King)) {
            return DiceType.d10;
        }
        return DiceType.d20; //Default Return Value as a pseudo exception
    };
    return Card;
}());
var DeckOfCards = /** @class */ (function () {
    function DeckOfCards() {
        var _this = this;
        //	default order
        this.suits = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
        this.ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
        this.deck = [];
        this.faceUpCards = [];
        this.suits.forEach(function (suit) {
            return _this.ranks.forEach(function (rank) {
                return _this.deck.push(new Card(suit, rank));
            });
        });
        this.deck.push(new Card(Suit.Joker, null, true, Color.Black));
        this.deck.push(new Card(Suit.Joker, null, true, Color.Red));
    }
    //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    DeckOfCards.prototype.shuffle = function () {
        for (var i = this.deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var swap = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = swap;
        }
    };
    DeckOfCards.prototype.reshuffle = function () {
        var _this = this;
        this.faceUpCards.forEach(function (card) {
            return _this.deck.push(card);
        });
        this.faceUpCards = [];
        this.shuffle();
    };
    DeckOfCards.prototype.drawCard = function () {
        var card = this.deck.shift();
        this.faceUpCards.push(card);
        return card;
    };
    DeckOfCards.prototype.drawAndGetDiceValue = function () {
        var card = this.drawCard();
        if (!card.joker) {
            return new DiceValue(card.getDiceLevel(), card.getDiceType());
        }
        else {
            var secondCard = this.drawCard();
            return new DiceValue(secondCard.getDiceLevel(), card.getDiceType());
        }
    };
    DeckOfCards.prototype.toString = function () {
        return this.deck.join("\n");
    };
    return DeckOfCards;
}());
var DiceValue = /** @class */ (function () {
    function DiceValue(diceLevel, diceType) {
        this.diceLevel = diceLevel;
        this.diceType = diceType;
    }
    DiceValue.prototype.toString = function () {
        return this.diceLevel.toString() + DiceType[this.diceType];
    };
    return DiceValue;
}());
var TraitValue = /** @class */ (function () {
    function TraitValue() {
    }
    return TraitValue;
}());
var PlayerCharacter = /** @class */ (function () {
    function PlayerCharacter() {
    }
    return PlayerCharacter;
}());
//# sourceMappingURL=app.js.map