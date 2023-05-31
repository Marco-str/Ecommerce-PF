const Card = () => {
  return (
    <div className="card">
      <p>{name}</p>
      <img src={image} alt="" className="img" />
      <p className="diets">{primeraLetraMayusculaYComa(diets)}</p>
    </div>
  );
};
