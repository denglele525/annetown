import {Http} from "./http";

class Paging {

    start
    count
    req
    locker = false
    url
    moreData = true
    accumulator = []

    constructor(req, count = 10, start = 0) {
        this.req = req
        this.start = start
        this.count = count
        this.url = req.url
    }

    async getMoreData() {
        if (!this.moreData) {
            return
        }
        if (!this._getLocker()) {
            return
        }

        const data = await this._actualGetData();
        this._releaseLocker()
        return data
    }

    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }

    async _actualGetData() {
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if (!paging) {
            return null
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: this.accumulator
            }
        }

        this.moreData = Paging._moreData(paging.total_page, paging.pageNum)
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulator(paging.items)
        return {
            empty: false,
            items: Paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    _getCurrentReq() {
        let url = this.url
        console.log('~~~~~' + url)
        console.log('~~~~~' + url.indexOf('?'))
        const params = `start=${this.start}&count=${this.count}`
        //53000/themes?
        if (url.indexOf('?') !== '-1') {
            url += '?' + params
        } else {
            url += '&' + params
        }
        this.req.url = url
        return this.req
    }

    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    _accumulator(items) {
        this.accumulator = this.accumulator.concat(items)
    }
}

export {
    Paging
}