import React from 'react';

export default function FavoritesList({ favorites }) {
  return (
    <div className="favorites-container">
      <h2 style={{ color: 'orange' }}>My favorites: </h2>
      {favorites &&
        favorites.map((favorite, idx) => {
          return (
            <div style={{borderBottom: "1px solid orange", marginBottom: "10px"}}>
              <p>
                <span style={{color: "#03a9f4"}}>{idx + 1}.</span> {favorite.fname} {favorite.lname} {" "} | {' '}{favorite.mname} {" "} | {' '}
                {favorite.gender} {" "} | {' '} {favorite.popularity} 
                {" "} | {' '}
                Chose because it was: {favorite.popular ? 'Popular' : null}{' '}
                {favorite.interesting ? 'Interesting' : null}{' '}
                    {/* ideally hbeautiful should be based on gender*/}
                {favorite.hbeautiful ? 'Handsome/Beautiful' : null}{' '}
              </p>
            </div>
          );
        })}
    </div>
  );
}
