import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { selectCampers, selectTotal } from "../../redux/campers/selectors";
import { fetchFilteredCampers } from "../../redux/filtered/operations";
import {
  selectFilteredCampers,
  selectFilteredTotal,
  selectFilters,
} from "../../redux/filtered/selectors";
import CamperCard from "../../compopnents/Camper/CamperCard";
import Container from "../../compopnents/Container/Container";
import FilterPanel from "../../compopnents/FilterPanel/FilterPanel";
import s from "./Catalog.module.scss";

const Catalog = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);

  const filteredCampers = useSelector(selectFilteredCampers);
  const filters = useSelector(selectFilters);

  const total = useSelector(selectTotal);
  const filteredTotal = useSelector(selectFilteredTotal);

  const [page, setPage] = useState(1);

  // download campers
  useEffect(() => {
    if (campers.length === 0) dispatch(fetchCampers(page));
  }, [dispatch, campers.length, page]);

  //handlers
  const handleLoadMore = () => {
    const nextPage = page + 1;
    if (!filters) {
      setPage(nextPage);
      dispatch(fetchCampers(nextPage));
    } else {
      setPage(nextPage);
      dispatch(fetchFilteredCampers({ filters, page: nextPage }));
    }
  };

  const handleFilter = (filters) => {
    dispatch(fetchFilteredCampers({ filters, page: 1 }));
    setPage(1);
  };

  //JSX
  return (
    <section className={s.catalog}>
      <Container>
        <div className={s.catalog_container}>
          <FilterPanel handleFilter={handleFilter} />

          <ul className={s.camper_list}>
            {(filteredCampers.length > 0 ? filteredCampers : campers).map(
              (camper) => (
                <li className={s.item} key={camper.id}>
                  <CamperCard camper={camper} />
                </li>
              )
            )}
          </ul>
        </div>

        {(
          filteredCampers.length > 0
            ? filteredCampers.length < filteredTotal // check to hide the button
            : campers.length < total
        ) ? (
          <button
            className={s.btn_load_more}
            type="button"
            aria-label="button to load more"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        ) : null}
      </Container>
    </section>
  );
};

export default Catalog;
