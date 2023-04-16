export default {
  '/api/': getApiSidebar(),
  '/components/': getComponentsSidebar(),
  '/guide/': getGuideSidebar(),
};

function getApiSidebar() {
  return [
    {
      text: '功能',
      collapsible: true,
      items: [
        {
          text: '已实现',
          link: '/api/',
        },
      ],
    },
  ];
}

function getComponentsSidebar() {
  return [
    {
      text: '组件',
      items: [
        {
          text: '表单',
          items: [
            {
              text: 'Checkbox 多选框',
              link: '/components/checkbox',
            },
            {
              text: 'Radio 单选框',
              link: '/components/radio',
            },
            {
              text: 'Select 选择器',
              link: '/components/select',
            },
          ],
        },
        {
          text: 'Button 按钮',
          link: '/components/button',
        },
        {
          text: 'Tabs 标签页',
          link: '/components/tabs',
        },
        {
          text: 'Modal 对话框',
          link: '/components/modal',
        },
        {
          text: 'Tag 标签',
          link: '/components/tag',
        },
        {
          text: 'Vue 引用组件',
          link: '/components/vue',
        },
        {
          text: 'Vue Script',
          link: '/components/vue-script',
        },
      ],
    },
  ];
}

function getGuideSidebar() {
  return [
    {
      text: '指南',
      items: [
        {
          text: '文档1',
          link: '/guide/',
        },
        {
          text: '文档2',
          link: '/guide/button',
        },
        {
          text: '文档3',
          link: '/guide/modal',
        },
      ],
    },
  ];
}
