import Button from "../Button/Button";

type Game = {
    name: string;
}
type GameSelectorProps = {
    games: Game[];
    setGame: (gameName: string) => void;
}

const GameSelector = ({ games, setGame }: GameSelectorProps) => {

    return (
        <div className="flex-col flex gap-2">
            <div className="text-2xl">
                Select your Game
            </div>
            {games.map((game) => {
                const setEachGame = () => {
                    setGame(game.name)
                }
                return (<Button className="capitalize" key={game.name} onClick={setEachGame} >
                    {game.name}
                </Button>)
            }
            )}
        </div >
    );
};

export default GameSelector;
