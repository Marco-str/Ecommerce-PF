import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../DashBoardAdmin/OrdersUsers.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { getUserAll, deleteUser } from "../../redux/actions/actions.js";
import Swal from 'sweetalert2'

const OrdersUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => {
    return {
      users: state.users,
    };
  });
  const [banButtonMap, setBanButtonMap] = useState({}); // Mapa para almacenar el estado de los botones de banear

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);

  useEffect(() => {
    // Crear el estado inicial de los botones de banear al cargar los usuarios
    const initialButtonMap = {};
    users.forEach((user) => {
      initialButtonMap[user.id] = user.active;
    });
    setBanButtonMap(initialButtonMap);
  }, [users]);

  
  const handleBanUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure ?",
        text: "YOU CAN CHANGE THIS LATER!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want!"
      });
  
      if (result.isConfirmed) {
        const newBanButtonMap = { ...banButtonMap, [id]: !banButtonMap[id] };
        setBanButtonMap(newBanButtonMap);
  
        await axios.put(`/users/${id}`, { active: !banButtonMap[id] });
        Swal.fire("Already!", "The user status has been changed!", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update user", "error");
    }
  };
  

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: 'warning',  
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it´s User Permanently!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire(
          'Deleted!',
          'The User has been deleted.',
          'success'
        )
      }
    })
  };


  return (
    <>
    <div className={style.container}>

      <div>
        <h1 className={style.hTitle}>Usuarios registrados</h1>
          <table className={style.table}>
            <thead className={style.arriba}>
              <tr className={style.tr_container}>
                <th>ID</th><th></th> <th>Nombre</th> <th></th> <th>Email</th> <th></th> <th>Bann</th> <th></th> <th>Delete</th>
              </tr>
            </thead>
            <tbody className={style.tbody_container}>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td></td>
                  <td>{user.name}</td>
                  <td></td>
                  <td>{user.email}</td>
                  <td></td>
                    <td>
                    {/* <button className={`btn ${banButtonMap[user.id] ? "btn-success" : "btn-warning"}`} onClick={() => handleBanUser(user.id)}> */}
                    <button className={style.buton_bann} onClick={() => handleBanUser(user.id)}>
                      {banButtonMap[user.id] ? "Ban" : "Unban"}
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button className={style.buttonDanger}onClick={() => handleDeleteUser(user.id)} > Delete User </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
 {/* /*************************************************************************************** * */}
      
      <div className={style.button_container} >
      <Link to="/DashBoardAdmin">
        <button className={style.button}>
          Back <FaArrowLeft className={style.icon}></FaArrowLeft>
        </button>
      </Link>
      </div>

  </div>
  </>
  );
};

export default OrdersUsers;
