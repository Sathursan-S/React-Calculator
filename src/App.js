import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OparationButton";
import "./style.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE: "delete",
  CHOOSE_OPARATION: "choose-operation",
  EVALUATE: "evaluate",
};

/**
 * The reducer function handles different actions to update the state in a calculator application.
 * @param state - The `state` parameter represents the current state of the reducer. It is an object
 * that contains the following properties:
 * @returns The function `reducer` returns the updated state object based on the given action type and
 * payload.
 */
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }}
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand||""}${payload.digit}`,
      };
      

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE:
      if (state.overwrite) return { ...state, overwrite: false,currentOperand: null}
      if (state.currentOperand === "") return state;
      if (state.currentOperand.length === 1) return { ...state, currentOperand:null };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
      

    case ACTIONS.CHOOSE_OPARATION:
      if (state.currentOperand === "") return state;
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: "",
      };
      

    case ACTIONS.EVALUATE:
      if (state.currentOperand === "") return {...state, previousOperand: null};
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: state.previousOperand + state.operation + state.currentOperand + " =",
        operation: "",
        overwrite: true,
      };
      
      default:
        return state;
  }
}

/**
 * The evaluate function takes in an object with currentOperand, previousOperand, and operation
 * properties, performs the specified operation on the operands, and returns the result.
 * @returns the evaluated result of the given expression.
 */
function evaluate({currentOperand, previousOperand, operation}){
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return currentOperand;

  let ans=""
  switch (operation) {
    case "+":
      ans= previous + current;
      break
    case "-":
      ans = previous - current;
      break
    case "×":
      ans = previous * current;
      break
    case "÷":
      ans = previous / current;
      break
    default:
      ans= currentOperand;
      break;
  }
  return ans;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });

  return (
    <div className="calcultor-grid">
      <div className="output">
        <div className="previous-operend">
          {previousOperand} {operation}
        </div>
        <div className="current-operend">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="×" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        className="span-two"
      >
        =
      </button>
    </div>
  );
}

export default App;
