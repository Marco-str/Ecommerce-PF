import { useSelector } from "react-redux";

export default function Filters() {
  const products = useSelector(state => state.products)

  // Filtrar productos para eliminar duplicados
  const uniqueCatalogNames = Array.from(new Set(products.map(product => product.CatalogName)));

  return (
    <div>
      <select className="Categories">
        {uniqueCatalogNames.map(catalogName => (
          <option value={catalogName} key={catalogName}>{catalogName}</option>
        ))}
      </select>
    </div>
  )
}
