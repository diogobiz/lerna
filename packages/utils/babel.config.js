module.exports = {
    presets: [
        '@babel/preset-react',
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                loose: true,
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
    env: {
        build: {
            ignore: ['*/.test.js', 'snapshots', 'tests'],
        },
    },
    ignore: ['node_modules'],
}
