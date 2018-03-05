import React from "react";

class InputNumber extends React.Component {

    constructor(props,) {
        super(props);

        const {value} = this.props;

        this.state = {
            value: value,
            valueLastValid: value
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeBlur = this.handleChangeBlur.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    /**
     * calls validation on blur
     * if true save value also as valueLastValid and calls onChangeEvent when set
     * if false set valueLastValid as value
     *
     * @param e
     */
    handleChangeBlur(e) {
        const {onChangeEvent} = this.props;

        let value = e.target.value;

        if (this.isValid(value)) {
            this.setState({
                value: value,
                valueLastValid: value
            });

            if (onChangeEvent) onChangeEvent(e);
        } else {
            this.setState({
                value: this.state.valueLastValid,
            });
        }
    }

    /**
     * validates against is number, min and max
     *
     * @param value
     * @returns {boolean}
     */
    isValid(value) {
        return !(!this.validateIsNumber(value) || !this.validateMin(value) || !this.validateMax(value));
    }

    /**
     * Validates if value is number
     *
     * @param value
     * @returns {boolean}
     */
    validateIsNumber(value) {
        return value * 1 === parseInt(value, 10);
    }

    /**
     * Checks if min is set and validates value against
     *
     * @param value
     * @returns {boolean}
     */
    validateMin(value) {
        const {min} = this.props;

        return !(min !== undefined && value < min);
    }

    /**
     * Checks if max is set and validates value against
     *
     * @param value
     * @returns {boolean}
     */
    validateMax(value) {
        const {max} = this.props;

        return !(max !== undefined && value > max);
    }

    render() {
        const {
            name,
            autoComplete
        } = this.props;

        return (
            <input
                type="number"
                name={name}
                onBlur={this.handleChangeBlur}
                autoComplete={autoComplete}
                value={this.state.value}
                onChange={this.handleChange}
            />
        )
    }
}
export default InputNumber;