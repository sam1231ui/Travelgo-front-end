import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const initialState = {
  uid: '',
  pwd: '',
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
};

function Log() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { uid, pwd, loading } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'START_LOADING' });

    try {
      // Replace 'your-api-url' with the actual API URL
      const response = await fetch('http://localhost:8080/checklogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, pwd }),
      });

      if (response.ok) {
        const data = await response.json();
        const roleId = data.role_id;

        if (roleId === 0) {
            const logid = data.id_login;
            const name = data.name;
            navigate('/adminPage', { state: { logid, name } });

        } else if (roleId === 1) {

            const logid = data.id_login;
            const password = pwd;
            navigate('/hostPage', { state: { logid, password } });

        }else if(roleId === 2){
            const logid = data.id_login;
            const name = data.name;
            navigate('/travellerPage', { state: { logid, name } });
        }
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    dispatch({ type: 'STOP_LOADING' });
  };

  const handleFieldChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  return (
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="User ID"
    //       value={uid}
    //       onChange={(e) => handleFieldChange('uid', e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={pwd}
    //       onChange={(e) => handleFieldChange('pwd', e.target.value)}
    //     />
    //     <button type="submit" disabled={loading}>
    //       {loading ? 'Logging in...' : 'Login'}
    //     </button>
    //   </form>
    // </div>

    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card p-4">
          <h2 className="text-center mb-4">Log in to TravelGo</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={uid}
                onChange={(e) => handleFieldChange('uid', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={pwd}
                onChange={(e) => handleFieldChange('pwd', e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Log in
            </button>
          </form>
          {loading === true && (
            <div className="alert alert-success mt-3" role="alert">
              Login successful!
            </div>
          )}
          
            <div >
            Please enter your credentials.
            </div>
        
          <p className="mt-3 text-center">
            Don't have an account?  <Link to='/choice' className='nav-lin px3'> sign up ? </Link>
          </p>
        </div>

         
      </div>
    </div>
  </div>
  );
}

export default Log;
