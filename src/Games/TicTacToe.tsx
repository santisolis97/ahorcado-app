import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Button from '../components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';

const initialBoard = ['', '', '', '', '', '', '', '', ''];
type TicTacToeProps = {
    setGame: (game: string | null) => void;
}
const TicTacToe = ({ setGame }: TicTacToeProps) => {
    const [board, setBoard] = useState<string[]>(initialBoard);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const goBack = () => {
        setGame(null)
    }
    const checkWinner = (board: string[]): string | null => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'Tie';
    };

    const minimax = (board: string[], depth: number, isMaximizing: boolean): number => {
        const winner = checkWinner(board);

        if (winner === 'X') return -10 + depth;
        if (winner === 'O') return 10 - depth;
        if (winner === 'Tie') return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const findBestMove = (board: string[]): number => {
        let bestScore = -Infinity;
        let move = -1;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    };

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        const gameResult = checkWinner(newBoard);
        if (gameResult) {
            setWinner(gameResult);
        } else {
            setIsPlayerTurn(false);
        }
    };

    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const cpuMove = () => {
                const bestMove = findBestMove(board);
                const newBoard = [...board];
                newBoard[bestMove] = 'O';
                setBoard(newBoard);

                const gameResult = checkWinner(newBoard);
                if (gameResult) {
                    setWinner(gameResult);
                } else {
                    setIsPlayerTurn(true);
                }
            };

            setTimeout(cpuMove, 500);
        }
    }, [isPlayerTurn, winner, board]);

    useEffect(() => {
        if (winner) {
            if (winner === 'Tie') {
                toast('It\'s a Tie!');
            } else {
                if (winner === 'X') {
                    toast.success(`${winner} Wins!`);
                } else {
                    toast.error(`${winner} Wins!`);
                }
            }
        }
    }, [winner]);

    const resetGame = () => {
        setBoard(initialBoard);
        setIsPlayerTurn(true);
        setWinner(null);
    };

    return (
        <div className="flex flex-col items-center gap-2 justify-center min-h-screen bg-gray-800">
            <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
            <div className="grid grid-cols-3 gap-4">
                {board.map((value, index) => (
                    <div
                        key={index}
                        className={classNames(
                            "w-24 h-24 flex items-center justify-center text-2xl font-bold cursor-pointer",
                            value === 'X' ? "text-blue-500" : "text-red-500",
                            "bg-white border-2 border-gray-300",
                            { "pointer-events-none": !!winner }
                        )}
                        onClick={() => handleClick(index)}
                    >
                        {value}
                    </div>
                ))}
            </div>
            {winner && (
                <div className="mt-4 text-2xl">
                    <Toaster position='top-center' />
                    {winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`}
                </div>
            )}
            <div className='flex flex-col gap-2'>
                <Button
                    variant='primary'
                    onClick={resetGame}
                >
                    Reset Game
                </Button>
                <Button
                    variant='danger'
                    onClick={goBack}
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default TicTacToe;
