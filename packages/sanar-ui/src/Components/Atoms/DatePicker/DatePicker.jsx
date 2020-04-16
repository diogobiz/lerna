import React, { forwardRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { DatePicker } from 'antd'
import ESEvaIcon from '../EvaIcon'

const ESDatePicker = forwardRef(({ className, suffixIcon, ...props }, ref) => {
    const classes = classNames('es-date-picker', className)
    const icon = suffixIcon ? suffixIcon : <ESEvaIcon name='calendar-outline' />

    return (
        <DatePicker
            ref={ref}
            className={classes}
            suffixIcon={icon}
            {...props}
        />
    )
})

ESDatePicker.propTypes = {
    className: PropTypes.string,
    dropdownClassName: PropTypes.string,
    allowClear: PropTypes.bool,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledDate: PropTypes.bool,
    open: PropTypes.bool,
    dateRender: PropTypes.func,
    locale: PropTypes.object,
    mode: PropTypes.oneOf(['time', 'date', 'month', 'year', 'decade']),
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['large', 'small']),
    suffixIcon: PropTypes.node,
    onOpenChange: PropTypes.func,
    onPanelChange: PropTypes.func,
    defaultValue: PropTypes.any,
    defaultPickerValue: PropTypes.any,
    value: PropTypes.any,
    disabledTime: PropTypes.bool,
    format: PropTypes.func,
    showTime: PropTypes.bool,
    showToday: PropTypes.bool,
    onChange: PropTypes.func,
    onOk: PropTypes.func
}
ESDatePicker.defaultProps = {}

export default ESDatePicker
