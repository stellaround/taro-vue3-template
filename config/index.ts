import Components from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/auto-import-resolver';
import AutoImport from 'unplugin-auto-import/webpack';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const args = process.argv;
const isOpenDevTools = args.includes('--devtools');

const config = {
  projectName: 'frame-taro',
  date: '2024-4-16',
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375;
    }
    // 设计稿尺寸
    return 375;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: isOpenDevTools ? ['@tarojs/plugin-html', '@tarojs/plugin-vue-devtools'] : ['@tarojs/plugin-html'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
  sass: {
    data: '@import "@nutui/nutui-taro/dist/styles/variables.scss";',
  },
  mini: {
    webpackChain(chain) {
      chain.module
        .rule('svg')
        .test(/\.svg$/)
        .type('asset/source');
      chain.module
        .rule('vueFiles')
        .test(/\.vue$/) // 匹配.vue文件
        .include.add(path.resolve(__dirname, '../src/views')) // 你的 Vue 文件夹路径
        .end()
        .use('@stellaround/convert-vue-scoped')
        .loader('@stellaround/convert-vue-scoped');
      chain.plugin('unplugin-vue-components').use(
        Components({
          dirs: ['src'],
          resolvers: [
            NutUIResolver({
              importStyle: 'sass',
              taro: true,
            }),
          ],
          dts: 'types/components.d.ts',
          extensions: ['vue'],
        }),
      );
      chain.plugin('unplugin-auto-import').use(
        AutoImport({
          imports: [
            'vue',
            'vue-router',
            'pinia',
            {
              '@tarojs/taro': ['showToast'],
            },
          ],
          dts: 'types/auto-imports.d.ts',
          dirs: ['src/stores', 'src/composables/**', 'src/utils'],
        }),
      );
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader'),
                },
              },
            },
          },
        },
      });
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // pxtransform 配置项，参考尺寸章节
          selectorBlackList: ['body'],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    imageUrlLoaderOption: {
      limit: 5000,
      exclude: [path.resolve(__dirname, '../src/assets/icons')],
      name: 'static/images/[name].[hash:8].[ext]',
    },
  },
  h5: {
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            // 覆盖 Taro 默认的图片加载配置
            image: {
              test: /\.(png|jpe?g|gif|bpm|webp)(\?.*)?$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    name: path.resolve(__dirname, 'images/[name].[ext]'),
                  },
                },
              ],
            },
            // 使用 svg-sprite-loader 的配置
            'svg-loader': {
              test: /.svg$/,
              use: [
                {
                  loader: 'svg-sprite-loader',
                  options: {
                    symbolId: 'icon-[name]',
                  },
                },
                {
                  loader: 'svgo-loader',
                  options: {},
                },
              ],
            },
          },
        },
      });
      chain.plugin('unplugin-vue-components').use(
        Components({
          dirs: ['src'],
          resolvers: [
            NutUIResolver({
              importStyle: 'sass',
              taro: true,
            }),
          ],
          dts: 'types/components.d.ts',
          extensions: ['vue'],
        }),
      );
      chain.plugin('unplugin-auto-import').use(
        AutoImport({
          imports: [
            'vue',
            'vue-router',
            'pinia',
            {
              '@tarojs/taro': ['showToast'],
            },
          ],
          dts: 'types/auto-imports.d.ts',
          dirs: ['src/stores', 'src/composables/**', 'src/utils'],
        }),
      );
    },
    imageUrlLoaderOption: {
      limit: 5000,
      exclude: [path.resolve(__dirname, '../src/assets/icons')],
      name: 'static/images/[name].[hash:8].[ext]',
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      pxtransform: {
        enable: true,
        config: {
          targetUnit: 'vw',
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'https://getman.cn/mock',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return merge({}, config, require('./dev'));
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return merge({}, config, require('./prod'));
};
