import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { selectCampers } from "../../redux/campers/selectors";
import CamperCard from "../../compopnents/Camper/CamperCard";
import Container from "../../compopnents/Container/Container";
import s from "./Catalog.module.scss";

const Catalog = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const campers = useSelector(selectCampers);
  const dispatch = useDispatch();

  const itemRef = useRef(null);

  // download campers
  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  // scroll after adding new campers
  useEffect(() => {
    if (!itemRef.current) return;

    const itemHeight = itemRef.current.offsetHeight;

    window.scrollBy({
      top: itemHeight * 2,
      behavior: "smooth",
    });
  }, [visibleCount]);

  //handlers
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  //JSX
  return (
    <section className={s.catalog}>
      <Container>
        <ul className={s.camper_list}>
          {campers.slice(0, visibleCount).map((camper, index) => (
            <li
              className={s.item}
              key={camper.id}
              ref={index === 0 ? itemRef : null}
            >
              <CamperCard camper={camper} />
            </li>
          ))}
        </ul>

        {/* btn load more */}
        {visibleCount < campers.length && (
          <button
            className={s.btn_load_more}
            type="button"
            aria-label="button to load more"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </Container>
    </section>
  );
};

export default Catalog;
