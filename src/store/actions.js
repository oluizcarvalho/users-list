export const sortByAge = payload => ({
    type: 'SORT_BY_AGE',
    payload
});

export const filterByValue = payload => ({
    type: 'ASYNC_FILTER_BY_VALUE',
    payload
});

export const sortByAlphabet = payload => ({
    type: 'SORT_BY_ALPHABET',
    payload
});

export const loadData = (payload) => ({
    type: 'LOAD_DATA',
    payload
});

export const loadNewPage = (payload) => ({
    type: 'LOAD_NEW_PAGE',
    payload
});

export const loadExactPage = (payload) => ({
    type: 'LOAD_EXACT_PAGE',
    payload
});