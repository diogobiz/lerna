const path = require('path')

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, './')
    })

    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('ts-loader')
            },
            { loader: require.resolve('react-docgen-typescript-loader') }
        ]
    })

    config.module.rules.push({
        test: /.stories.tsx?$/,
        loaders: [
            {
                loader: require.resolve('@storybook/addon-storysource/loader'),
                options: {
                    prettierConfig: {
                        requirePragma: false,
                        printWidth: 120,
                        tabWidth: 2,
                        useTabs: false,
                        semi: false,
                        singleQuote: true,
                        trailingComma: 'none',
                        bracketSpacing: true,
                        jsxBracketSameLine: false,
                        arrowParens: 'always'
                    }
                }
            }
        ],
        enforce: 'pre'
    })

    config.resolve = {
        ...config.resolve,
        alias: {
            Components: path.resolve(__dirname, '../src/Components'),
            Assets: path.resolve(__dirname, '../src/Assets'),
            Theme: path.resolve(__dirname, '../src/Theme')
        }
    }

    config.resolve.extensions.push('.ts', '.tsx')
    return config
}
