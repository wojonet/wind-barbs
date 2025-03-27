import path from 'path'
const __dirname = import.meta.dirname

export default [
  // umd configurations
  {
    entry: {
      './src/react/index.umd.js': './src/react/index.tsx',
      './src/global/index.umd.js': './src/global/index.ts',
      './src/index.umd.js': './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: pathData => {
        return pathData.chunk.name.replace('./src/', '')
      },
      library: 'WindBarb',
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
  // esm configurations
  {
    entry: {
      './src/react/index.esm.js': './src/react/index.tsx',
      './src/global/index.esm.js': './src/global/index.ts',
      './src/index.esm.js': './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: pathData => {
        return pathData.chunk.name.replace('./src/', '')
      },
      library: {
        type: 'module',
      },
    },
    resolve: {
      extensions: ['.tsx', '.jsx', '.ts', '.js'],
    },
    experiments: {
      outputModule: true,
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
]
