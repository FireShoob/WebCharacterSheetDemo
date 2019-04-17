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
    Suit[Suit["Spades"] = 0] = "Spades";
    Suit[Suit["Clubs"] = 1] = "Clubs";
    Suit[Suit["Diamonds"] = 2] = "Diamonds";
    Suit[Suit["Hearts"] = 3] = "Hearts";
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
var Card = /** @class */ (function () {
    function Card(suit, rank, joker, color) {
        if (joker === void 0) { joker = false; }
        if (color === void 0) { color = Color.Default; }
        this.joker = joker;
        this.suit = suit;
        this.rank = rank;
        if (color == Color.Default) {
            this.color = (this.suit == (Suit.Hearts || Suit.Diamonds)) ? (Color.Red) : (Color.Black);
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
    return Card;
}());
var DeckOfCards = /** @class */ (function () {
    function DeckOfCards() {
        var _this = this;
        //	default order
        this.suits = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
        this.ranks = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];
        this.deck = [];
        this.suits.forEach(function (suit) {
            return _this.ranks.forEach(function (rank) {
                return _this.deck.push(new Card(suit, rank));
            });
        });
        this.deck.push(new Card(null, null, true, Color.Black));
        this.deck.push(new Card(null, null, true, Color.Red));
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
    DeckOfCards.prototype.drawCard = function () {
        return this.deck.shift();
    };
    DeckOfCards.prototype.toString = function () {
        return this.deck.join("\n");
    };
    return DeckOfCards;
}());
//# sourceMappingURL=app.js.map