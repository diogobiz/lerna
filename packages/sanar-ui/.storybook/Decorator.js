import React from 'react'

const defaultStyle = {
    padding: 20,
    minHeight: '200px',
    backgroundColor: '#f7f8f9'
}

export const DefaultDecotator = (story, { parameters }) => (
    <div
        style={
            parameters.style
                ? {
                      ...defaultStyle,
                      ...parameters.style
                  }
                : defaultStyle
        }
    >
        {story()}
    </div>
)
