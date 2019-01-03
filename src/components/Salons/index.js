import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { receiveSalons } from '../../actions/salons';
import PriceFilter from '../PriceFilter';
import { SalonsItem } from '../SalonsItem';
import styles from './styles.scss';

class SalonList extends Component {
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

        filteredSalons.sort((a, b) => {
            return a.price - b.price;
        });

        const lowestPrice = filteredSalons.length && filteredSalons[0].price;
        const highestPrice = filteredSalons.length && filteredSalons[filteredSalons.length - 1].price;
        const priceSpan = lowestPrice > 0 ? `${lowestPrice} - ${highestPrice} kr` : null;
        const listClass = this.state.filterIsOpen ? 'list filter' : 'list';

        return salons.length > 0 &&
            <div className="salons">
                <header className="controls">
                    {
                        this.state.filterIsOpen &&
                            <PriceFilter
                              closeFilter={this.closeFilter}
                              defaultRange={[lowestPrice, highestPrice]}
                            />
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
                        <SalonsItem
                          item={item}
                          handleClick={this.handleClick}
                        />
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
