function displayTotalPerPerson(person: string, total: number) {
    let deck: DeckOfCards = new DeckOfCards();
    deck.shuffle();
    document.getElementById("totalMessage").innerText = deck.toString();
}

enum Color {Default, Black, Red}
enum Suit {Spades, Clubs, Diamonds, Hearts}
enum Rank {Ace = 1, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King }

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
            this.color = (this.suit == (Suit.Hearts||Suit.Diamonds))?(Color.Red):(Color.Black);
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

}

class DeckOfCards{
    //	default order
    suits:Suit[] = [Suit.Spades, Suit.Clubs, Suit.Diamonds, Suit.Hearts];
    ranks:Rank[] = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, Rank.Jack, Rank.Queen, Rank.King];

    deck:Card[] = [];
    constructor()
    {
        this.suits.forEach((suit) =>
            this.ranks.forEach((rank) =>
                this.deck.push(new Card(suit, rank))));

        this.deck.push(new Card(null,null,true, Color.Black));
        this.deck.push(new Card(null,null,true, Color.Red));
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

    drawCard(): Card
    {
        return this.deck.shift();
    }

    toString(): string
    {
        return this.deck.join("\n")
    }

}