import React from 'react';
import ReactModal from 'react-modal';
import { base_url, profile_sizes } from '../secret';

const customStyles = {
  content: {
    background: '#333',
    zIndex: 9,
  },
  button: {
    color: 'black',
  },
};

export default function CelebsList({
  celebrity,
  showModal,
  handleOpenModal,
  handleCloseModal,
  modalContentData,
}) {
  return (
    <React.Fragment>
      <tr>
        <td>{celebrity.name}</td>
        <td>{celebrity.popularity}</td>
        <td>
          <img
            src={`${base_url}${profile_sizes[0]}${celebrity.profile_path}`}
            alt="celebrity avatar"
          />
        </td>
        <td>
          {celebrity.known_for.map((movie) => {
            return (
              <p
                key={movie.id}
                onClick={() => handleOpenModal(movie)}
                id="open-movie-title"
              >
                {movie.title}
              </p>
            );
          })}
          <ReactModal
            isOpen={showModal}
            contentLabel="Movie Information"
            style={customStyles}
          >
            <button onClick={handleCloseModal} id="modalCloseBtn">
              X
            </button>
            <div class="modalContent">
              <h1 id="movie-title">{modalContentData.original_title}</h1>
              <p id="movie-description">{modalContentData.overview}</p>

              <p id="movie-poster">
                <img
                  src={`${base_url}${profile_sizes[1]}${modalContentData.poster_path}`}
                  alt="movie avatar"
                />
              </p>
              <p id="movie-rel-date">
                Release Date: <span>{modalContentData.release_date}</span>
              </p>
              <p id="movie-vote">
                {' '}
                Average Vote: <span>{modalContentData.vote_average}</span>
              </p>
              <p id="movie-view-count">
                Vote Count: <span>{modalContentData.vote_count}</span>
              </p>
            </div>
          </ReactModal>
        </td>
      </tr>
    </React.Fragment>
  );
}
