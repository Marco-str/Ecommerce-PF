import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import styles from "./Login.module.css";
import { getUserByEmail } from "../../redux/actions/actions";


export default function Login() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);


  useEffect(() => {
    dispatch(getUserByEmail(email));
  }, [dispatch, email]);


  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.category.length > 2) {
      return alert("Choose only two types");
    }

    if (input.category.length === 0) {
      return alert("Select a Category");
    }

    // dispatch(validateUser(input));

    setInput({
      email: "",
      password: "",
    });

    setError({
      email: "",
      password: "",
    });

    e.target.reset();

    alert("You are in!");
  };



  return (
    <div className={styles.body}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.nav}>
          <h1>Log in</h1>
          <Link to="/">
            <button className={styles.button}>Back</button>
          </Link>
        </div>

          <div className={styles.stats}>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="email"
                  name="email"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.email}
                  onChange={handleInputChange}
                />
                {error.email && <p>{error.email}</p>}
                <span className={styles.placeholder}>Email</span>
              </div>
            </div>


            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="password"
                  name="password"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.password}
                  onChange={handleInputChange}
                />
                <span className={styles.placeholder}>Password</span>
              </div>
            </div>
            
          
          
        </div>
        
      </form>
    </div>
  );
}


// const { Clothes } = require("../db");
// const { Op } = require("sequelize");


// const getUserByEmail = async function (email) {

//   const user = await Clothes.findOne({
//     where: {
//       name: {
//         [Op.like]: `%${email}%`,
//       },
//     },
//   });
  
//   return user;
// };

// module.exports = getUserByEmail;