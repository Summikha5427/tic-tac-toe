//Tic-Tac-Toe (React-compoents with redux )

import { useEffect} from "react";
import { Provider, connect } from "react-redux"; //helps in integrating React Components with redux store
import { createStore } from "redux"; // helps o creating store to use redux with react-components
// helps in avoiding the use of props for passing the data from component  to another

// REDUX: Initial State
const initialState = {
  marks: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  player: 1,
  gameOver: false
};

//REDUX: Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "set_Marks":
      return { ...state, marks: action.payload };
    case "set_Player":
      return { ...state, player: action.payload };
    case "set_GameOver":
      return { ...state, gameOver: action.payload };
    default:
      return state;
  }
};

//Redux Store
const store = createStore(reducer);

// App Component with Provider on BoardContainer
function App() {
  return (
    <div className="App">
      <div>
        <Provider store={store}>
          <BoardContainer></BoardContainer>
        </Provider>
      </div>
    </div>
  );
}

//two arguments with the connection to the component which is stored in the container

// ---simple state define .Here we have only two props : marks and players

//-----BoardContainer Component using Connect and Map functions

const mapStateToProps = (state) => {
  return {
    marks: state.marks,
    player: state.player,
    gameOver: state.gameOver
  };
};

//---dispatch contains fucntions to the props
const mapDisptachToProps = (dispatch) => {
  return {
    setMarks: (marks) => {
      dispatch({ type: "set_Marks", payload: marks });
    },
    setPlayer: (player) => {
      dispatch({ type: "set_Player", payload: player });
    },
    setGameOver: (status) => {
      dispatch({ type: "set_GameOver", payload: status });
    },
  };
};

//requires a container to use the props from the component.
// A container which connects the component with th estate and its action and also to use the props of the components.
// The container consists of two argument .
// one for 'state' which consists of simple states of the app
// second fo for the dispatch action which will be a function.

const BoardContainer = connect(mapStateToProps, mapDisptachToProps)(Board);

//Main Functional Component (Parent)

function Board({ marks, setMarks, player, setPlayer, gameOver, setGameOver }) {
  // passing the variable as props to store
  // Removing hooks as it more easier with redux

  // const [marks, setMarks] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // const [player, setPlayer] = useState(1);

  //useEffect is always at the top  after the decalration of variables or the useState

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
      if (marks[c[0]] === 1 && marks[c[1]] === 1 && marks[c[2]] === 1) {
        console.log(`player 1 wins, GameOver.`);
        setGameOver(true);
      }
      if (marks[c[0]] === 2 && marks[c[1]] === 2 && marks[c[2]] === 2) {
        console.log(`player 2 wins, GameOver.`);
        setGameOver(true);
      }
    }
  }, [marks]);

  const changeMark = (i) => {
    const m = [...marks]; //destructuting - making a copy of the array to use the change of state

    if (m[i] === 0 && !gameOver) {
      m[i] = player;
      setMarks(m);
      setPlayer(player === 1 ? 2 : 1);
    } else {
      alert(` GameOver.`);
    }
  };

  return (
    <div className="Board grid  place-content-center ">
      <div>
        <Block mark={marks[0]} position={0} changeMark={changeMark}></Block>
        <Block mark={marks[1]} position={1} changeMark={changeMark}></Block>
        <Block mark={marks[2]} position={2} changeMark={changeMark}></Block>
      </div>
      <div>
        <Block mark={marks[3]} position={3} changeMark={changeMark}></Block>
        <Block mark={marks[4]} position={4} changeMark={changeMark}></Block>
        <Block mark={marks[5]} position={5} changeMark={changeMark}></Block>
      </div>
      <div>
        <Block mark={marks[6]} position={6} changeMark={changeMark}></Block>
        <Block mark={marks[7]} position={7} changeMark={changeMark}></Block>
        <Block mark={marks[8]} position={8} changeMark={changeMark}></Block>
      </div>
    </div>
  );
}

//Child Component - Passing data to parent compoment using redux store
// Props gets stored in the store which is connected with "connect"
//the "Provider" makes the store avaialble for the components.

// A container helps with the connection to the Funcitonal component which in turns
// takes two paprameters (mapstatetoprops, mapdispatchtoprops)

//----- Block Component Child
function Block({ mark, changeMark, position }) {
  return (
    <div
      className={`Block m${mark}`}
      onClick={(e) => changeMark(position)}
    ></div>
  );
}

export default App;
