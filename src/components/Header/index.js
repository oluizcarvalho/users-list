import styled from 'styled-components';
import { connect } from 'react-redux';
import { filterByValue, sortByAlphabet, sortByAge } from "../../store";
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'

export const HeaderFilter = styled.header`
    margin-top: 20px;
`;

const Header = (props) => {
    const filterByInput = (e) => {
        let input = e.target.value;
        props.dispatch(filterByValue({ value: input }))
    }

    const sortByInput = (e) => {
        const value = e;
        let direction = value.endsWith('asc') ? "asc" : "desc"; //*compare string 

        if (value.startsWith('age')) {
            props.dispatch(sortByAge({ direction }))
        } else {
            props.dispatch(sortByAlphabet({ direction }));
        }
    }
    return (
        <HeaderFilter {...props}>
            <InputGroup className="mb-3">
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title="Filtros"
                    onSelect={e => sortByInput(e)}
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item eventKey='alphabet_asc'>Name - A-Z</Dropdown.Item>
                    <Dropdown.Item eventKey='alphabet_desc'>Name - Z-A</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey='age_asc'>Idade - Crescente</Dropdown.Item>
                    <Dropdown.Item eventKey='age_desc'>Idade - Decrescente</Dropdown.Item>
                </DropdownButton>
                <FormControl className="mb-9" onChange={e => {
                    filterByInput(e);
                }} aria-describedby="basic-addon1" />
            </InputGroup>
        </HeaderFilter>
    )
}

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps)(Header);