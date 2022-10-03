import numeral from 'numeral'

import moment from 'moment';


const timeStamp = (value) => {
    if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
    }
}

const timeStamp2 = (value) => {
    if (value) {
        return moment(String(value)).format('DD-MMMM-YYYY')
    }
}

const timeStamp3 = (value) => {
    if (value) {
        return moment(String(value)).format('MMMM DD, yyyy | hha')
    }
}

const colorSplit = (value) => {
    // if (value) {
    //     return (String(value)).split(" ").join();
    // }
    return !value ? '' : `${String(value).split(" ").join()}`
}

const timeRange = (value) => {
    if (value) {
        // return moment(String(value)).format('hh:mm A')
        return moment(String(value)).fromNow()
    }

}

const dollarFilter = (value) => {
    if (!value) {
        return '$ 0'
    }

    return numeral(value).format('($0a)')
}
const formatAmount = (value) => {
    return (value).toLocaleString()
}

const createRef = (value) => {
    return !value ? '0' : (value).split("-").join("").slice(0, 9)
}

const dollarFilter2 = (value) => {
    if (!value) {
        return '$ 0'
    }

    return numeral(value).format('($ 0.00a)')
}

const numberFilter = (value) => {
    if (!value) {
        return '0'
    }

    return numeral(value).format('(0.0)')
}

const percentFilter = (value) => {
    return !value ? '0%' : `${Number(value).toFixed(2)}%`
}
const sliceContent = (value) => {
    return !value ? '0' : `${(value).slice(0,100)}...`
}

const sliceHash = (value) => {
    return !value ? '0' : `${(value).slice(0,10)}...`
}
const sliceHash2 = (value) => {
    return !value ? '0' : `${(value).slice(0,25)}...`
}

const percentageFilter = (value) => {
    return !value ? '0%' : `${Number(value).toFixed(2) * 100}%`
}

export {
    dollarFilter,
    percentFilter,
    createRef,
    percentageFilter,
    timeStamp,
    timeStamp2,
    timeRange,
    dollarFilter2,
    sliceHash,
    sliceHash2,
    sliceContent,
    colorSplit,
    formatAmount,
    numberFilter,
    timeStamp3
}