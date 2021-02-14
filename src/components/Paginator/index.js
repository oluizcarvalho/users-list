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
            <div className="App">
                <section className='section'>
                    <div className='container'>
                        <nav className="pagination" role="navigation" aria-label="pagination">
                            <button className="button pagination-previous" onClick={() => {
                                previousPage()
                            }}>Previous
                            </button>
                            <button className="button pagination-next" onClick={() => {
                                nextPage()
                            }}>Next page
                            </button>
                            <ul className="pagination-list">
                                {
                                    [...Array(props.state.filteredPages)].map((value, index) => (
                                        <button
                                            key={index}
                                            className={`button pagination-link ${props.state.currentPage === index + 1 ? "is-current" : ""}`}
                                            aria-label="Page 1"
                                            onClick={() => goToPage(index + 1)}
                                            aria-current="page">
                                            {index + 1}
                                        </button>
                                    ))
                                }
                            </ul>
                        </nav>

                    </div>
                </section>
            </div >
        </PaginatorFilter>
    )
}

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps)(Paginator);

