import React, { Component  } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPriceRange } from '../../actions/salons';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles.scss';

class PriceSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            range: null
        };

        this.onChange = this.onChange.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    componentDidMount() {
      this.setState({
        range: this.props.defaultRange
      })
    }

    onChange(values) {
        this.setState({ range: values });
    };

    onAfterChange(range) {
        const priceRange = {
            lowest: this.state.range[0],
            highest: this.state.range[1]
        };

        this.props.dispatch(setPriceRange(priceRange))
    }

    render() {
        const { priceRange, defaultRange } = this.props;
        const range = this.state.range || [priceRange.min, priceRange.max];

        return (
            <div className="price-filter-slider">
                <h1 className="filter-heading">Filtrera på pris</h1>
                <i onClick={this.props.closeFilter} className="close-icon fas fa-times" />
                <span className="lowest-price-indicator">{range[0]} kr</span>
                <Range
                    tipProps={{'placement': 'bottom'}}
                    min={priceRange.min}
                    max={priceRange.max}
                    value={range}
                    allowCross={false}
                    orientation="horizontal"
                    onChange={this.onChange}
                    onAfterChange={this.onAfterChange}
                />
                <span className="highest-price-indicator">{range[1]} kr</span>
            </div>
        )
    }
}

PriceSlider.propTypes = {
    priceRange: PropTypes.object
};

function mapStateToProps (state) {
    return {
        priceRange: state.salons.priceRange
    }
}

export default  connect(mapStateToProps)(PriceSlider);