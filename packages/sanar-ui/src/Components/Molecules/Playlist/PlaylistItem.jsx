import React, { useMemo, memo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'

import { esUtilConvertSecondsToTime } from '../../../Util/Date'

const icons = {
    Video: 'play-circle-outline',
    Document: 'book-open-outline',
    Download: 'download-outline',
    Quiz: 'edit-outline'
}

const ESPlaylistItem = memo(({ className, index, item, current, onClick }) => {
    const downloadToDocument = resourceType =>
        resourceType === 'Download' ? 'Document' : resourceType

    const { title, progress, durationInSeconds } = useMemo(
        () =>
            item.hasType
                ? item[downloadToDocument(item.resource_type).toLowerCase()]
                : item,
        [item]
    )
    const classes = classNames(
        'es-playlist-list__item',
        {
            'es-playlist-list__item--finish':
                (progress && progress.percentage === 100) || item.completed,
            'es-playlist-list__item--current': current
        },
        className
    )

    const icon = useMemo(() => {
        if (item.hasType) {
            return item.icon ? (
                item.icon
            ) : (
                <ESEvaIcon
                    size='large'
                    name={icons[item.resource_type] || 'play-circle-outline'}
                    className='icon'
                />
            )
        }
        return null
    }, [item])

    return (
        <Tooltip title={title} placement='topLeft' mouseEnterDelay={0.3}>
            <div className={classes} onClick={() => onClick(item)}>
                <div className='d-flex align-items-center w-100'>
                    <ESTypography
                        variant='overline'
                        className={classNames('index', {
                            'no-type': !item.hasType
                        })}
                    >
                        {index + 1}
                    </ESTypography>
                    {icon}
                    <ESTypography
                        ellipsis
                        variant='subtitle2'
                        className={classNames('description', {
                            'description--time': durationInSeconds || item.extra
                        })}
                    >
                        {title}
                    </ESTypography>
                </div>
                {!!durationInSeconds && (
                    <ESTypography variant='overline' className='time'>
                        {esUtilConvertSecondsToTime(durationInSeconds)}
                    </ESTypography>
                )}
                {!!item.extra && <span className='time'>{item.extra}</span>}
            </div>
        </Tooltip>
    )
})

ESPlaylistItem.propTypes = {
    className: PropTypes.string,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(Object.keys(icons)),
    description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    time: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    current: PropTypes.bool
}
ESPlaylistItem.defaultProps = {
    hasType: true
}

export default ESPlaylistItem
