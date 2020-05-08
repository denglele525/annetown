// components/hot-list/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        banner: Object,
    },

    observers: {
        'banner': function (banner) {
            if (!banner) {
                return
            }
            if (banner.data[0].items.length === 0) {
                return
            }
            const left = banner.data[0].items.find(item => item.name === 'left')
            const rightTop = banner.data[0].items.find(item => item.name === 'right-top')
            const rightBottom = banner.data[0].items.find(item => item.name === 'right-bottom')
            this.setData({
                left,
                rightTop,
                rightBottom
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {}
})
