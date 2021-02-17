
const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_AGE = "SORT_BY_AGE";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
const LOAD_NEW_PAGE = "LOAD_NEW_PAGE";
const LOAD_EXACT_PAGE = "LOAD_EXACT_PAGE";

export const sortByAge = payload => ({
    type: SORT_BY_AGE,
    payload
});

export const filterByValue = payload => ({
    type: FILTER_BY_VALUE,
    payload
});

export const sortByAlphabet = payload => ({
    type: SORT_BY_ALPHABET,
    payload
});

export const loadData = (payload) => ({
    type: LOAD_DATA,
    payload
});

export const loadNewPage = (payload) => ({
    type: LOAD_NEW_PAGE,
    payload
});

export const loadExactPage = (payload) => ({
    type: LOAD_EXACT_PAGE,
    payload
});