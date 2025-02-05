import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StarsList() {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get('http://localhost:3003/api/stars', {
      headers: { Authorization: token }
    })
      .then(res => setStars(res.data))
      .catch(err => {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <h3>StarsList <button onClick={handleLogout}>Logout</button></h3>
      {stars.length > 0 ? (
        <div>
          {stars.map((star) => (
            <div key={star.id} style={{ marginBottom: '20px' }} className="star">
              <h4>{star.fullName}</h4>
              <p>Born: {star.born}</p>
              <p>{star.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No stars found.</p>
      )}
    </div>
  );
}