import {Http} from "../utils/http";

class Spu {

    static async getDetail(id) {
        return await Http.request({
            url: `53006/spu_list?id=${id}`,
        })
    }

}

export {
    Spu
}