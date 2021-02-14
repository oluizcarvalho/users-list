import styled from 'styled-components';
import { connect } from 'react-redux';
import { filterByValue, sortByAlphabet, sortByAge } from "../../store";


export const HeaderFilter = styled.header`
    display: flex;
    align-itens: center;
    justify-content: space-between;
`;

const Header = (props) => {
    const filterByInput = (e) => {
        let input = e.target.value;
        props.dispatch(filterByValue({ value: input }))
    }

    const sortByInput = (e) => {
        let value = e.target.value;
        let direction = value.endsWith('asc') ? "asc" : "desc";

        if (value.startsWith('age')) {
            props.dispatch(sortByAge({ direction }))
        } else {
            props.dispatch(sortByAlphabet({ direction }));
        }
    }
    return (
        <HeaderFilter {...props}>
            <div>
                <section className='section'>
                    <div className='container'>
                        <div>
                            <div className="field is-grouped" style={{ alignItems: "center" }}>
                                <div className="control">
                                    <div className="select">
                                        <select defaultValue="" onChange={e => {
                                            sortByInput(e)
                                        }}>
                                            <option value="" disabled>Sort by</option>

                                            <option value='alphabet_asc'>Name - A-Z</option>
                                            <option value='alphabet_desc'>Name - Z-A</option>

                                            <option value='price_asc'>Age - Lowest to Highest</option>
                                            <option value='price_desc'>Age - Highest to Lowest</option>

                                        </select>
                                    </div>
                                </div>

                                <div className='control' style={{ minWidth: "300px" }}>
                                    <input onChange={e => {
                                        filterByInput(e);
                                    }} style={{ width: "100%" }} placeholder='Filter by' type='text' />
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        </HeaderFilter>
    )
}

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps)(Header);