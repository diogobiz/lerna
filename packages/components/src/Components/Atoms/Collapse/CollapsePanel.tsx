import PropTypes from 'prop-types'

import { ESCollapsePanel } from '@sanar/sanar-ui/dist/Components/Atoms/Collapse'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANCollapsePanelProps = PropTypes.InferProps<
    typeof ESCollapsePanel['propTypes']
>

const SANCollapse: SANElement<ISANCollapsePanelProps> = SANStyled(
    ESCollapsePanel
)``

export default SANCollapse
