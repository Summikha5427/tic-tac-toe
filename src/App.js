// Import necessary libraries and functions
import React, { useEffect } from "react";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import back from "./Images/back.jpg"


// Action Types
const SET_MARKS = "set_Marks";
const SET_PLAYER = "set_Player";
const SET_GAME_OVER = "set_GameOver";
const SET_WINNING_CELLS = "set_WinningCells";

// Initial Redux State
const initialState = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
  gameOver: false,
  winningCells: [],
};

// Reducer Function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKS:
      return { ...state, marks: action.payload };
    case SET_PLAYER:
      return { ...state, player: action.payload };
    case SET_GAME_OVER:
      return { ...state, gameOver: action.payload };
    case SET_WINNING_CELLS:
      return { ...state, winningCells: action.payload };
    default:
      return state;
  }
};

// Redux Store
const store = createStore(reducer);

// App Component with Provider on BoardContainer
function App() {
  return (
    <div className="App h-screen flex justify-center items-center bg-red-300 bg-cover" style={{backgroundImage:`url(${back})`}} >
      <div >
        <Provider store={store}>
          <BoardContainer />
        </Provider>
      </div>
    </div>
  );
}

// BoardContainer Component using Connect and Map functions
const mapStateToProps = (state) => {
  return {
    marks: state.marks,
    player: state.player,
    gameOver: state.gameOver,
    winningCells: state.winningCells,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMarks: (marks) => {
      dispatch({ type: SET_MARKS, payload: marks });
    },
    setPlayer: (player) => {
      dispatch({ type: SET_PLAYER, payload: player });
    },
    setGameOver: (status) => {
      dispatch({ type: SET_GAME_OVER, payload: status });
    },
    setWinningCells: (cells) => {
      dispatch({ type: SET_WINNING_CELLS, payload: cells });
    },
  };
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

// Main Functional Component (Parent)
function Board({
  marks,
  setMarks,
  player,
  setPlayer,
  gameOver,
  setGameOver,
  winningCells,
  setWinningCells,
}) {
  useEffect(() => {
    const combination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let c of combination) {
      if (
        marks[c[0]] === 1 &&
        marks[c[1]] === 1 &&
        marks[c[2]] === 1
      ) {
        setGameOver(true);
        setWinningCells(c);
        alert(`Player 1 wins.GameOver`);
      }
      if (
        marks[c[0]] === 2 &&
        marks[c[1]] === 2 &&
        marks[c[2]] === 2
      ) {
        setGameOver(true);
        setWinningCells(c);
        alert(`Player 2 wins.GameOver`);
      }
    }
  }, [marks, setGameOver, setWinningCells]);

  const changeMark = (i) => {
    const m = [...marks];

    if (m[i] === 0 && !gameOver) {
      m[i] = player;
      setMarks(m);
      setPlayer(player === 1 ? 2 : 1);
    } else {
      alert(`GameOver.`);
    }
  };

  return (
    <div className="Board grid  place-content-center ">
      <div>
        <Block
          mark={marks[0]}
          position={0}
          changeMark={changeMark}
          isWinning={winningCells.includes(0)}
        />
        <Block
          mark={marks[1]}
          position={1}
          changeMark={changeMark}
          isWinning={winningCells.includes(1)}
        />
        <Block
          mark={marks[2]}
          position={2}
          changeMark={changeMark}
          isWinning={winningCells.includes(2)}
        />
      </div>
      <div>
        <Block
          mark={marks[3]}
          position={3}
          changeMark={changeMark}
          isWinning={winningCells.includes(3)}
        />
        <Block
          mark={marks[4]}
          position={4}
          changeMark={changeMark}
          isWinning={winningCells.includes(4)}
        />
        <Block
          mark={marks[5]}
          position={5}
          changeMark={changeMark}
          isWinning={winningCells.includes(5)}
        />
      </div>
      <div>
        <Block
          mark={marks[6]}
          position={6}
          changeMark={changeMark}
          isWinning={winningCells.includes(6)}
        />
        <Block
          mark={marks[7]}
          position={7}
          changeMark={changeMark}
          isWinning={winningCells.includes(7)}
        />
        <Block
          mark={marks[8]}
          position={8}
          changeMark={changeMark}
          isWinning={winningCells.includes(8)}
        />
      </div>
    </div>
  );
}

// Block Component Child
function Block({ mark, changeMark, position, isWinning }) {
  return (
    <div
      className={`Block m${mark} ${isWinning ? "winningCells" : ""}`}
      onClick={(e) => changeMark(position)}
    ></div>
  );
}

export default App;
