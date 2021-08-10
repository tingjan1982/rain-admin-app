import moment from "moment";

export function formatDate(date) {

    if (date == null) {
        return 'n/a'
    }

    return moment(date).format('YYYY/MM/DD')
}