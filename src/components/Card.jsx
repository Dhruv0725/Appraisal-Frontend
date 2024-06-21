import classes from "./Card.module.css";

const Card = ({ children }) => {
  return (
    <div className={classes.card}>
      <div>
        <h1>it s acard</h1>
        {children}
      </div>
    </div>
  );
};

export default Card;
