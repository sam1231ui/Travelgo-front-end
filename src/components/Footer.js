import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark' id='footer'>
      <MDBContainer className='p-4'>
       
       
      <section className="content" >
        <div className="about-content" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <h2>About Us</h2>
          <p>Your trusted partner in travel adventures! Whether you're seeking adventure,TravelGo has the perfect journey for you.</p><br/>
        </div>
        <div className="contact-info" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:info@travelgo.com">info@travelgo.com</a></p>
          <p>Phone: +123-456-7890</p>
        </div>
      </section>
    
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          TravelGo.pvt
        </a>
      </div>
    </MDBFooter>
  );
}