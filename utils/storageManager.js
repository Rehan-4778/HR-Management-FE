const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    console.log("Error saving state");
  }
};

const clearState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    console.log("Error clearing state");
  }
};

export { loadState, saveState, clearState };
