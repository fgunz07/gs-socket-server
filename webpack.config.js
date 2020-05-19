module.exports = {
    entry: './client',
    output: {
        library: 'GSocket',
        path: __dirname,
        filename: 'client.min.js'
    },
    mode: 'production'
};