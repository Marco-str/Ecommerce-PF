import React, { useState, useEffect } from 'react';
import { UpgradeUser, listUser, getuser } from '../../actions/index.js';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

const Upgrade = () => {

    const [user, setUser] = useState('');
    const [input, setInput] = useState({
        email: "",
        admin: ""
    });
    const ListUser = useSelector(state => state.listUser)
    const dispatch = useDispatch()

    function previousValues(e) {
        axios.get(`/users/${e}`)
            .then(res => {
                const c = res.data;
                setUser(e)
                setInput({
                    email: c.email,
                    admin: c.admin.toString(),
                });
            })
    }

    useEffect(() => {
        dispatch(listUser());
        dispatch(getuser());
    }, [listUser, getuser])

    function updateUser(e, user) {
        e.preventDefault();
        dispatch(UpgradeUser(user));


        setInput({
            email: "",
            admin: ""
        });
    }



    const filteredUsers = ListUser.filter(user => {
        return (user.email, user.admin.toString())
    })

    return (
        <form onSubmit={(e) => updateUser(e, user)}>
            <div>
                <select name="user" onChange={(e) => previousValues(e.target.value)}>
                    <option value="" selected="true">Buscar</option>
                    {filteredUsers && filteredUsers.map(u => {
                        return <option value={u.id} >{u.email}</option>
                    })}
                </select>
                    <input type="submit"  value="Hacer/quitar Administrador"/>
            </div>
        </form>
    )
}


export default Upgrade;