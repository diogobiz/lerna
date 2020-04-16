import React, {
    useCallback,
    useRef,
    useEffect,
    useState,
    useMemo,
    useImperativeHandle,
    forwardRef
} from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useWindowSize } from '@sanar/utils/dist/Hooks'
import { createDebounce } from '@sanar/utils/dist/Debounce'

import { SANButton } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANScroll } from '../../Atoms/Scroll'
import { SANTypography } from '../../Atoms/Typography'
import { SANInfiniteScrollLoader } from '../../Atoms/InfiniteScroll'

import SANChatEmpty from './Empty'
import { SANChatItem, renderSkeleton, skeletons } from './Item'

const FloatButton = styled(SANBox)`
    transition: all 0.3s linear;
`

const SANInputStyled = styled.div`
    border: none;
    box-shadow: none;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 84px;

    &:focus {
        outline: none;
    }

    &[placeholder]:empty:before {
        content: attr(placeholder);
        color: #555;
    }

    [placeholder]:empty:focus::before {
        content: '';
    }

    /* width */
    ::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 3px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 3px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #999;
    }
`

interface IParams {
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISANChatProps {
    hasMore?: boolean
    loadMore?: () => Promise<any>
    messages: any[]
    onSend?: (value: string, params: IParams) => void
    blocked?: boolean
    loading?: boolean
}

export interface ISANChatRef {
    goScrollBottom: (pos?: number) => void
}

const maxLetters = 400

const SANChat = forwardRef<ISANChatRef, ISANChatProps>(
    ({ hasMore, loadMore, messages, onSend, blocked, loading }, ref) => {
        const { t } = useTranslation('components')
        const { width } = useWindowSize()
        const [submitting, setSubmitting] = useState(false)
        const [hasButton, setHasButton] = useState(false)
        const [inputHeight, setInputHeight] = useState(42)
        const [letterCount, setLetterCount] = useState(0)
        const scrollRef = useRef<any>()
        const inputRef = useRef<any>()

        const handleSend = () => {
            if (letterCount > maxLetters || letterCount === 0) return
            setSubmitting(true)
            !!onSend &&
                onSend(inputRef.current.textContent, {
                    setSubmitting
                })
            setLetterCount(0)
            if (!!inputRef && !!inputRef.current) {
                inputRef.current.textContent = undefined
                inputRef.current.focus()
                setInputHeight(42)
            }
        }

        const handleKeyPress = e => {
            if (e.charCode === 13) {
                e.preventDefault()
                handleSend()
            }
        }

        const goScrollBottom = (pos?: number) => {
            if (!!scrollRef && !!scrollRef.current) {
                scrollRef.current.scrollTo(
                    0,
                    Number(pos) || scrollRef.current.scrollHeight
                )
            }
        }

        const handleScrollInput = () => {
            if (!!inputRef && !!inputRef.current) {
                if (
                    inputRef.current.scrollHeight <= 84 &&
                    !!inputRef.current.textContent &&
                    width < 992
                ) {
                    setInputHeight(inputRef.current.scrollHeight)
                }
                if (!inputRef.current.textContent) {
                    setInputHeight(42)
                }
            }
        }

        const handleScrollMessages = () => {
            if (scrollRef.current.scrollTop <= 60 && hasMore) {
                const position = scrollRef.current.scrollHeight
                loadMore().finally(() => goScrollBottom(position))
            }

            !hasButton && setHasButton(true)
        }

        const handleLetterCount = useCallback(() => {
            if (!!inputRef && !!inputRef.current) {
                setLetterCount(inputRef.current.textContent.length)

                if (!inputRef.current.textContent) {
                    inputRef.current.textContent = undefined
                    setInputHeight(42)
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const debounceCountLetter = createDebounce(handleLetterCount, 250)

        const renderMessage = useCallback(
            (message, index) => (
                <SANChatItem
                    {...message}
                    key={index}
                    mt={index === 0 ? 'md' : '0px'}
                    hasDivider={index < messages.length - 1}
                />
            ),
            [messages]
        )

        const colorCount = useMemo(() => {
            if (letterCount <= 300) {
                return 'grey.6'
            } else if (letterCount > 300 && letterCount <= 350) {
                return 'yellow.1'
            } else if (letterCount > 350 && letterCount <= 400) {
                return 'yellow.2'
            } else {
                return 'error'
            }
        }, [letterCount])

        useEffect(() => {
            goScrollBottom()
        }, [loading])

        useEffect(() => {
            if (!!scrollRef && !!scrollRef.current) {
                scrollRef.current.addEventListener(
                    'scroll',
                    handleScrollMessages
                )
            }
            return () => {
                if (!!scrollRef && !!scrollRef.current) {
                    scrollRef.current.removeEventListener(
                        'scroll',
                        handleScrollMessages
                    )
                }
            }
        }, [scrollRef, messages, hasButton])

        useEffect(() => {
            if (!!inputRef && !!inputRef.current) {
                inputRef.current.addEventListener('input', debounceCountLetter)
            }
            return () => {
                if (!!inputRef && !!inputRef.current) {
                    inputRef.current.removeEventListener(
                        'input',
                        debounceCountLetter
                    )
                }
            }
        }, [inputRef.current])

        const content = useMemo(() => {
            if (loading) {
                return <SANBox mt='lg'>{skeletons.map(renderSkeleton)}</SANBox>
            } else if (!loading && !!messages && !!messages.length) {
                return messages.map(renderMessage)
            } else {
                return <SANChatEmpty />
            }
        }, [loading, messages])

        useImperativeHandle(ref, () => ({
            goScrollBottom: () => goScrollBottom()
        }))

        return (
            <SANBox display='flex' flexDirection='column' minWidth={232}>
                <SANBox
                    bg='grey-solid.1'
                    // flex='1'
                    height='305px'
                    borderRadius='base'
                    position='relative'
                >
                    <SANScroll
                        containerRef={ref => (scrollRef.current = ref)}
                        onYReachEnd={() => setHasButton(false)}
                    >
                        {hasMore && (
                            <SANInfiniteScrollLoader key='chat-loader' />
                        )}
                        {content}
                    </SANScroll>
                    <FloatButton
                        position='absolute'
                        bottom='xs'
                        left='calc(50% - 16px)'
                        opacity={hasButton ? 1 : 0}
                    >
                        <SANButton
                            circle
                            variant='solid'
                            color='primary'
                            size='small'
                            display={!hasButton ? 'none !important' : 'flex'}
                            onClick={goScrollBottom}
                        >
                            <SANEvaIcon name='arrow-downward-outline' />
                        </SANButton>
                    </FloatButton>
                </SANBox>
                <SANBox
                    display={blocked ? 'flex' : 'none'}
                    alignItems='center'
                    justifyContent='center'
                    border='1px solid'
                    borderColor='grey.2'
                    borderBottomRightRadius='base'
                    borderBottomLeftRadius='base'
                    bg='grey-solid.1'
                    py='19.5px'
                >
                    <SANTypography fontSize='md' color='grey.6'>
                        {t('chat.blocked')}
                    </SANTypography>
                </SANBox>
                <SANBox
                    display={!blocked ? 'flex' : 'none'}
                    alignItems='center'
                    justifyContent='space-between'
                    border='1px solid'
                    borderColor='grey.2'
                    borderRadius='base'
                    px='sm'
                    pt='xs'
                    pb='10px'
                    bg='white.10'
                    position='relative'
                >
                    <SANBox width='calc(100% - 35px)'>
                        <SANInputStyled
                            placeholder={t('chat.writeSomething')}
                            contentEditable
                            ref={inputRef}
                            onKeyPress={handleKeyPress}
                            onScroll={handleScrollInput}
                            style={{ height: inputHeight }}
                        />
                    </SANBox>
                    <SANButton
                        circle
                        variant='text'
                        size='xsmall'
                        onClick={handleSend}
                        disabled={
                            loading ||
                            submitting ||
                            letterCount >= maxLetters ||
                            letterCount === 0
                        }
                    >
                        <SANEvaIcon name='paper-plane-outline' />
                    </SANButton>
                    <SANBox position='absolute' bottom='0' right='6px'>
                        <SANTypography
                            fontWeight='bold'
                            fontSize='xs'
                            color={colorCount}
                        >
                            {letterCount}/{maxLetters}
                        </SANTypography>
                    </SANBox>
                </SANBox>
            </SANBox>
        )
    }
)

export default SANChat
