import { contact } from "../../../portfolio";
import Card from "../../components/Card";
import "./Contact.css";

const Contact = () => {
  if (!contact.email) return null;

  return (
    <section className="section contact center" id="contact">
      <Card>
        <h2 className="section__title">Contact</h2>
        <a href={`mailto:${contact.email}`}>
          <span type="button" className="btn btn--outline">
            Email me
          </span>
        </a>
      </Card>
    </section>
  );
};

export default Contact;
