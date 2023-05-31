import Card from '../Card/Card';
import { useSelector } from "react-redux";
import styles from "./Home.module.css";

export default function CardsComponent (){
    const allProducts = useSelector((state) => state.products);

    return 
    (
        <div className={styles.cards}>
        {   allProducts.map((e) => {
            return (
                <Card name={e.name} categorie={e.categories.slice(0, 2)} images={e.image} id={e.id} key={e.id} className={styles.carddd}/>
            )
        })
        }
    </div>

    )
}