import React from 'react'
import { SANBox } from '../../../Atoms/Box'
import { SANButton } from '../../../Atoms/Button'
import { SANEvaIcon } from '../../../Atoms/EvaIcon'
import { SANTypography } from '../../../Atoms/Typography'
import { useTranslation } from 'react-i18next'

export interface ISANClassroomMenuHeaderProps {
    onBack: () => void
    onClose: () => void
}

const SANClassroomMenuHeader: React.FC<ISANClassroomMenuHeaderProps> = ({
    onBack,
    onClose
}) => {
    const { t } = useTranslation('components')
    return (
        <SANBox
            borderBottom='1px solid'
            borderColor='grey.4'
            displayFlex
            py={2}
            alignItems='center'
            justifyContent='space-between'
            color='white.7'
        >
            <SANButton onClick={onBack} variant='text' uppercase color='white'>
                <SANEvaIcon size='large' name='arrow-back-outline' />
                <SANTypography ml={1} variant='caption' color='white.7'>
                    {t('global.goToBegin')}
                </SANTypography>
            </SANButton>
            <SANButton variant='text' uppercase onClick={onClose}>
                <SANEvaIcon size='large' color='white.7' name='close-outline' />
            </SANButton>
        </SANBox>
    )
}

export default SANClassroomMenuHeader
