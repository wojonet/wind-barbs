import path from 'path'
const __dirname = import.meta.dirname

export default [
  // React configurations
  {
    entry: './src/react/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist/react'),
      filename: 'index.umd.js',
      library: 'WindBarbReact',
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
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
                configFile: 'tsconfig.json',
              },
            },
          ],
        },
      ],
    },
    mode: 'production',
  },
  // React native configurations
  {
    entry: './src/react-native/index.tsx',
    output: {
      filename: 'index.umd.js',
      path: path.resolve(__dirname, 'dist/react-native'),
      library: 'WindBarbReactNative',
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
    },
    externals: {
      'react-native': 'react-native',
      react: 'react',
      'react-native-svg': 'react-native-svg',
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
                configFile: 'tsconfig.react-native.json',
              },
            },
          ],
        },
      ],
    },
    mode: 'production',
  },
  // Global library configurations
  {
    entry: './src/global/index.ts',
    output: {
      filename: 'index.umd.js',
      path: path.resolve(__dirname, 'dist/global'),
      library: 'WindBarb',
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    mode: 'production',
  },
]
