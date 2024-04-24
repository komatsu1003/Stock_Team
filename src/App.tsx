import * as React from "react";
type Fruit = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};
const App: React.FC = () => {
  const [fruits, setFruits] = React.useState<Fruit[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api");
        const json: React.SetStateAction<Fruit[] | null> = await res.json();
        setFruits(json);
      } catch (e: unknown) {
        /*if (e instance of Error) {
        /*  console.error(e.message);
        }*/
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container fruitsList">
      <h1>Fruits Store</h1>

      {fruits?.map((fruit) => (
        <div key={fruit.id}>
          <figure>
            <img src={fruit.image}alt={fruit.name}/>
          </figure>
          <div className="text">
            <h2>{fruit.name}</h2>
            <p>{`￥${fruit.price}`}</p>
            <p>{`在庫数:${fruit.stock}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default App;