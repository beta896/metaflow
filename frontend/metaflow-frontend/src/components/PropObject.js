import React from 'react';
import PropTypes from 'prop-types';

function PropObject({ propTypes, difficultyLevel }) {
  return (
    <div>
      <h2>Prop Details</h2>
      <pre>{JSON.stringify(propTypes, null, 2)}</pre>
      <p>Difficulty: {difficultyLevel}</p>
    </div>
  );
}

PropObject.propTypes = {
  propTypes: PropTypes.object.isRequired,
  difficultyLevel: PropTypes.string.isRequired,
};

export default PropObject;
