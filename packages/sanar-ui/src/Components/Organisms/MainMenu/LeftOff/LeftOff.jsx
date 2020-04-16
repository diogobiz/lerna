import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESTypography from '../../../Atoms/Typography'
import ESEvaIcon from '../../../Atoms/EvaIcon'
import ESSkeleton from '../../../Atoms/Skeleton'

const ESLeftOff = ({
    className,
    title,
    thumbnail,
    classReference,
    moduleReference,
    label,
    resourceType,
    onClick
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-left-off', className)
    const classesImage = classNames('es-left-off__class--img', {
        'es-left-off__class--video': resourceType === 'Video'
    })

    return (
        <div className={classes} onClick={onClick}>
            {!classReference || !moduleReference ? (
                <ESSkeleton paragraph={{ rows: 3 }} dark />
            ) : (
                <>
                    {!!title && (
                        <ESTypography
                            className='es-left-off--title mb-xs'
                            ellipsis
                            level={6}
                        >
                            {title}
                        </ESTypography>
                    )}
                    <ESTypography
                        variant='overline'
                        className='text-white-6 mb-sm'
                    >
                        {label || t('mainMenu.leftOff')}
                    </ESTypography>
                    <div className='es-left-off__class'>
                        <div className={classesImage}>
                            <div
                                className='es-left-off__class--img-background'
                                style={{ backgroundImage: `url(${thumbnail})` }}
                            />
                            {resourceType === 'Video' && (
                                <div className='es-left-off__class--img--overlay'>
                                    <ESEvaIcon
                                        name='play-circle'
                                        size='large'
                                    />
                                </div>
                            )}
                        </div>
                        <div className='es-left-off__class--info pt-xs pb-xs pl-sm pr-sm'>
                            <ESTypography
                                ellipsis
                                variant='subtitle2'
                                strong
                                className='black'
                            >
                                {classReference}
                            </ESTypography>
                            <ESTypography
                                ellipsis
                                variant='caption'
                                type='muted'
                            >
                                {moduleReference}
                            </ESTypography>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

ESLeftOff.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    classReference: PropTypes.string,
    moduleReference: PropTypes.string,
    label: PropTypes.node,
    resourceType: PropTypes.oneOf([
        'Book',
        'Course',
        'Content',
        'Question',
        'Video',
        'Document',
        'Download',
        'Theme'
    ])
}

ESLeftOff.defaultProps = {
    resourceType: 'Video'
}

export default ESLeftOff
