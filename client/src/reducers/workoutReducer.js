export const workoutReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return action.payload;
    case "CREATE_WORKOUT": {
      console.log(state);
      return [action.payload, ...state];
    }
    case "DELETE_WORKOUT": {
      return state.filter((w) => w._id !== action.payload._id);
    }
    default: {
      return state;
    }
  }
};
