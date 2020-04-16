import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { SANInput } from '../Input'
import { compose, space } from 'styled-system'

const TextArea = styled('textarea')`
    ${compose(space)}
    line-height: 21.6px;
    padding: ${theme('space.sm')};
    height: auto;
    resize: none;
`
interface ISANTextAreaProps {
    [x: string]: any
}

const SANTextArea: React.RefForwardingComponent<
    typeof SANInput,
    ISANTextAreaProps
> = (props, ref) => <SANInput ref={ref} as={TextArea} {...props} />

export default forwardRef(SANTextArea)
