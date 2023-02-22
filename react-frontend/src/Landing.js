import { useAuth } from "./context/AuthProvider.js";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


export const Landing = () => {
  const { value } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/account/users'
    ).then( response => {
      if(response){
        setUsers(response.data);
      }
    });
  },[setUsers]);

  return (
    <>
      {/* <h2>Landing (Protected)</h2> */}
      <h2>Contacts</h2>
      <div>
        <table>
          <thead>
          <tr>
            <th>Username</th>
            <th>Phone Number</th>
          </tr>
          </thead>

          <tbody>
            {users.map(user => {
              <tr key={user._id}>
                <td>
                  {user.username}
                </td>
                <td>
                  {user.phoneNumber}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
     
      <div> Authenticated as {value.token}</div>
    </>
  );
};