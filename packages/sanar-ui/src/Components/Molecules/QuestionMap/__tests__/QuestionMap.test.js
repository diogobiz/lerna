import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESQuestionMap from '../'

const quiz = [
    {
        index: 0,
        status: 'correct'
    },
    {
        index: 1,
        status: 'correct'
    },
    {
        index: 2,
        status: 'wrong'
    },
    {
        index: 3
    },
    {
        index: 4
    }
]

it('renders correctly', () => {
    const component = <ESQuestionMap items={quiz} current={4} />

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
