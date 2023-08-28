import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PropertyDetailsPage = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const  { property_id, traveller_id, checkinDate, checkoutDate, logid, name } = location.state;

  console.log(property_id);

  

  const fetchDetails = async () => {
    try {
      const response = await fetch("http://localhost:8080/getselectedproperty?id_property="+property_id);
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      } else {
        console.log('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);


  const handleConfirmBooking = async () => {
     
    try {
      const response = await fetch('http://localhost:8080/savebooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prop_id: property_id,
          travel_id: traveller_id, // this is the travel_id of the user
          checkin: checkinDate,
          checkout: checkoutDate,
          totalfare: 100000,
          pay_mode:"online",
          amount:1000
        }),
      });
  
      if (response.ok) {
        console.log('Booking request sent successfully.');
        navigate('/travellerPage', { state: { logid, name} });

      } else {
        console.log('Failed to send booking request.');
      }
    } catch (error) {
      console.error('Error sending booking request:', error);
    }
  };

   // Function to calculate the check-out date (you can adjust the logic as needed)
   const calculateCheckoutDate = (checkinDate) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + 1); // Assuming one-day stay
    return checkout.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
    };

    //const amenity = details.id_ammenity.id_ammenity == null ? true : false;
    // console.log(details.id_ammenity.rooms);


  return (
    <div className="property-details-container">
    <div className="property-images">
      {details ? (
        <img
          style={{ width: 400, height: 400 }}
          src={`data:image/jpeg;base64,${details.pictures}`}
          className='img-fluid hover-shadow'
          alt={details.id_property}
        />
      ) : (
        <div>Loading image...</div>
      )}
    </div>
    <div className="property-details">
      <h2>Property Details</h2>
      <div>
        <p><strong>Address:</strong> {details ? details.address : 'Loading...'}</p>
        <p><strong>City:</strong> {details ? details.city : 'Loading...'}</p>
        <p><strong>Room:</strong> {details ? details.id_ammenity.rooms : 'Loading...'}</p>
        <p><strong>HomeType</strong> {details ? details.id_ammenity.home_type : 'Loading...'}</p>
        <p><strong>Summary</strong> {details ? details.id_ammenity.summary : 'Loading...'}</p>
         
        
          {/* <div>
          <p><strong>Rooms:</strong> {details.id_ammenity.rooms == null ? 0 :  details.id_ammenity.id_ammenity.rooms}</p>
          <p><strong>Bedrooms:</strong> {details.id_ammenity.bedrooms ? details.id_ammenity.id_ammenity.bedrooms : 0 }</p>
          <p><strong>HomeType:</strong> {details.id_ammenity.id_ammenity.home_type ? details.id_ammenity.id_ammenity.home_type : 'NA'}</p>
          <p><strong>has_kitchen:</strong> {details.id_ammenity.id_ammenity.has_kitchen ? details.id_ammenity.id_ammenity.has_kitchen : 'NA'}</p>
          <p><strong>has_ac:</strong> {details.id_ammenity.id_ammenity.has_ac ? details.id_ammenity.id_ammenity.has_ac : 'NA'}</p>
          <p><strong>has_parking:</strong> {details.id_ammenity.id_ammenity.has_parking ? details.id_ammenity.id_ammenity.home_type : 'NA'}</p>
          <p><strong>has_tv:</strong> {details.id_ammenity.id_ammenity.has_tv ? details.id_ammenity.id_ammenity.has_tv : 'NA'}</p>
          <p><strong>has_caretaker:</strong> {details.id_ammenity.id_ammenity.has_caretaker ? details.id_ammenity.id_ammenity.has_caretaker : 'NA'}</p>
          <p><strong>summary:</strong> {details.id_ammenity.id_ammenity.summary ? details.id_ammenity.id_ammenity.summary : 'NA'}</p>
          </div> */}
          
      
        
      </div>
      <button onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
  </div>
  );
};

export default PropertyDetailsPage;
