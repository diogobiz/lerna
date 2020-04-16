import React from 'react'

import { SANThemeProvider, SANThemeCreateTheme } from '../src'

const defaultStyle = {
    padding: 20,
    minHeight: '200px',
    backgroundColor: '#f7f8f9',
}

const theme = SANThemeCreateTheme({})

export const DefaultDecotator = (story, { parameters }) => (
    <div
        style={
            parameters.style
                ? {
                      ...defaultStyle,
                      ...parameters.style,
                  }
                : defaultStyle
        }
    >
        <SANThemeProvider theme={theme}>{story()}</SANThemeProvider>
    </div>
)
