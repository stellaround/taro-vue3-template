import prompt from 'prompts';
import chalk from 'chalk';
import { execa } from 'execa';

const main = async () => {
  const { versionType } = await prompt([
    {
      type: 'select',
      name: 'versionType',
      message: '请选择发布版本类型',
      choices: [
        {
          title: '修订版本',
          description: '修订更新是一种用于修复现有错误的更新，它具有向下兼容性',
          value: 'patch',
        },
        {
          title: '次要版本',
          description: '次要更新是指引入新功能的更新，它也向下兼容。',
          value: 'minor',
        },
        {
          title: '主要版本',
          description:
            '主要更新与前几种更新有很大不同，因为它不向下兼容（也就是说，升级到新的主要版本会引入破坏性更改，可能会导致以前版本的代码被破坏）',
          value: 'major',
        },
      ],
    },
  ]);

  if (!versionType) {
    console.log(chalk.hex('#F56C6C')('请选择版本类型 !'));
    console.log();
    process.exit(1);
  }

  const { buildType } = await prompt([
    {
      type: 'multiselect',
      name: 'buildType',
      message: '请选择构建类型',
      choices: [
        {
          title: '微信小程序',
          value: 'weapp',
        },
        {
          title: 'h5',
          value: 'h5',
        },
        {
          title: '百度小程序',
          value: 'swan',
        },
        {
          title: '支付宝小程序',
          value: 'alipay',
        },
        {
          title: '抖音小程序',
          value: 'tt',
        },
        {
          title: 'ReactNative',
          value: 'rn',
        },
        {
          title: '快应用',
          value: 'quickapp',
        },
        {
          title: 'QQ小程序',
          value: 'home',
        },
        {
          title: '京东小程序',
          value: 'jd',
        },
      ],
    },
  ]);

  if (buildType.length === 0) {
    console.log(chalk.hex('#F56C6C')('请选择构建类型 !'));
    console.log();
    process.exit(1);
  }

  const convertBuildTypeName = (buildType: string): string | undefined => {
    switch (buildType) {
      case 'weapp':
        return '微信小程序';
      case 'h5':
        return 'h5';
      case 'swan':
        return '百度小程序';
      case 'alipay':
        return '支付宝小程序';
      case 'tt':
        return '抖音小程序';
      case 'rn':
        return 'ReactNative';
      case 'quickapp':
        return '快应用';
      case 'home':
        return 'QQ';
      default:
    }
  };

  // build dist
  try {
    console.log(chalk.hex('#409EFF')('构建中 ...'));
    for (const item of buildType) {
      await execa('taro', ['build', '--type', item]);
      console.log(chalk.hex('#55D187')(`构建${convertBuildTypeName(item)}成功`));
    }
  } catch (e: any) {
    console.log(e);
    console.log(chalk.hex('#F56C6C')('构建失败 !'));
    process.exit(1);
  }

  // generate changelog
  try {
    console.log(chalk.hex('#409EFF')('生成changelog中 ...'));
    await execa('changelogen', ['--bump', '--release', `--${versionType}`]);
    console.log(chalk.hex('#55D187')('生成changelog成功'));
  } catch (e: any) {
    console.log(e);
    console.log(chalk.hex('#F56C6C')('生成changelog失败 !'));
    process.exit(1);
  }

  // push
  try {
    console.log(chalk.hex('#409EFF')('推送中 ...'));
    await execa('git', ['push']);
    console.log(chalk.hex('#55D187')('推送成功'));
  } catch (e: any) {
    console.log(e);
    console.log(chalk.hex('#F56C6C')('推送失败 !'));
    process.exit(1);
  }
};

main().then(() => {
  // 成功
});
