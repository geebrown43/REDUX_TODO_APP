export default function reducer(state = [], action) {
  switch (action.type) {
    case "ADD":
      return [...state, action];
    case "COMPLETE":
      return state.map(a => {
        if (a.completed === false && a.id === action.id) {
          return { ...a, completed: action.completed, style: action.style };
        } else if (a.completed === true && a.id === action.id) {
          return { ...a, completed: false, style: "none" };
        } else {
          return a;
        }
      });
  }
}
