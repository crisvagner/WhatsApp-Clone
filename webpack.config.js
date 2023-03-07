const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist',
        filename: 'bundle.js'
    }
};