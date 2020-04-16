import React from 'react'

import { SANBox } from '../../../Atoms/Box'
import { SANTypography } from '../../../Atoms/Typography'
import { SANCommonBadge } from '../../../Atoms/CommonBadge'
import { SANDivider } from '../../../Atoms/Divider'
import { useTranslation } from 'react-i18next'
import {
    SANDisciplineDropdown,
    ISANDisciplineDropdownProps
} from '../../../Molecules/DisciplineDropdown'
import { ISANPlaylistProps, SANPlaylist } from '../../../Molecules/Playlist'
import { SANScroll } from '../../../Atoms/Scroll'

interface ICourse {
    knowledgeArea: string
    name: string
    progress: number
}

export interface ISANClassroomMenuProps {
    course: ICourse
    currentThemeIndex?: number
    totalThemes?: number
    DisciplineDropdownProps?: ISANDisciplineDropdownProps
    PlaylistProps: ISANPlaylistProps
}

const SANClassroomMenu: React.FC<ISANClassroomMenuProps> = ({
    course: { knowledgeArea, name, progress },
    currentThemeIndex,
    totalThemes,
    DisciplineDropdownProps,
    PlaylistProps
}) => {
    const { t } = useTranslation('components')
    return (
        <SANBox height='100%' backgroundColor='grey-solid.8'>
            <SANScroll>
                <SANBox px={4} pt={6}>
                    <SANBox>
                        <SANTypography
                            mb={1}
                            color='white.5'
                            variant='overline'
                        >
                            {knowledgeArea}
                        </SANTypography>
                        <SANTypography
                            mb={1}
                            color='white.10'
                            level={5}
                            strong
                            ellipsis
                        >
                            {name}
                        </SANTypography>
                        <SANBox
                            displayFlex
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <SANTypography
                                strong
                                ellipsis
                                variant='caption'
                                color='white.5'
                            >
                                {t('global.courseProgress')}
                            </SANTypography>
                            <SANCommonBadge
                                count={progress}
                                suffix='%'
                                status='warning'
                            />
                        </SANBox>
                    </SANBox>
                    <SANDivider mt={5} mb={5} backgroundColor='grey.4' />
                    {!!currentThemeIndex && totalThemes > 0 && (
                        <SANBox
                            displayFlex
                            alignItems='center'
                            justifyContent='space-between'
                            color='white.10'
                            mb={2}
                        >
                            <SANTypography
                                transform='uppercase'
                                variant='caption'
                            >
                                {t('global.theme')}
                            </SANTypography>
                            <SANTypography color='white.5' variant='caption'>
                                {currentThemeIndex} / {totalThemes}
                            </SANTypography>
                        </SANBox>
                    )}
                    {!!DisciplineDropdownProps && (
                        <SANDisciplineDropdown
                            onSelect={DisciplineDropdownProps.onSelect}
                            activeItem={DisciplineDropdownProps.activeItem}
                            items={DisciplineDropdownProps.items}
                            loading={DisciplineDropdownProps.loading}
                            progress={DisciplineDropdownProps.progress}
                        />
                    )}
                </SANBox>
                <SANPlaylist
                    loading={PlaylistProps.loading}
                    items={PlaylistProps.items}
                    currentIndex={PlaylistProps.currentIndex}
                    goToResource={PlaylistProps.goToResource}
                />
            </SANScroll>
        </SANBox>
    )
}

export default SANClassroomMenu
