// 国家/省/市  级联options
const address_options = [{
    value: 'zhejiang',
    zh_CN:"中国大陆",en_US:"China",zh_TW:"中國大陸",
    children: [{
      value: 'hangzhou',
      zh_CN:"中国大陆",en_US:"China",zh_TW:"中國大陸",
      children: [{
        value: 'xihu',
        zh_CN:"中国大陆",en_US:"China",zh_TW:"中國大陸",
      }],
    }],
  }, {
    value: 'jiangsu',
    zh_CN:"中国大陆",en_US:"China",zh_TW:"中國大陸",
    children: [{
      value: 'nanjing',
      zh_CN:"中国大陆",en_US:"China",zh_TW:"中國大陸",
      children: [{
        value: 'zhonghuamen',
        zh_CN:"中国大陆",en_US:"China",zh_TW:"中國大陸",
      }],
    }],
  }];
export address_options;