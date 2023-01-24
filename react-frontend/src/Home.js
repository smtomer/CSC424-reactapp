import { useAuth } from "./context/AuthProvider";
import {React,  useState } from "react";

// export const Home = () => {
//   const { value } = useAuth();
//   return (
//     <>
//       <h2>Home (Public)</h2>
      
//       {/* <form> onSubmit={handleSubmit} */}
//       <form>
//         <label>
//           <p>Username</p>
//           <input 
//             type="text" />
//         </label>
//         <label>
//           <p>Password</p>
//           <input type="password" />
//         </label>
//         <div>
//         <button type="button" onClick={value.onLogin}>
//         Sign In
//         </button>
//         </div>
//       </form>

//       {/* <button type="button" onClick={value.onLogin}>
//         Sign In
//       </button> */}
//   </>
// );
// };


export const Home = () => {
  const { value } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const submitThis=()=>{
  //   const info={name:name,password:password}; 
  //   // setDataInput([info]);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    return value.onLogin(name, password);
  }
  return (
    <>
      <h2>Home (Public)</h2>

      {value.errorMessage}

      <form onSubmit={handleSubmit}>
      {/* <form> */}
        <label>
          <p>Username</p>
          <input 
            type="text" 
            name="name"
            id="name"
            value={name} onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input 
          type="text"
          name="password"
          id="password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
          />
        </label>
        <div>
        {/* <button type="button" onClick={value.onLogin(name, password)}> */}
        <button type="submit">
        Sign In
        </button>
        </div>
      </form>
  </>
);
};




// export const Home = () => {
  
//   // handleChange = ({target}) => {
//   //   this.setState({[target.name]: target.value});
//   // };
// //   function handleChange(target) {
// //     const { name, value } = target;
// //     this.setState({[target.name]: target.value});
// // }

//   const { value } = useAuth();
//   return (
//     <>
//       <h2>Home (Public)</h2>
      
//       <form>
//         <label>
//           <p>Username</p>
//           <input 
//             type="text" 
//             name="username"
//             // value={this.state.username}
//             // onChange={this.handleChange}
//             />
//         </label>
//         <label>
//           <p>Password</p>
//           <input 
//           type="password" 
//           name="password"
//           // value={this.state.password}
//           // onChange={this.handleChange}
//           />
//         </label>
//         <div>
//         <button type="button" onClick={value.onLogin}>
//         Sign In
//         </button>
//         </div>
//       </form>

//       {/* <button type="button" onClick={value.onLogin}>
//         Sign In
//       </button> */}
//   </>
// );
// };