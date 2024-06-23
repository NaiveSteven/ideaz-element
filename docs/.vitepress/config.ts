import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  // lang: 'en-US',
  title: ' ',
  description: '更适合中后台的业务组件库。',
  lastUpdated: true,
  // eslint-disable-next-line node/prefer-global/process
  base: process.env.BASE || '/',
  appearance: false,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  markdown: {
    headers: {
      level: [0, 0],
    },
    // theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => {
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss',
      })
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.svg',
    // algolia: {
    //   appId: 'X51HWTCQJJ',
    //   apiKey: 'ca20f15eb8a667898b65d13f4213ae3d',
    //   indexName: 'vitepress-demo',
    // },
    nav: [
      { text: '指南', link: '/guide/start', activeMatch: '^/guide/' },
      { text: '组件', link: '/components/checkbox', activeMatch: '^/components/' },
      {
        text: '更新日志',
        link: 'https://github.com/NaiveSteven/ideaz-element/commits/main/',
      },
    ],
    sidebar: {
      '/components/': [
        {
          text: '组件',
          items: [
            // {
            //   text: '布局',
            //   items: [
            //     {
            //       text: 'Grid 栅格',
            //       link: '/components/grid',
            //     },
            //     {
            //       text: 'Watermark 水印',
            //       link: '/components/watermark',
            //     },
            //   ],
            // },
            {
              text: '表单',
              items: [
                // {
                //   text: 'Text 文本',
                //   link: '/components/text',
                // },
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
                  text: 'CheckCard 多选卡片',
                  link: '/components/check-card',
                },
                {
                  text: 'FilterForm 筛选表单',
                  link: '/components/filter-form',
                },
                {
                  text: 'Form 表单',
                  items: [
                    {
                      text: '常规使用',
                      link: '/components/form',
                    },
                    {
                      text: '组表单',
                      link: '/components/form-group',
                    },
                    {
                      text: '折叠表单',
                      link: '/components/form-collapse',
                    },
                    {
                      text: '数组表单',
                      link: '/components/form-array',
                    },
                    {
                      text: '步骤表单',
                      link: '/components/form-step',
                    },
                  ],
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
                    {
                      text: '查看配置',
                      link: '/components/crud-view',
                    },
                    {
                      text: '删除配置',
                      link: '/components/crud-delete',
                    },
                    {
                      text: 'Api配置',
                      link: '/components/crud-api',
                    },
                    {
                      text: '插槽',
                      link: '/components/crud-slot',
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
      ],
      '/guide/': [
        {
          text: '指南',
          items: [
            {
              text: '安装',
              link: '/guide/install',
            },
            {
              text: '快速上手',
              link: '/guide/start',
            },
            {
              text: '更新日志',
              link: '/guide/changelog',
            },
          ],
        },
        {
          text: '开发',
          items: [
            {
              text: '开发指南',
              link: '/guide/dev',
            },
          ],
        },
      ],
    },

    editLink: {
      pattern:
        'https://github.com/NaiveSteven/ideaz-element/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/NaiveSteven/ideaz-element' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present NaiveSteven',
    },
  },
})
