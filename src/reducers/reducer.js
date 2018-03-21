export default function reducer(state = [], action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { text: action.text, id: action.id, completed: false, style: action.style }
      ];
    case "COMPLETE":
      return state.map(
        a =>
          a.id === action.id
            ? { ...a, completed: action.completed, style: action.style }
            : a
      );
    case "NOT_COMPLETE":
      return state.map(
        a => (a.id === action.id ? { ...a, completed: action.completed, style: action.style } : a)
      );
    default:
      return state;
  }
}
