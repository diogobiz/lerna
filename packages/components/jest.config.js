module.exports = {
    transform: {
        '.(ts|tsx)': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '\\.(css|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            'identity-obj-proxy',
        '.(jpg|jpeg|png|svg)$': 'jest-transform-stub'
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/.storubook/',
        '<rootDir>/_templates/'
    ]
}
