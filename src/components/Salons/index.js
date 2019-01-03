import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { receiveSalons } from '../../actions/salons';
import PriceFilter from '../PriceFilter';
import styles from './styles.scss';

export class SalonList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterIsOpen: false,
            updateItem: null,
            priceRange: {
                min: null,
                max: null,
            }
        };

        this.toggleFilter = this.toggleFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(receiveSalons())
    }

    componentDidUpdate(prevProps) {
        const { priceRange } = this.state;

        if (prevProps.priceRange.min !== this.props.priceRange.min) {
            priceRange.min = this.props.priceRange.min;
            this.setState({ priceRange });
        }

        if (prevProps.priceRange.max !== this.props.priceRange.max) {
            priceRange.max = this.props.priceRange.max;
            this.setState({ priceRange });
        }
    }

    toggleFilter() {
       this.setState({ filterIsOpen: !this.state.filterIsOpen });
    }

    closeFilter() {
        this.setState({ filterIsOpen: false });
    }

    handleClick(event) {
        this.props.dispatch(routeActions.push(`/list/salon/${event.currentTarget.id}`));
    }

    render() {
        const { salons, filteredSalons } = this.props;
        const sorted = filteredSalons.sort((a, b) => {
            return a.price > b.price;
        });

        const lowestPrice = filteredSalons.length && sorted[0].price;
        const highestPrice = filteredSalons.length && sorted[filteredSalons.length - 1].price;
        const priceSpan = lowestPrice > 0 ? `${lowestPrice} - ${highestPrice} kr` : null;
        const listClass = this.state.filterIsOpen ? 'list filter' : 'list';


        return salons.length > 0 &&
            <div className="salons">
                <header className="controls">
                    {
                        this.state.filterIsOpen &&
                            <PriceFilter closeFilter={this.closeFilter} />
                    }
                    <span className="go-back">&#9001;</span>
                    <span className="heading">Hår</span>
                    <i onClick={this.toggleFilter} className="filter-icon fas fa-sliders-h" />
                </header>
                <div className="price-budget">
                    <span className="price-filter-indicator">
                        {`Priser: ${priceSpan}`}
                    </span>
                    <span className="toggle">&#9001;</span>
                </div>
                <ul className={listClass}>
                    {this.props.filteredSalons.map(item =>
                        <li
                            id={item._id}
                            className="list-item"
                            key={item._id}
                            onClick={this.handleClick}>
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
                  )}
              </ul>
        </div>
    }
}

SalonList.propTypes = {
    salons: PropTypes.array,
    salon: PropTypes.object,
    filteredSalons: PropTypes.array,
    priceRange: PropTypes.object
};

function mapStateToProps (state) {
  return {
    salons: state.salons.list,
    salon: state.salons.item,
    filteredSalons: state.salons.filteredList,
    priceRange: state.salons.priceRange
  }
}

export default connect(mapStateToProps)(SalonList)
