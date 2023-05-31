import CardsComponent from '../CardsComponent/CardsComponent';
import Nav from '../Nav/Nav';
import Paginated from '../Paginated/Paginated';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home(){
 const [productPerPage] = useState(12);

 const allProducts = useSelector((state) => state.products);
    return(
    <div>
<Nav/>
<Paginated   productPerPage={productPerPage}
            allProducts={allProducts.length}
            paginated={paginated}/>
<CardsComponent/>
    </div>




    )
}