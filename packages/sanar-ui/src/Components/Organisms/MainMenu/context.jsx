import React, {
    useEffect,
    useState,
    createContext,
    useContext,
    forwardRef,
    useImperativeHandle
} from 'react'

import useWindowSize from '../../../Hooks/useWindowSize'

const Context = createContext()

export const useMainMenuContext = () => useContext(Context)

export const MainMenuProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const [theme, setTheme] = useState('primary')
    const [context, setContext] = useState(null)
    const [position, setPosition] = useState('left')
    const [showContinueBar, setShowContinueBar] = useState(false)
    const { width } = useWindowSize()

    useEffect(() => {
        setPosition(width <= 1024 ? 'bottom' : 'left')
    }, [width])

    useEffect(() => {
        if (context === 'classroom') {
            setToggle(false)
            setShowContinueBar(false)
        }
    }, [context])

    const value = {
        position,
        theme,
        setTheme,
        toggle,
        setToggle,
        showContinueBar,
        setShowContinueBar,
        width,
        context,
        setContext
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withMainMenuProvider = Component =>
    forwardRef((props, ref) => {
        return (
            <MainMenuProvider>
                <Component ref={ref} {...props} />
            </MainMenuProvider>
        )
    })
