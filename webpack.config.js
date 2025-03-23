import path from 'path'
const __dirname = import.meta.dirname

export default {
  entry: './src/index.ts', // Your main TypeScript file
  output: {
    filename: 'index.js', // The output file
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'WindBarb', // Expose your library as a global variable
    libraryTarget: 'umd', // Universal Module Definition for browser compatibility
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production', // Minify the output for production use
}
