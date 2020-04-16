import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESModalTabs from '..'

const content = [
    {
        title: 'Termos de uso',
        content: (
            <iframe src='https://docs.google.com/document/d/e/2PACX-1vRFqbbI9NGXsiuGWIUsjmbFkgI7KH2uaytlHRjDw_o_WQ8w03ce96mwtTeUO31ZepI68Rdrhudx7cbV/pub?embedded=true' />
        )
    }
]

it('renders correctly', () => {
    const component = <ESModalTabs content={content} imageHeader='' />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
