import { useState, useEffect } from "react";
import axios from "axios";

// should delete this if don't have time to implement persistent login

axios.defaults.withCredentials = true;

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true
    // lets us cancel any pending request if the component unmounts
    const controller = new AbortController();

    const getUsers = () => {
        axios.get().then((response) => {}).catch((err) => {})
    }

  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {/* create an unordered list of the user's usernames */}
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};
