function Main() {
  const name = "Tuan";
  const productList = [
    {
      name: "iPhone 14",
      price: 999,
    },
    {
      name: "iPhone 14 Pro",
      price: 1999,
    },
    {
      name: "iPhone 14 Pro Max",
      price: 2999,
    },
  ];

  const handleBuyProduct = (e, name) => {
    console.log(e.target);
    console.log(`buy ${name}`);
  };

  const notiAhihi = () => {
    console.log("hihi");
  };

  const handleChangeSearchKey = (e) => {
    console.log(e.target.value);
  };

  const renderProductList = () => {
    return productList.map((item, index) => {
      return (
        <div key={index} className="product-item">
          <h2>{item.name}</h2>
          <h3>{item.price}</h3>
          <button onClick={(e) => handleBuyProduct(e, item.name)}>Buy</button>
          <button onClick={() => notiAhihi()}>Ahihi</button>
        </div>
      );
    });
  };

  return (
    <div className="main">
      <div>{name}</div>
      <div>
        <input name="searchKey" onChange={(e) => handleChangeSearchKey(e)} />
      </div>
      <div>{renderProductList()}</div>
    </div>
  );
}

export default Main;
