const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [gameState, setGameState] = React.useState([]);
    let status = `Winner is ${checkForWinner(gameState)}`;
  
    console.log(`We have a winner ${status}`);
  
    const takeTurn = (id) => {
      setGameState([...gameState, { id: id, player: player }]);
      setPlayer((player + 1) % 2); // get next player
      return player;
    };
  
    function renderSquare(i) {
      return <Square takeTurn={takeTurn} id={i} key={i}></Square>;
    }
  
    return (
      <div className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div id="info">
          <h1 id="turn">Next Play: Player {player === 0 ? 'O' : 'X'}</h1>
        </div>
      </div>
    );
  };
  
  const Square = ({ takeTurn, id }) => {
    const mark = ['O', 'X', '+'];
    const [filled, setFilled] = React.useState(false);
    const [tik, setTik] = React.useState(2);
  
    return (
      <button
        className={tik === 0 ? 'white' : tik === 1 ? 'red' : ''}
        onClick={() => {
          setTik(takeTurn(id));
          setFilled(true);
          console.log(`Square: ${id} filled by player : ${tik}`);
        }}
      >
        <h1>{mark[tik]}</h1>
      </button>
    );
  };
  
  const Game = () => {
    return (
      <div className="game">
        <Board></Board>
      </div>
    );
  };
  
  // ... (rest of the code remains the same)
  
  
  // Checking for Winner takes a bit of work
  // Use JavaScript Sets to check players choices
  // against winning combinations
  // Online there is more compact version but Dr. Williams prefers this one
  
  const win = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  const checkPlayerTurn = (gameState) => {
    return gameState.player;
  };
  
  const checkForWinner = (gameState) => {
    // get array of box id's
    // can't be a winner in less than 5 turns
    if (gameState.length < 5) return 'No Winner Yet';
    let p0 = gameState.filter((item) => {
      if (item.player == 0) return item;
    });
    p0 = p0.map((item) => item.id);
    let px = gameState.filter((item) => {
      if (item.player == 1) return item;
    });
    px = px.map((item) => item.id);
    if (p0 != null && px != null) {
      var win0 = win.filter((item) => {
        return isSuperset(new Set(p0), new Set(item));
      });
      var winX = win.filter((item) => {
        return isSuperset(new Set(px), new Set(item));
      });
    }
    if (win0.length > 0) return 'Player O ';
    else if (winX.length > 0) return 'Player X ';
    return 'No Winner Yet';
  };
  // check if subset is in the set
  function isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById('root'));

  

  