function displayTotalPerPerson(person: string, total: number) {
    let deck: DeckOfCards = new DeckOfCards();
    deck.shuffle();
    document.getElementById("totalMessage").innerText = deck.toString();
}

enum Color {Default, Black, Red}
enum Suit {Spades = 4, Clubs = 1, Diamonds = 2, Hearts = 3, Joker = 5}
enum Rank {Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }

enum DiceType {d4 = 4, d6 = 6, d8 = 8, d10 = 10, d12 = 12, d20 = 20}
enum Trait {Deftness, Nimbleness, Quickness, Strength, Vigor, Cognition, Knowledge, Mien, Smarts , Grit, Pace, Size, Wind}
enum Aptitude {}

class Card
{
    joker: boolean;
    color: Color;
    suit: Suit;
    rank: Rank;

    constructor(suit: Suit, rank: Rank, joker: boolean = false, color: Color = Color.Default)
    {
        this.joker = joker;
        this.suit = suit;
        this.rank = rank;
        if(color == Color.Default)
        {
            this.color = (this.suit == (Suit.Hearts|Suit.Diamonds))?(Color.Red):(Color.Black);
        }
        else
        {
            this.color = color;
        }
    }

    toString(): string
    {
        if(this.joker)
        {
            return Color[this.color] + " Joker";
        }
        return Rank[this.rank] + " of " + Suit[this.suit];
    }

    getDiceLevel(): number
    {
        return this.suit.valueOf()
        //Important Note about modeling Joker as its own Suit, In Deadlands Classic if you draw a joker
        // And then a second when determining the level of your d12, you are awarded the rare 5d12
    }

    getDiceType(): DiceType
    {
        if(this.joker || (this.rank == Rank.Ace))
        {
            return DiceType.d12;
        }
        else if(this.rank == Rank.Two)
        {
            return DiceType.d4;
        }
        else if (this.rank == (Rank.Three|Rank.Four|Rank.Five|Rank.Six|Rank.Seven|Rank.Eight))
        {
            return DiceType.d6;
        }
        else if (this.rank == (Rank.Nine|Rank.Ten|Rank.Jack))
        {
            return DiceType.d8;
        }
        else if (this.rank == (Rank.Queen|Rank.King))
        {
            return DiceType.d10;
        }
        return DiceType.d20; //Default Return Value as a pseudo exception
    }

}

class DeckOfCards{
    //	default order
    suits:Suit[] = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
    ranks:Rank[] = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];

    deck:Card[] = [];
    faceUpCards:Card[] = [];
    constructor()
    {
        this.suits.forEach((suit) =>
            this.ranks.forEach((rank) =>
                this.deck.push(new Card(suit, rank))));

        this.deck.push(new Card(Suit.Joker,null,true, Color.Black));
        this.deck.push(new Card(Suit.Joker,null,true, Color.Red));
    }

    //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(): void
    {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let swap = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = swap;
        }
    }

    reshuffle(): void
    {
        this.faceUpCards.forEach((card) =>
            this.deck.push(card));
        this.faceUpCards = [];
        this.shuffle();
    }

    drawCard(): Card
    {
        var card = this.deck.shift();
        this.faceUpCards.push(card);
        return card;
    }

    drawAndGetDiceValue(): DiceValue
    {
        var card = this.drawCard();
        if(!card.joker)
        {
            return new DiceValue(card.getDiceLevel(), card.getDiceType())
        }
        else
        {
            var secondCard = this.drawCard();
            return new DiceValue(secondCard.getDiceLevel(), card.getDiceType())
        }
    }

    toString(): string
    {
        return this.deck.join("\n")
    }

}

class DiceValue
{
    diceType:DiceType;
    diceLevel:number;

    constructor(diceLevel:number, diceType:DiceType)
    {
        this.diceLevel = diceLevel;
        this.diceType = diceType;
    }

    toString(): string
    {
        return this.diceLevel.toString() + DiceType[this.diceType];
    }

}

class TraitValue
{
    isPrimary:boolean;
    traitName:Trait;
    primaryValue:DiceValue;
    secondaryValue:number;
}

class PlayerCharacter
{

}