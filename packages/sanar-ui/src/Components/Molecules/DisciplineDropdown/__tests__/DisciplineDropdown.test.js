import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESDisciplineDropdown from '../'

const items = [
    {
        id: '123',
        name: 'Odontologia Pratica',
        progress: {
            total: 3,
            done: 1,
            status: 'low'
        }
    }
]

it('renders correctly', () => {
    const component = (
        <ESDisciplineDropdown items={items} activeItem={items[0]} />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
