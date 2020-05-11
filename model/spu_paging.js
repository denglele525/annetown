import {Paging} from "../utils/Paging";

class Spu_paging {
    static async getLatestPaging() {
        return new Paging({
            url: '53005/paging'
        }, 5, 5)
    }
}

export {
    Spu_paging
}