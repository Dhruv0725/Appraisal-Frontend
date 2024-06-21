import classes from "./CardWithImage.module.css";

const CardWithImage = ({ imageUrl, title, description }) => {
  return (
    <div className={classes.card}>
      <img
        className={classes["card-image"]}
        src={imageUrl}
        alt="Card Background"
      />
      <div className={classes.overlay}>
        <h3 className={classes.cardTitle}>{title}</h3>
        <p className={classes.cardDescription}>{description}</p>
      </div>
    </div>
  );
};

export default CardWithImage;
