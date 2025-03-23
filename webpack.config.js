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
  },
  {
    entry: './src/react/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist/react'),
      filename: 'index.esm.js',
      libraryTarget: 'module',
    },
    experiments: {
      outputModule: true,
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
  },
  {
    entry: './src/react/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist/react'),
      filename: 'index.cjs.js',
      libraryTarget: 'commonjs2',
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
  },

  // Main library configurations
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.umd.js',
      path: path.resolve(__dirname, 'dist'),
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
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.esm.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'module',
    },
    experiments: {
      outputModule: true,
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
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.cjs.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
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
