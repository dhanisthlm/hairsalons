import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export const SalonsItem = ({ item, handleClick }) => (
    <li
        id={item._id}
        className="list-item"
        key={item._id}
        onClick={handleClick}>
        {console.log(item)}
        <div className="content">
            <div className="title">
                <span className="time-slot">{item.timeSlot}</span>
                <span className="name">{item.name}</span>
                <span className="price">{item.price} kr</span>
            </div>
            <div className="rating">
                <div className="stars">
                <span className="star filled">☆</span>
                <span className="star filled">☆</span>
                <span className="star filled">☆</span>
                <span className="star filled">☆</span>
                <span className="star">☆</span>
                <span className="votes">(24)</span>
            </div>
            <span className="duration">{item.duration} min</span>
        </div>
        <span className="address">{item.address}</span>
    </div>
  </li>
);

SalonsItem.propTypes = {
    item: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};