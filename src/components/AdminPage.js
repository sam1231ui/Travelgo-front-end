import React, { useReducer, useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
} from 'mdb-react-ui-kit';

const initialState = {
  loading: true,
  profileList: [],
  hostList: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        profileList: action.payload.profileList,
        hostList: action.payload.hostList,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        profileList: [],
        hostList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const AdminPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showFullList, setShowFullList] = useState(false);

  useEffect(() => {
    // Fetch profile and host data lists from API endpoints
    Promise.all([
      fetch('http://localhost:8080/getalladmin'),
      fetch('http://localhost:8080/getalllogs'),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([profileData, hostData]) => {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: { profileList: profileData, hostList: hostData },
        });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      });
  }, []);

  const { loading, profileList, hostList, error } = state;

///////////////////////
  const handleBlockButtonClick = async (idLogin) => {
    try {
        const response = await fetch("http://localhost:8080/blocklog?id_login="+idLogin);

      if (response.ok) {
        console.log('Host blocked successfully');
        // Refresh host list after blocking
        // You can update the host list as needed here
        window.location.reload();
      } else {
        console.log('Error blocking host');
      }
    } catch (error) {
      console.error('Error blocking host:', error);
    }
  };

  ////////////////////////////////
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#9de2ff',
        width: '100%',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8">
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <h2 className="mb-4">Profile Details</h2>
                {loading ? (
                  <p>Loading profile data...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : profileList.length > 0 ? (
                  <div>
                    {showFullList ? (
                      <MDBTable striped bordered>
                        <MDBTableHead>
                          <tr>
                            <th>Name</th>
                            <th>Last-Name</th>
                            <th>Email</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {profileList.map((profile, index) => (
                            <tr key={index}>
                              <td>{profile.fname}</td>
                              <td>{profile.lname}</td>
                              <td>{profile.emailid}</td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    ) : (
                      <p>WELCOME: {profileList[0].fname}</p>
                    )}
                    <MDBBtn
                      color="dark"
                      onClick={() => setShowFullList(!showFullList)}
                      className="mt-3"
                    >
                      {showFullList ? (
                        <i className="fas fa-bars"></i>
                      ) : (
                        <i className="fas fa-list"></i>
                      )}
                    </MDBBtn>
                  </div>
                ) : (
                  <p>No profile data available.</p>
                )}

                <h2 className="mt-4">Login List</h2>
                <MDBTable striped bordered>
                  <MDBTableHead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>ChangeStatus</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {hostList.map((host, index) => (
                      <tr key={index}>
                        <td>{host.name}</td>
                        <td>{host.role_id}</td>
                        <td>{host.status}</td>
                        <td>
                            <button onClick={() => handleBlockButtonClick(host.id_login)}>
                            BLOCK
                            </button>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AdminPage;
