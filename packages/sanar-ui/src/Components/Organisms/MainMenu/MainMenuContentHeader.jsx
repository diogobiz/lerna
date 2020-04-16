import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'

import { useMainMenuContext } from './context'

const ESMainMenuContentHeader = ({ className, title, onClose }) => {
    const classes = classNames('es-main-menu__content--header', className)

    return (
        <div className={classes}>
            <ESTypography
                level={5}
                regular
                data-testid='flix_menu_es-typography--title'
            >
                {title}
            </ESTypography>
            <ESButton
                onClick={() => onClose(false)}
                size='medium'
                variant='text'
                color='white'
                circle
            >
                <ESEvaIcon name='close-outline' />
            </ESButton>
        </div>
    )
}

ESMainMenuContentHeader.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string
}

ESMainMenuContentHeader.defaultProps = {}

export default ESMainMenuContentHeader
