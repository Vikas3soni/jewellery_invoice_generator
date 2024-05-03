

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider'; // Import the AuthProvider

// function LoginPage() {
//   const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth(); // Use the login function from AuthProvider
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Implement your login logic here
//     if (userId && password) {
//       // Assuming successful login sets isLoggedIn to true
//       if (userId === 'vikas' && password === 'vikas') {
//         // Perform login with the username
//         login('vikas'); // Replace 'vikas' with the appropriate username or user ID
//         alert('Logged in successfully!');
//         navigate('/dashboard'); // Redirect to the dashboard page
//       } else {
//         alert('Wrong password - use user_id - vikas password - vikas');
//       }
//     } else {
//       alert('Please fill in both fields.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* <image src="Users/vikas/Documents/projects/react-invoice/src/components/App/images/logo.jpeg"> </image> */}
//       {/* <img src="Users/vikas/Downloads/logo.jpeg" alt="Your Logo" /> */}
//       <h1 style={styles.heading}>SunarMs Login</h1>
//       <div style={styles.form}>
//         <label style={styles.label}>User ID:</label>
//         <input
//           type="text"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           style={styles.input}
//         />
//         <label style={styles.label}>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
//         <button onClick={handleLogin} style={styles.button}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f0f0f0',
//   },
//   heading: {
//     marginBottom: '20px',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '300px',   
//     padding: '20px',
//     borderRadius: '5px',
//     backgroundColor: '#fff',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   label: {
//     marginBottom: '10px',
//     fontWeight: 'bold',
//   },
//   input: {
//     marginBottom: '20px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '3px',
//     width: '100%',
//   },
//   button: {
//     padding: '10px 20px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '3px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
// };

// export default LoginPage;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { useAuth0 } from '@auth0/auth0-react';
import WelcomePage from './sunarMslogin'; 
import './LoginPage.css'; 
import { style } from '@mui/system';

function LoginPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate(); // Get the history object

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to dashboard if user is authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithRedirect(); // Redirect the user to the Auth0 login page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="root">
      <WelcomePage />
      
    <div style={styles.container}>
      <h1 style={styles.heading}>SunarMs Login</h1>
      <div style={styles.form}>
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        </div>
      </div>
    </div>
  );
}



const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
    justifyContent: 'center',
    height: '100vh',
   // backgroundColor: '#f0f0f0',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: '20px',
    borderRadius: '5px',
   // backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    //transition: 'background-color 0.3s',
  },
};

export default LoginPage;
