module.exports = {
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                loose: true,
                targets: {
                    node: 'current'
                }
            }
        ]
    ],
    env: {
        build: {
            ignore: ['*/.test.js', 'snapshots', 'tests']
        }
    },
    // plugins: [
    //     [
    //         'import',
    //         {
    //             libraryName: 'antd',
    //             libraryDirectory: 'es'
    //         }
    //     ]
    // ],
    ignore: ['node_modules']
}
