import './ItemList.styles.css';

const ItemList = props => {
  const { items } = props;

  const returnedItems = [];

  for (const x of items) {
    returnedItems.push(<Item key={`itemKey_${x}`} label={x} />);
  }

  return <div className="item-list">{returnedItems}</div>;
};

const Item = props => {
  const { label } = props;
  return <div className="item">{label}</div>;
};

export default ItemList;
