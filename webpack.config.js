const path = require('path');


module.exports = {
    entry: {
        index: './src/index.js',
        projects: './src/projects.js',
  
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};