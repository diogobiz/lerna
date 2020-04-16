import React from 'react'
import TestRenderer from 'react-test-renderer'

import { SANThemeProvider, SANThemeCreateTheme } from '../../../../'
import { SANPage } from '../'

it('renders correctly', () => {
    const component = (
        <SANThemeProvider theme={SANThemeCreateTheme({})}>
            <SANPage>Content</SANPage>
        </SANThemeProvider>
    )
    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
