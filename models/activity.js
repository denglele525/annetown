import {Http} from "../utils/http";

class Activity {

    static async getHomeLocationD() {
        return await Http.request({
            url: '53003/activity',
        })
    }

}

export {
    Activity
}