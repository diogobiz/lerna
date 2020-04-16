import { configure, addParameters, addDecorator } from '@storybook/react'

import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'

import '../src/Translate'

import './styles.less'
import { DefaultDecotator } from './Decorator'

addDecorator(DefaultDecotator)
addDecorator(withKnobs)
addDecorator(
    withInfo({
        header: false,
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
            brandTitle: 'SANAR COMPONENTS',
            base: 'SANAR'
        }
    }
})

const req = require['context']('../src/Components', true, /\.stories\.tsx?$/)
function loadStories() {
    req.keys().forEach(req)
}
configure(loadStories, module)
