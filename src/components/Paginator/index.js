import Pagination from 'react-bootstrap/Pagination';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import * as FilterActions from '../../store/actions';
export const PaginatorFilter = styled.div`
    display: flex;
    align-itens: center;
    justify-content: space-between;
`;

const Paginator = ({filterStore, loadExactPage, loadNewPage }) => {

    const nextPage = () => {
        loadNewPage({ page: 1 })
    }

    const previousPage = () => {
        loadNewPage({ page: -1 })
    }

    const goToPage = (page) => {
        loadExactPage({ page })
    }
    return (
        <PaginatorFilter {...filterStore}>
            <Pagination>
                <Pagination.Prev onClick={() => {
                    previousPage()
                }} />
                {
                    [...Array(filterStore.filteredPages)].map((value, index) => (
                        <Pagination.Item key={index}
                            active={filterStore.currentPage === index + 1}
                            onClick={() => goToPage(index + 1)}
                            aria-current="page"
                        >{index + 1}</Pagination.Item>
                    ))}
                <Pagination.Next onClick={() => {
                    nextPage()
                }} />
            </Pagination>
        </PaginatorFilter>
    )
}

const mapStateToProps = state => ({
    filterStore: state.filterStore
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(FilterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);

