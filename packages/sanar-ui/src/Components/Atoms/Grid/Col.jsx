import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'antd'
import classNames from 'classnames'

const ESCol = forwardRef(
    ({ className, flex, style, type, alignSelf, ...props }, ref) => {
        const classes = classNames('es-col', className, {
            [`es-col__${type}`]: type
        })

        const styles = {
            ...style,
            ...(flex && { flex }),
            ...(alignSelf && { alignSelf })
        }

        return <Col ref={ref} style={styles} className={classes} {...props} />
    }
)

ESCol.propTypes = Object.assign(
    { ...Col['propTypes'] },
    {
        flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        alignSelf: PropTypes.oneOf([
            'auto',
            'baseline',
            'center',
            ' end',
            'flex-end',
            'flex-start',
            'inherit',
            'initial',
            'left',
            'normal',
            'right',
            'safe',
            'self-end',
            'self-start',
            'start',
            'stretch',
            'unsafe',
            'unset'
        ]),
        type: PropTypes.string
    }
)

ESCol.defaultProps = Col['defaultProps']

export default ESCol
