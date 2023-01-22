import { useState } from "react";
import { useDispatch } from "react-redux";

const WorkoutForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [load, setload] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {
      title,
      load,
      reps,
    };

    await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTitle("");
        setload("");
        setReps("");
        setError("");
        setEmptyFields([]);
        console.log("New workout added", res);
        dispatch({
          type: "CREATE_WORKOUT",
          payload: res,
        });
      })
      .catch((err) => {
        console.log("Error occured when workout add...", err);
      });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setload(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
