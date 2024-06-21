import React, { useState } from "react";
import "./AttributeModal.css";

const handleClickInsideModal = (e) => {
  e.stopPropagation(); // Prevent the click event from bubbling up
};
const AttributeModal = ({
  isOpen,
  onClose,
  attributes,
  onSubmit,
  employee,
}) => {
  const [tempRatings, setTempRatings] = useState({});

  const handleRatingChange = (id, value) => {
    setTempRatings((prevRatings) => ({
      ...prevRatings,
      [id]: parseInt(value),
    }));
  };

  const handleSubmit = () => {
    const dataToSend = Object.keys(tempRatings).map((id) => ({
      attributeId: parseInt(id),
      rating: tempRatings[id],
    }));

    setTempRatings({});

    onSubmit(dataToSend); // Submit array of IDs and ratings
  };

  const closeHandler = () => {
    setTempRatings({});
    onClose();
  };
  return (
    <div className={`attribute-modal ${isOpen ? "open" : ""}`}>
      <div className="attribute-modal-overlay" onClick={closeHandler}></div>
      <div className="attribute-modal-content" onClick={handleClickInsideModal}>
        <div className="attribute-modal-header">
          <h2>Rate Attributes for {employee.employeeName}</h2>
          <button className="attribute-modal-close" onClick={closeHandler}>
            X
          </button>
        </div>
        {attributes.map((attribute) => (
          <div key={attribute.id}>
            <label htmlFor={`rating-${attribute.id}`}>
              {attribute.attributeName}
            </label>
            <div className="taskrating-modal-bar">
              <input
                type="range"
                id={`rating-${attribute.id}`}
                min="0"
                max="10"
                value={tempRatings[attribute.id] || 1}
                onChange={(e) =>
                  handleRatingChange(attribute.id, Math.max(e.target.value, 1))
                }
              />
              <span>{tempRatings[attribute.id] || 1}</span>
            </div>
          </div>
        ))}
        <div className="taskRating-modal-button-container">
          <button className="taskRating-modal-buttons" onClick={handleSubmit}>
            Submit
          </button>
          <button className="taskRating-modal-buttons" onClick={closeHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttributeModal;
