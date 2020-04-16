import React from 'react'
import TestRenderer from 'react-test-renderer'

import ESJwPlayer from '../'

it('renders correctly', () => {
    const component = (
        <ESJwPlayer
            playerId='playerId'
            playlist='https://cdn.jwplayer.com/v2/media/yp34SRmf'
            playerScript='https://cdn.jwplayer.com/libraries/jX7FSJdG.js'
        />
    )

    const tree = TestRenderer.create(component).toJSON()
    expect(tree).toMatchSnapshot()
})
