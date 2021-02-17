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

const Paginator = ({state, loadExactPage, loadNewPage }) => {

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
        <PaginatorFilter {...state}>
            <Pagination>
                <Pagination.Prev onClick={() => {
                    previousPage()
                }} />
                {
                    [...Array(state.filteredPages)].map((value, index) => (
                        <Pagination.Item key={index}
                            active={state.currentPage === index + 1}
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

function mapStateToProps(state) {
    return { state };
}
const mapDispatchToProps = dispatch =>
    bindActionCreators(FilterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);

