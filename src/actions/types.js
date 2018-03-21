let id = 0;
export const ADD_ITEM = text => {
    return {
        type: "ADD",
        completed: false,
        style: 'none',
        id: id++,
        text
    }
}
export const SHOW_LINE = id => {
  return {
    type: "COMPLETE",
    completed: true,
    id,
    style: 'line-through'
  };
};