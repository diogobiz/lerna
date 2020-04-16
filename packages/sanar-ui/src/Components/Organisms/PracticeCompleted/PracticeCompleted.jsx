import React, { memo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import ESCard from '../../Molecules/Card'
import ESTypography from '../../Atoms/Typography'
import ESCircleProgress from '../../Atoms/CircleProgress'
import { ESCol, ESRow } from '../../Atoms/Grid'
import ESEvaIcon from '../../Atoms/EvaIcon'

const values = {
    correct: 0,
    wrong: 0,
    skipped: 0,
    sawQuestions: 0,
    elapsedTime: '00:00',
    averageQuestionTime: '00:00'
}

const LineIndicator = ({ time, description }) => (
    <div className='es-practice-completed__content__card__content__info-line'>
        <div className='es-practice-completed__content__card__content__info-line--indicator'>
            <ESTypography variant='body2' strong>
                {time}
            </ESTypography>
        </div>
        <ESTypography variant='body2'>{description}</ESTypography>
    </div>
)

const GraphContent = ({ label, value }) => (
    <div className='mr-no'>
        <ESTypography className='mb-xxs' variant='subtitle2' regular>
            {label}
        </ESTypography>
        <ESTypography level={5}>{value}%</ESTypography>
    </div>
)

const ESPracticeCompleted = memo(
    ({
        className,
        title,
        counterAllLabel,
        values: {
            correct = 0,
            wrong = 0,
            skipped = 0,
            sawQuestions = 0,
            elapsedTime = '00:00',
            averageQuestionTime = '00:00'
        }
    }) => {
        const { t } = useTranslation('sanarui')
        const classes = classNames('es-practice-completed', className)

        return (
            <ESCard className={classes}>
                <div className='es-practice-completed--title'>
                    <ESEvaIcon name='checkmark-circle-outline' />
                    <ESTypography level={3} regular>
                        {title || t('practiceCompleted.title')}
                    </ESTypography>
                </div>
                <div className='es-practice-completed__content'>
                    <div className='es-practice-completed__content__card'>
                        <div className='es-practice-completed__content__card--icon'>
                            <ESEvaIcon size='xlarge' name='clock-outline' />
                        </div>
                        <div className='es-practice-completed__content__card__content'>
                            <LineIndicator
                                time={elapsedTime}
                                description={t('practiceCompleted.elapsedTime')}
                            />
                            <LineIndicator
                                time={averageQuestionTime}
                                description={t(
                                    'practiceCompleted.averageQuestionTime'
                                )}
                            />
                        </div>
                    </div>
                    <ESRow
                        className='es-practice-completed__content__summary'
                        type='flex'
                        align='middle'
                        justify='center'
                        gutter={32}
                    >
                        <ESCol className='es-practice-completed__content__summary__questions d-flex justify-content-center align-items-center'>
                            <ESTypography className='mb-no' regular level={2}>
                                {sawQuestions}
                            </ESTypography>
                            <ESTypography className='es-practice-completed__content__summary__questions--description'>
                                {counterAllLabel ||
                                    t('practiceCompleted.sawQuestions')}
                            </ESTypography>
                        </ESCol>
                        <ESCol className='graphs'>
                            <ESRow
                                gutter={16}
                                type='flex'
                                align='middle'
                                justify='space-between'
                            >
                                <ESCol xs={8} flex={1}>
                                    <ESCircleProgress
                                        strokeWidth={3}
                                        showInfo
                                        format={percent => (
                                            <GraphContent
                                                label={t(
                                                    'practiceCompleted.correct'
                                                )}
                                                value={percent}
                                            />
                                        )}
                                        width={100}
                                        percent={Math.round(correct)}
                                        status='success'
                                    />
                                </ESCol>
                                <ESCol xs={8} flex={1}>
                                    <ESCircleProgress
                                        strokeWidth={3}
                                        showInfo
                                        format={percent => (
                                            <GraphContent
                                                label={t(
                                                    'practiceCompleted.wrong'
                                                )}
                                                value={percent}
                                            />
                                        )}
                                        width={100}
                                        percent={Math.round(wrong)}
                                        status='error'
                                    />
                                </ESCol>
                                <ESCol xs={8} flex={1}>
                                    <ESCircleProgress
                                        strokeWidth={3}
                                        showInfo
                                        format={percent => (
                                            <GraphContent
                                                label={t(
                                                    'practiceCompleted.skipped'
                                                )}
                                                value={percent}
                                            />
                                        )}
                                        width={100}
                                        percent={Math.round(skipped)}
                                        status='normal'
                                    />
                                </ESCol>
                            </ESRow>
                        </ESCol>
                    </ESRow>
                </div>
            </ESCard>
        )
    }
)

ESPracticeCompleted.propTypes = {
    className: PropTypes.string,
    values: PropTypes.shape({
        correct: PropTypes.number,
        wrong: PropTypes.number,
        skipped: PropTypes.number,
        sawQuestions: PropTypes.number,
        elapsedTime: PropTypes.string,
        averageQuestionTime: PropTypes.string
    })
}
ESPracticeCompleted.defaultProps = {
    values
}

export default ESPracticeCompleted
