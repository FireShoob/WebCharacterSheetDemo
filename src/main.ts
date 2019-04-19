import {DeckCanvas} from "./scripts/deck-canvas";

function main()
{
    const canvas = <HTMLCanvasElement>document.getElementById('deck-canvas');
    new DeckCanvas(canvas);
}

main();