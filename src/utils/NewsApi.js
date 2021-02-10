import moment from 'moment' 
import {SEARCHDAYS} from './constants'
const newsApiKey = '30e1c87cd2b74b209adae54026d65f1a';
const today = moment().format()
const weekAgo = moment().subtract(SEARCHDAYS, 'days').format()
console.log(today)
console.log(weekAgo)


class NewsApi {
    constructor({ address, pageSize, from, to }) {
        this._address = address;
        this._pageSize = pageSize;
        this._from = from;
        this._to = to;
    }

    getNewsCardList(searchWord) {
        return fetch(`${this._address}/v2/everything?q=${searchWord}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}`, {
            headers: {
                authorization: newsApiKey,
            },
        }).then((res) =>
            res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        );
    }
}

export const newsApi = new NewsApi({
    address: 'https://newsapi.org',
    pageSize: 100, 
    from: weekAgo,
    to: today,
});