import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import styles from "./SignUp.module.css";
import { getUserByEmail } from "../../redux/actions/actions";


export default function SignUp() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);


  useEffect(() => {
    dispatch(getUserByEmail(email));
  }, [dispatch, email]);


  const [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: "",
    admin: false
  });

  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    image: "",
    admin: false
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
      name: "",
      phone: "",
      email: "",
      password: "",
      image: "",
      admin: false
    });

    setError({
      name: "",
      phone: "",
      email: "",
      password: "",
      image: "",
      admin: false
    });

    e.target.reset();

    alert("You are Up!");
  };



  return (
    <div className={styles.body}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.nav}>
          <h1>Sign up</h1>
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
                {error.name && <p>{error.name}</p>}
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


//////
// const SignUp = async (req, res) => {
//     try {
//       const {   name, phone, email, password, admin } = req.body;
//       const findUser = await User.findOne({
//         where: { name: name.toLowerCase() },//ver esto de lowerCase
//       });//Solo se fija si existe entre los creados
//       if (findUser) {
//         res.status(400).send("User already exists");
//       } else {
//         let newPokemon = await Pokemon.create({
//           name: name.toLowerCase(),
//           image: image,
//           hp: hp,
//           attack: attack,
//           defense: defense,
//           speed: speed,
//           height: height,
//           weight: weight,
//         });
//         let pokemonType = await Type.findAll({
//           where: {
//             name: types,
//           },
//         });
//         await newPokemon.addTypes(pokemonType);
//         res.status(200).send("Pokemon Created")
//       }
//     } catch (error) {
//       console.log(error)}};