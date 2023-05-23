export default {
  '/api/': getApiSidebar(),
  '/components/': getComponentsSidebar(),
  '/guide/': getGuideSidebar(),
}

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
  ]
}

function getComponentsSidebar() {
  return [
    {
      text: '组件',
      items: [
        {
          text: '布局',
          items: [
            {
              text: 'Grid 栅格',
              link: '/components/grid',
            },
            {
              text: 'Watermark 水印',
              link: '/components/watermark',
            },
          ],
        },
        {
          text: '表单',
          items: [
            {
              text: 'Text 文本',
              link: '/components/text',
            },
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
            {
              text: 'Input 输入框',
              link: '/components/input',
            },
            {
              text: 'TagSelect 标签选择器',
              link: '/components/tag-select',
            },
            {
              text: 'Form 表单',
              link: '/components/form',
            },
            {
              text: 'FilterForm 筛选表单',
              link: '/components/filter-form',
            },
            {
              text: 'CheckCard 多选卡片',
              link: '/components/check-card',
            },
          ],
        },
        {
          text: '数据',
          items: [
            {
              text: 'Descriptions 描述列表',
              link: '/components/descriptions',
            },
            {
              text: 'Table 表格',
              link: '/components/table',
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
  ]
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
  ]
}
