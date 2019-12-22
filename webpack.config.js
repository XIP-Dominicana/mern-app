const path = require('path');

console.log(path.resolve(__dirname, 'src', 'client', 'index.js'));

module.exports = {
    entry: path.resolve(__dirname, 'src', 'client', 'index.js'),
    output: {
        path: path.join(__dirname, 'src', 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use : 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};
