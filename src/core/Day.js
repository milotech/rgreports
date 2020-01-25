export default class Day {
    constructor(date) {
        this.day = date.getDate().toString();
        this.month = (date.getMonth() + 1).toString();
        this.year = date.getFullYear().toString();

        if(this.day.length === 1)
            this.day = '0' + this.day;
        if(this.month.length === 1)
            this.month = '0' + this.month;
    }

    static createDay(week, dayNum) {
        const day = week * 7 - 2 + dayNum;
        return new Day(new Date(1970, 0, day));
    }

    toString() {
        return `${this.month}.${this.day}.${this.year.slice(2)}`;
    }
}

