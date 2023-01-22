import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  let dispatch = useDispatch();
  const { workouts } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const fetchWorkouts = async () => {
      await fetch("/api/workouts")
        .then((res) => res.json())
        .then((res) => {
          dispatch({
            type: "SET_WORKOUTS",
            payload: res,
          });
        })
        .catch((err) => {
          console.log("Error occured when data fetching...", err);
        });
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.length !== 0 &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
