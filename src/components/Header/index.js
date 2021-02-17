import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import * as FilterActions from '../../store/actions';
export const HeaderFilter = styled.header`
    margin-top: 20px;
`;

const Header = ({user, filterByValue, sortByAge, sortByAlphabet}) => {
    const filterByInput = (e) => {
        let input = e.target.value;
        filterByValue({ value: input })
    }

    const sortByInput = (e) => {
        const value = e;
        let direction = value.endsWith('asc') ? "asc" : "desc"; //*compare string 

        if (value.startsWith('age')) {
            sortByAge({ direction })
        } else {
            sortByAlphabet({ direction });
        }
    }
    return (
        <HeaderFilter {...user}>
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

const mapStateToProps = state => {
    return { state };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(FilterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header);