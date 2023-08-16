import { ACTIONS } from "./App";

export default function OperationButton({dispatch, operation }) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPARATION, payload: { operation } })}>
            {operation}
        </button>
    );
}
