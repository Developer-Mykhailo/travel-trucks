import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/camperDetails/operation";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { selectCamperDetails } from "../../redux/camperDetails/selectors";
import Container from "../../compopnents/Container/Container";

import StarIcon from "../../assets/catalogSvg/star.svg?react";
import MapIcon from "../../assets/catalogSvg/map.svg?react";
import clsx from "clsx";
import FormReservation from "../../compopnents/FormReservation/FormReservation";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import s from "./CamperDetailsPage.module.scss";
import Loader from "../../compopnents/Loader/Loader";

const CamperDetailsPage = () => {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamperDetails);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (!camper) {
    return <Loader />; // wait for loading
  }

  const { name, price, reviews, rating, location, gallery, form } = camper;

  //JSX
  return (
    <div>
      <section className={s.camper_section}>
        <Container>
          <div className={s.camper_info}>
            <h1 className={s.title}>{name}</h1>
            <div className={s.reviews_location}>
              <p className={s.reviews}>
                <StarIcon />
                {rating}({reviews.length} Reviews)
              </p>
              <p className={s.location}>
                <MapIcon className={s.map_icon} />
                {location}
              </p>
            </div>
            <span className={s.price}>&#x20AC;{price.toFixed(2)}</span>
          </div>

          <ul className={s.image_list}>
            {gallery.map((photo, index) => (
              <li key={photo.thumb}>
                <div
                  className={s.img_box}
                  onClick={() => {
                    setOpen(true);
                    setPhotoIndex(index);
                  }}
                >
                  <img src={photo.thumb} alt={form} />
                </div>
              </li>
            ))}
          </ul>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={gallery.map((photo) => ({ src: photo.original }))}
            index={photoIndex}
          />

          <p className={s.descr}>
            Embrace simplicity and freedom with the Mavericks panel truck, an
            ideal choice for solo travelers or couples seeking a compact and
            efficient way to explore the open roads. This no-frills yet reliable
            panel truck offers the essentials for a comfortable journey, making
            it the perfect companion for those who value simplicity and
            functionality.
          </p>
        </Container>
      </section>

      <section className={s.extra_section}>
        <Container>
          <div className={s.more_info}>
            <nav className={s.nav_links}>
              <ul>
                <li>
                  <NavLink
                    to="features"
                    className={({ isActive }) =>
                      clsx(s.link, isActive && s.active)
                    }
                  >
                    Features
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="reviews"
                    className={({ isActive }) =>
                      clsx(s.link, isActive && s.active)
                    }
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className={s.extra_blocks}>
            <div className={s.features_reviews_block}>
              <Outlet context={{ camper }} />
            </div>

            <div className={s.form_block}>
              <p>Book your campervan now</p>
              <p>Stay connected! We are always ready to help you.</p>
              <FormReservation />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CamperDetailsPage;
