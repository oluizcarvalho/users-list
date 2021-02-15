import Pagination from 'react-bootstrap/Pagination'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadExactPage, loadNewPage } from "../../store";

export const PaginatorFilter = styled.div`
    display: flex;
    align-itens: center;
    justify-content: space-between;
`;

const Paginator = (props) => {

    const nextPage = () => {
        props.dispatch(loadNewPage({ page: 1 }))
    }

    const previousPage = () => {
        props.dispatch(loadNewPage({ page: -1 }));
    }

    const goToPage = (page) => {
        props.dispatch(loadExactPage({ page }))
    }
    return (
        <PaginatorFilter {...props}>
            <Pagination>
                <Pagination.Prev onClick={() => {
                    previousPage()
                }} />
                {
                    [...Array(props.state.filteredPages)].map((value, index) => (
                        <Pagination.Item key={index}
                            active={props.state.currentPage === index + 1}
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

export default connect(mapStateToProps)(Paginator);

