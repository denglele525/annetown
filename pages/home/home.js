import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {Spu_paging} from "../../models/spu_paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        grid: [],
        activityD: null,
        themeE: null,
        themeESpu: null,
        themeF: null,
        bannerG: null,
        themeH: null,
        spuPaging: null,
        loadingType: 'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initAllData()
        this.initBottomSpuList()
    },

    async initBottomSpuList() {
        const paging = await Spu_paging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }

        wx.lin.renderWaterFlow(data.items, false)
    },

    async initAllData() {
        const theme = new Theme();
        await theme.getThemes()

        const themeA = theme.getHomeLocationA()
        const themeE = theme.getHomeLocationE()
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.data.spu_list.slice(0, 8)
            }
        }

        const themeF = theme.getHomeLocationF()
        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getGridCategoryC()
        const activityD = await Activity.getHomeLocationD()
        const bannerG = await Banner.getHomeLocationG()
        const themeH = theme.getHomeLocationH()

        this.setData({
            themeA,
            bannerB: bannerB.data[0],
            grid: grid.data,
            activityD: activityD.data,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})