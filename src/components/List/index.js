import CallIcon from '@material-ui/icons/Call';
import React, { useState } from 'react';
import { Row, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import * as FilterActions from '../../store/actions';
import Header from '../Header';
import LogoKabum from '../Logo';
import Paginator from '../Paginator';
import Photo from '../Photos';


const ListContent = styled.div`
    margin-top: 24px;
    margin-bottom: 24px;
    tr.header {
        color : ${({ theme }) => theme.colors.contrastText};
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;

const List = ({filterStore, loadData}) => {
    const [initFunction, setInitFunction] = useState(false);

    const componentDidMount = () => {
        if (!initFunction) {
            const params = new URLSearchParams(window.location.search);
            const pageQueryParam = params.get('page');
            if (!pageQueryParam) {
                window.history.pushState({ page: 1 }, "title 1", "?page=1");
            } else {

            }
            loadData({ countPerPage: 15 });
            setInitFunction(true)
        }
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (!initFunction)
        componentDidMount()

    let users = filterStore.filteredUsers;

    return (
        <ListContent className="container">
            <LogoKabum />
            <Header />
            <Row />
            <Table striped bordered hover>
                <thead>
                    <tr className="header">
                        <th></th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Telefone</th>
                        <th>Idade</th>
                        <th>Gênero</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.length && users.map(user => (
                            <tr key={user.name.first}>
                                <Photo.Td>
                                    <Photo.User PhotoUser={user.picture.medium}>
                                    </Photo.User>
                                </Photo.Td>
                                <td>
                                    <strong>{capitalizeFirstLetter(user.name.first)}</strong>
                                </td>
                                <td>
                                    <strong>{capitalizeFirstLetter(user.name.last)}</strong>
                                </td>
                                <td>
                                    <CallIcon /><strong>{user.phone}</strong>
                                </td>
                                <td>
                                    <strong>{user.dob.age}</strong>
                                </td>
                                <td>
                                    <strong>{user.gender === 'male' ? 'Homem' : 'Mulher'}</strong>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Paginator />
        </ListContent>

    );
}

const mapStateToProps = state => ({
    filterStore: state.filterStore
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(FilterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List);
