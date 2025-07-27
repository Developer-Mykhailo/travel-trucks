import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { selectCampers, selectTotal } from "../../redux/campers/selectors";
import { fetchFilteredCampers } from "../../redux/filtered/operations";
import {
  selectFilteredCampers,
  selectFilteredTotal,
} from "../../redux/filtered/selectors";
import CamperCard from "../../compopnents/Camper/CamperCard";
import Container from "../../compopnents/Container/Container";
import FilterPanel from "../../compopnents/FilterPanel/FilterPanel";
import s from "./Catalog.module.scss";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const parseFiltersFromParams = (params) => {
  const filters = {};
  for (const [key, value] of params.entries()) {
    if (key === "page") continue;
    if (value === "true") {
      filters[key] = true;
    } else {
      filters[key] = value;
    }
  }
  return filters;
};

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const filteredCampers = useSelector(selectFilteredCampers);

  const total = useSelector(selectTotal);
  const filteredTotal = useSelector(selectFilteredTotal);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  const filtersFromParams = parseFiltersFromParams(searchParams);

  useEffect(() => {
    const hasFilters = Object.keys(filtersFromParams).length > 0;

    if (hasFilters) {
      dispatch(fetchFilteredCampers({ filters: filtersFromParams, page }));
    } else {
      dispatch(fetchCampers(page));
    }
    // eslint-disable-next-line
  }, [dispatch, searchParams, page]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set("page", nextPage.toString());
      return newParams;
    });

    if (Object.keys(filtersFromParams).length === 0) {
      dispatch(fetchCampers(nextPage));
    } else {
      dispatch(
        fetchFilteredCampers({ filters: filtersFromParams, page: nextPage })
      );
    }
  };

  const handleFilter = async (filters) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === "boolean" && value) {
          params.set(key, "true");
        } else if (typeof value === "string" && value.trim()) {
          params.set(key, value);
        }
      });
      params.set("page", "1");
      setSearchParams(params);
      await dispatch(fetchFilteredCampers({ filters, page: 1 })).unwrap();
    } catch {
      toast.error("Nothing found! Change filters and try again");
    }
  };

  return (
    <section className={s.catalog}>
      <Container>
        <div className={s.catalog_container}>
          <FilterPanel
            handleFilter={handleFilter}
            onFiltersFromParams={parseFiltersFromParams}
          />
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
        {(filteredCampers.length > 0
          ? filteredCampers.length < filteredTotal
          : campers.length < total) && (
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

export default CatalogPage;
