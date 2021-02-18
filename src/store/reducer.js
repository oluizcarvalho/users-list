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

const filterStore = (state = initialState, action) => {
    switch (action.type) {
            case SORT_BY_ALPHABET:
                const sortByAlphabetState = Object.assign({}, state);
                let sortedAlphabetArr = action.payload.direction === "asc" ?
                    sortAsc(state.filteredUsers, 'name', 'first') :
                    sortDesc(state.filteredUsers, 'name', 'first');

                sortByAlphabetState.filteredUsers = sortedAlphabetArr;
                sortByAlphabetState.appliedFilters = addFilterIfNotExists(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);
                sortByAlphabetState.appliedFilters = removeFilter(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);

                return sortByAlphabetState;
        case SORT_BY_AGE:
            let sortByAgeState = Object.assign({}, state);
            let sortedAgeArr = action.payload.direction === "asc" ?
                sortAsc(state.filteredUsers, 'dob', 'age') :
                sortDesc(state.filteredUsers, 'dob', 'age');

            sortByAgeState.filteredUsers = sortedAgeArr;
            sortByAgeState.appliedFilters = addFilterIfNotExists(SORT_BY_ALPHABET, sortByAgeState.appliedFilters);
            sortByAgeState.appliedFilters = removeFilter(SORT_BY_AGE, sortByAgeState.appliedFilters);

            return sortByAgeState;

        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            console.log("🚀 ~ filterStore ~ value", action)
            let value = action.payload.value;
            let filteredValues = state.users.filter(user => {
                return user.name.first.toLowerCase().includes(value) ||
                    user.name.last.toLowerCase().includes(value) || user.phone.includes(value);
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
            let count = db.results.length;
            let countPerPage = action.payload.countPerPage || 20;

            //*round up
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
            
            let loadNewPageState = Object.assign({}, state);
            let addPages = action.payload.page;
            loadNewPageState.currentPage += addPages;

            let perPage = loadNewPageState.countPerPage; //*20 by default

            let nextUsers;
            if (addPages === 1){
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount;

                loadNewPageState.currentCount += loadNewPageState.countPerPage;
                nextUsers = loadNewPageState.users.slice(lowerCount, upperCount);
            }

            if (addPages ===-1){
                let upperCount = loadNewPageState.currentCount; //*total
                let lowerCount = loadNewPageState.currentCount - perPage; //*20

                loadNewPageState.currentCount -= loadNewPageState.countPerPage;
                nextUsers = loadNewPageState.users.slice(lowerCount - perPage, upperCount - perPage);
            }

            loadNewPageState.filteredUsers = nextUsers;

            window.history.pushState({page: 1}, "title 1", `?page=${loadNewPageState.currentPage}`); // !dont use on production
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
            window.history.pushState({page: 1}, "title 1", `?page=${exactPageState.currentPage}`);  // !dont use on production

            return exactPageState;

        default:
            return state;

    }
};

export default filterStore;

function sortAsc(arr, field, field1) {
    return arr.sort(function (a, b) {
        if (a[field][field1] > b[field][field1]) return 1;

        if (b[field][field1]> a[field][field1]) return -1;

        return 0;
    })
}

function sortDesc(arr, field, field1) {
    return arr.sort(function (a, b) {
        if (a[field][field1] > b[field][field1]) return -1;

        if (b[field][field1]> a[field][field1]) return 1;

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
