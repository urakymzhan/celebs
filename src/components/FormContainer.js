import React from 'react';

export default function FormContainer(props) {
  const {
    fname,
    lname,
    mname,
    gender,
    popularity,
    interesting,
    popular,
    hbeautiful,
    handleFormChange,
    handleFormSubmit,
  } = props;
  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Submit your favorite</legend>
          <label htmlFor="fname">
            First name:
            <input
              type="text"
              id="fname"
              name="fname"
              value={fname}
              onChange={handleFormChange}
            />
          </label>
          <label htmlFor="lname">
            Last name:
            <input
              type="text"
              id="lname"
              name="lname"
              value={lname}
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="mname">
            1 movie name:
            <input
              type="text"
              id="mname"
              name="mname"
              value={mname}
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="gender">Gender of celebrity ?</label>
          <label style={{ marginTop: 0 }}>
            <input
              id="gender"
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleFormChange}
            />
            Male
          </label>
          <label style={{ marginTop: 0 }}>
            <input
              className="gender"
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleFormChange}
            />
            Female
          </label>

          <label htmlFor="popularity">
            Popularity:
            <input
              type="number"
              id="popularity"
              name="popularity"
              value={popularity}
              onChange={handleFormChange}
            />
          </label>

          <label className="checkboxes-title">
            Why he/she is your favorite?
          </label>

          <label style={{ marginTop: 0 }}>
            <input
              name="interesting"
              type="checkbox"
              onChange={handleFormChange}
              checked={interesting}
              value="Interesting"
            />
            Interesting
          </label>
          <label style={{ marginTop: 0 }}>
            <input
              name="popular"
              type="checkbox"
              onChange={handleFormChange}
              checked={popular}
              value="Popular"
            />
            Popular
          </label>
          <label style={{ marginTop: 0 }}>
            <input
              name="hbeautiful"
              type="checkbox"
              onChange={handleFormChange}
              checked={hbeautiful}
              value="Handsome/Beautiful"
            />
            Handsome/Beautiful
          </label>

          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </div>
  );
}
