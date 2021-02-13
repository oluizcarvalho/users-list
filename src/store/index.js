import db from "../assets/db.json"
const initialState = {
    appliedFilters: []
};

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

const filterStore = (state = initialState, action) => {
    switch (action.type) {
            case SORT_BY_ALPHABET:
                const sortByAlphabetState = Object.assign({}, state);
                let sortedAlphabetArr = action.payload.direction === "asc" ?
                    sortAsc(state.filteredUsers, 'name') :
                    sortDesc(state.filteredUsers, 'name');

                sortByAlphabetState.filteredUsers = sortedAlphabetArr;
                sortByAlphabetState.appliedFilters = addFilterIfNotExists(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);
                sortByAlphabetState.appliedFilters = removeFilter(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);

                return sortByAlphabetState;
        case SORT_BY_AGE:
            let sortByPriceState = Object.assign({}, state);
            let sortedPriceArr = action.payload.direction === "asc" ?
                sortAsc(state.filteredUsers, 'age') :
                sortDesc(state.filteredUsers, 'age');

            sortByPriceState.filteredUsers = sortedPriceArr;
            sortByPriceState.appliedFilters = addFilterIfNotExists(SORT_BY_ALPHABET, sortByPriceState.appliedFilters);
            sortByPriceState.appliedFilters = removeFilter(SORT_BY_AGE, sortByPriceState.appliedFilters);

            return sortByPriceState;

        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let filteredValues = state.users.filter(user => {
                return user.name.first.toLowerCase().includes(value) ||
                    user.name.last.toLowerCase().includes(value);
            });

            let appliedFilters = state.appliedFilters;

            if (value) {
                appliedFilters = addFilterIfNotExists(FILTER_BY_VALUE, appliedFilters);

                newState.filteredUsers = filteredValues;
                newState.filteredCount = newState.filteredUsers.length;
                newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);

            } else {
                appliedFilters = removeFilter(FILTER_BY_VALUE, appliedFilters);

                if (appliedFilters.length === 0) {
                    newState.filteredUsers = newState.users;
                    newState.filteredCount = newState.filteredUsers.length;
                    newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);
                }
            }
            return newState;
        case LOAD_DATA:
            let count = action.payload.count;
            let countPerPage = action.payload.countPerPage || 20;

            //round up
            let totalPages = Math.ceil(count / countPerPage);

            let users = db.results;
            return {
                ...state,
                users,
                filteredUsers: users.slice(0, countPerPage),
                currentCount: countPerPage,
                countPerPage,
                totalCount: count,
                currentPage: 1,
                totalPages: totalPages,
                filteredPages: totalPages
            };
        case LOAD_NEW_PAGE:
            //Clone the previous state
            let loadNewPageState = Object.assign({}, state);
            //How many pages should be added. Will always be 1 or -1
            let addPages = action.payload.page;
            //add it to the current
            loadNewPageState.currentPage += addPages;

            let perPage = loadNewPageState.countPerPage; //20 by default

            let nextUsers;
            if (addPages === 1){
                //Moving from page 1 to 2 will cause ‘upperCount’ to be 40
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount; //This hasn’t been changed. It will remain 20.

                loadNewPageState.currentCount += loadNewPageState.countPerPage;
                nextUsers = loadNewPageState.users.slice(lowerCount, upperCount);
            }

            if (addPages ===-1){
                let upperCount = loadNewPageState.currentCount; //40
                let lowerCount = loadNewPageState.currentCount - perPage; //20

                loadNewPageState.currentCount -= loadNewPageState.countPerPage;
                nextUsers = loadNewPageState.users.slice(lowerCount - perPage, upperCount - perPage);
            }

            loadNewPageState.filteredUsers = nextUsers;
            // Don't use window.history.pushState() here in production
            // It's better to keep redirections predictable
            window.history.pushState({page: 1}, "title 1", `?page=${loadNewPageState.currentPage}`);
            return loadNewPageState;
        case LOAD_EXACT_PAGE:
            const exactPageState = Object.assign({}, state);
            const exactPage = action.payload.page;
            let upperCountExact = exactPageState.countPerPage * exactPage;
            let lowerCountExact = upperCountExact - exactPageState.countPerPage;

            let exactUser = exactPageState.users.slice(lowerCountExact, upperCountExact);
            exactPageState.filteredUsers = exactUser;
            exactPageState.currentCount = upperCountExact;
            exactPageState.currentPage = exactPage;
            window.history.pushState({page: 1}, "title 1", `?page=${exactPageState.currentPage}`);

            return exactPageState;

        default:
            return state;

    }
};

export default filterStore;

function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return 1;

        if (b[field]> a[field]) return -1;

        return 0;
    })
}

function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return -1;

        if (b[field]> a[field]) return 1;

        return 0;
    })
}

function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index===-1) appliedFilters.push(filter);

    return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}
