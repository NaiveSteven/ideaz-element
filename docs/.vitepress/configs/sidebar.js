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
            {
              text: 'Crud 增删改查',
              items: [
                {
                  text: '常规使用',
                  link: '/components/crud',
                },
                {
                  text: 'Api配置',
                  link: '/components/crud-api',
                },
                {
                  text: '表格配置',
                  link: '/components/crud-table',
                },
                {
                  text: '查询表单配置',
                  link: '/components/crud-form',
                },
                {
                  text: '新增编辑配置',
                  link: '/components/crud-cu',
                },
              ],
            },
          ],
        },
        {
          text: '反馈',
          items: [
            {
              text: 'Dialog 弹窗',
              link: '/components/dialog',
            },
            {
              text: 'FullScreen 全屏',
              link: '/components/full-screen',
            },
          ],
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
