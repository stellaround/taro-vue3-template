export default defineAppConfig({
  pages: ['layout/index/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  subpackages: [
    {
      root: 'subcontract',
      pages: ['views/index/subcontract-index'],
    },
  ],
});
