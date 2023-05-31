import styles from "./Paginated.module.css";

export default function Paginated({ productPerPage, allProducts, paginated }){
    const pageNumbers = [];
    for(let i = 0; i < Math.ceil(allProducts / productPerPage); i++){
        pageNumbers.push(i + 1);
    };
    return (
        <div className={styles.paginatedBody}>
            {
                pageNumbers &&
                pageNumbers.map(e => (
                        <button onClick={() => paginated(e)} className={styles.pagination} key={e}>{e}</button>
                ))
            }
        </div>
    )
};