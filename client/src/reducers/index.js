import { combineReducers } from "redux";
import { workoutReducer } from "./workoutReducer";

const rootReducer = combineReducers({
    workouts: workoutReducer,
});

export default rootReducer;
