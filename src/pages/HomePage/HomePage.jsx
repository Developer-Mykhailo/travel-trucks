import { Link } from "react-router-dom";
import Container from "../../compopnents/Container/Container";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={s.hero}>
      <Container>
        <div className={s.content}>
          <h1 className={s.title} tabIndex={0}>
            Campers of your dreams
          </h1>
          <p className={s.descr}>
            You can find everything you want in our catalog
          </p>
          <Link
            className={s.view_now}
            to="/catalog"
            aria-label="link to catalog"
          >
            View Now
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
