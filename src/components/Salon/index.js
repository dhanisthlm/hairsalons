import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import styles from './styles.scss';

export class Salon extends Component {
    constructor (props) {
        super(props);

        this.state = {
            salon: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate() {
        const { salon } = this.props;
        if (salon.photo !== this.state.salon.photo) {
            this.setState({ salon });
        }
    }

    handleClick() {
        this.props.dispatch(routeActions.push('/list/'));
    }

    render () {
        const { salon } = this.state;

        if (!salon.photo) {
            return null
        }

        return (
            <div className="salon">
                <div className="cover">
                    <img className="photo" src={`/images/${salon.photo}`} alt="haircut" />
                    <i className="like far fa-heart" />
                    <span onClick={this.handleClick} className="nav-back">&#9001;</span>
                    <p className="name">{salon.name}</p>
                    <div className="rating">
                        <div className="stars">
                            <span className="star filled">☆</span>
                            <span className="star filled">☆</span>
                            <span className="star filled">☆</span>
                            <span className="star filled">☆</span>
                            <span className="star">☆</span>
                            <span className="votes">(24)</span>
                        </div>
                    </div>
                </div>
                <div className="tabs">
                    <p className="tab tab--active">Info</p>
                    <p className="tab">Schema</p>
                </div>
                <ul className="list">
                    <li className="list-item location">
                        <i className="fas fa-map-marker-alt" />
                        <p>{salon.address},&nbsp;{salon.postalCode}</p>
                    </li>
                    <li className="list-item opening-hours">
                        <i className="far fa-clock" />
                        <p>{salon.openingHours}</p>
                        <span className="open-hours">&#9001;</span>
                    </li>
                    <li className="list-item location">
                        <i className="fas fa-phone" />
                        <p>{salon.phone}</p>
                    </li>
                    <li className="list-item location">
                        <i className="fas fa-globe-asia" />
                        <p>{salon.web}</p>
                    </li>
                    <li className="list-item">
                        <p>{salon.description}</p>
                    </li>
                </ul>
            </div>
        )
    }
}

Salon.propTypes = {
    salon: PropTypes.object
};

function mapStateToProps (state) {
    return {
        salon: state.salons.item
    }
}

export default connect(mapStateToProps)(Salon);
