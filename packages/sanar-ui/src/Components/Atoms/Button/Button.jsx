import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import classNames from 'classnames'

import ESIcon from '../Icon'

const ESButton = ({
    className,
    clear,
    size,
    variant,
    color,
    block,
    blockOnlyMobile,
    children,
    bold,
    uppercase,
    href,
    icon,
    circle,
    loading,
    htmlType,
    ...props
}) => {
    const classes = classNames(
        'es-button',
        className,
        {
            [`es-button__${size}`]: size,
            [`es-button__variant--${variant}`]: variant,
            [`${color}`]: color,
            'es-button__block': block,
            'es-button__block--mobile': blockOnlyMobile,
            loading,
            bold: bold,
            uppercase: uppercase,
            circle: circle
        },
        'ant-btn'
    )

    const mapChildren = child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return <span>{child}</span>
        }
        return child
    }
    const kids =
        children && children.length > 1
            ? React.Children.map(children, mapChildren)
            : children

    if (!!href) {
        return (
            <a
                href={href}
                data-testid='es-button'
                className={classes}
                {...props}
            >
                {icon && <ESIcon type={icon} />}
                {kids}
            </a>
        )
    }

    const Loading = () => <ESIcon type='loading' />

    return (
        <button
            disabled={loading}
            type={htmlType}
            className={classes}
            data-testid='es-button'
            {...props}
        >
            {icon && <ESIcon type={icon} />}
            {loading && <Loading />}
            {kids}
        </button>
    )
}

ESButton.propTypes = Object.assign(
    { ...Button['propTypes'] },
    {
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        clear: PropTypes.bool,
        href: PropTypes.string,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        target: PropTypes.string,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        variant: PropTypes.oneOf(['solid', 'outlined', 'text']),
        color: PropTypes.oneOf([
            'primary',
            'secondary',
            'white',
            'black',
            'default',
            'light',
            'grey'
        ]),
        bold: PropTypes.bool,
        blockOnlyMobile: PropTypes.bool
    }
)

ESButton.defaultProps = { size: 'medium', htmlType: 'button' }

export default ESButton
