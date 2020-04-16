import { useContext } from 'react'

import { ThemeContext } from 'styled-components'

export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error('[useTheme]: must be used within a SANThemeProvider')
    }

    return context
}
