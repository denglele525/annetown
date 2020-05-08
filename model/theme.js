import {Http} from "../utils/http";

class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    themes = []

    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        const themes = await Http.request({
            url: `53000/themes?name=${Theme.locationA}&name=${Theme.locationE}&name=${Theme.locationF}&name=${Theme.locationH}`,
        })
        this.themes = themes.data
    }

     getHomeLocationA() {
        // return await Http.request({
        //     url: '53000/themes/',
        //     data: {
        //         name: Theme.locationA
        //     }
        // })
        return this.themes.find(t => t.name === Theme.locationA)
    }

     getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }

     getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
    }

    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
    }

    static getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.locationE)
    }

    static getThemeSpuByName(name) {
        return Http.request({
            url: `53004/with_spu?name=${name}`,
        })
    }

}

export {
    Theme
}