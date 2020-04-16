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
            ignore: ['*/.test.ts', 'snapshots', 'tests'],
        },
    },
    plugins: [
        // [
        //     'import',
        //     {
        //         libraryName: 'antd',
        //         libraryDirectory: 'es'
        //     }
        // ],
    ],
    ignore: ['node_modules'],
}
