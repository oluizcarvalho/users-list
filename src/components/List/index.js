import CallIcon from '@material-ui/icons/Call';
import React, { useState } from 'react';
import { Table } from "react-bootstrap";
import { connect } from 'react-redux';
import { loadData } from "../../store";
import Header from '../Header';
import Paginator from '../Paginator';

const List = (props) => {
    const [initFunction, setInitFunction] = useState(false);

    const componentDidMount = () => {
        if (!initFunction) {
            const params = new URLSearchParams(window.location.search);
            const pageQueryParam = params.get('page');
            if (!pageQueryParam) {
                window.history.pushState({ page: 1 }, "title 1", "?page=1");
            } else {

            }
            props.dispatch(loadData({ countPerPage: 15 }));
            setInitFunction(true)
        }
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (!initFunction)
        componentDidMount()

    let users = props.state.filteredUsers;

    return (
        <div className="container">
            <Header />
            <Table striped bordered hover>
                <thead>
                    <tr className="bg-primary text-light">
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
                                <td>
                                    <img alt={user.name.first} src={user.picture.thumbnail} srcSet={`${user.picture.thumbnail}`} />
                                </td>
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
        </div>

    );
}

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps)(List);
