import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'

import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'

import '../src/Translate'

import './styles.less'
import TableComponent from './TableComponent'
import { DefaultDecotator } from './Decorator'

addDecorator(DefaultDecotator)
addDecorator(withKnobs)
addDecorator(
    withInfo({
        header: false,
        TableComponent,
        source: false,
        inline: true,
        propTablesExclude: [() => 'div', () => 'span'],
        styles: stylesheet => ({
            ...stylesheet,
            propTableHead: {
                display: 'none'
            },
            infoBody: {
                ...stylesheet.infoBody,
                border: 'none',
                margin: '30px 0 0 0',
                padding: 0
            }
        })
    })
)

addParameters({
    options: {
        theme: {
            brandTitle: 'SANAR UI',
            base: 'SANAR'
        }
    }
})

// automatically import all files ending in *.stories.js
const req = require.context('../src/Components', true, /\.stories\.js$/)
function loadStories() {
    req.keys().forEach(req)
}

configure(loadStories, module)
