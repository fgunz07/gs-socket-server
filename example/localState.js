const DEAL = 'DEAL';
// function setLocalState(key, value)
// {
//     let val = JSON.stringify(value);
//     localStorage.setItem(key, val);
// }

// function getLocalState(key)
// {
//     localStorage.getItem(key);
// }

const reducer = function r(action)
{
    switch(action.type) {
        case DEAL:
            return isDeal = action.payload;
        default:
            return true;
    }
}

function useReducer(reducer, initialState)
{
    const data = initialState;

    function dispatch({ type, action })
    {
        reducer({ type, action });
    }

    return [
        data,
        dispatch
    ];
}