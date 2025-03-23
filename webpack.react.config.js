import path from 'path'
import { sourceMapsEnabled } from 'process'
const __dirname = import.meta.dirname

export default {
  entry: './src/react/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/react'),
    filename: 'index.js',
    library: 'WindBarbReact', // Expose your library as a global variable
    libraryTarget: 'umd', // Universal Module Definition for browser compatibility
  },
  resolve: {
    extensions: ['.tsx', '.jsx'],
  },
  externals: {
    react: 'react',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',

            options: {
              configFile: 'tsconfig.react.json',
            },
          },
        ],
      },
    ],
  },
  mode: 'production',
}
