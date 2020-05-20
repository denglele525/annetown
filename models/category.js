import {Http} from "../utils/http";

class Category {

    static async getGridCategoryC() {
        return await Http.request({
            url: '53002/category/',
        })
    }

}

export {
    Category
}