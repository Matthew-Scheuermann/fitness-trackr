import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

const API = import.meta.env.VITE_API;

export default function ActivityList({ activities }) {
  const { token } = useAuth(); // grab token for user
  const [errors, setErrors] = useState(""); // empty object as initial value (will map errors to IDs)

  const deleteActivity = async (activityId) => {
    const response = await fetch(`${API}/activities/${activityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setErrors("You are not authorized to delete");
    }
  };
  return (
    <>
      <h1>{errors}</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            <button onClick={() => deleteActivity(activity.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
