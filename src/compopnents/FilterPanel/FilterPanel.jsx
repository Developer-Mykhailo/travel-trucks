import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/filtered/slice";
import { selectFilters } from "../../redux/filtered/selectors";

import Map_icon from "../../assets/catalogSvg/map.svg?react";
import Air_icon from "../../assets/catalogSvg/air_icon.svg?react";
import Kitchen_icon from "../../assets/catalogSvg/kitchen.svg?react";
import Automatic_icon from "../../assets/catalogSvg/automatic.svg?react";
import Manual_icon from "../../assets/catalogSvg/manual.svg?react";
import TV_icon from "../../assets/catalogSvg/tv.svg?react";
import Bathroom_icon from "../../assets/catalogSvg/bathroom.svg?react";
import Alcove_icon from "../../assets/catalogSvg/alcove.svg?react";
import Fully_icon from "../../assets/catalogSvg/fully.svg?react";
import Van_icon from "../../assets/catalogSvg/van.svg?react";

import s from "./FilterPanel.module.scss";
import { useSearchParams } from "react-router-dom";
// import clsx from "clsx";

const initialValues = {
  location: "",
  // automatic: false,
  // manual: false,
  transmission: "",
  AC: false,
  kitchen: false,
  bathroom: false,
  TV: false,
  vehicleType: "",
};

const FilterPanel = ({ handleFilter, onFiltersFromParams }) => {
  const dispatch = useDispatch();
  const savedFilters = useSelector(selectFilters);

  const [searchParams, setSearchParams] = useSearchParams();
  const filtersFromParams = onFiltersFromParams(searchParams);

  const formik = useFormik({
    initialValues: { ...initialValues, ...savedFilters },
    onSubmit: (values) => {
      const filters = {};
      // Location filter
      if (values.location.trim()) {
        filters.location = values.location.trim();
      }
      // Transmission filter
      if (values.transmission) filters.transmission = values.transmission;
      // Vehicle type filter
      if (values.vehicleType) filters.form = values.vehicleType;
      // Equipment filters
      if (values.AC) filters.AC = true;
      if (values.kitchen) filters.kitchen = true;
      if (values.bathroom) filters.bathroom = true;
      if (values.TV) filters.TV = true;

      dispatch(setFilters(filters)); // put the filter value in state
      handleFilter(filters);
    },
    enableReinitialize: true, // pick up new Initialvalues
  });

  const handleReset = () => {
    formik.resetForm();
    dispatch(setFilters({})); // reset to an empty object
    setSearchParams({});
  };

  const hasActiveFilters = () => {
    for (const key in initialValues) {
      if (formik.values[key] !== initialValues[key]) {
        return true;
      }
    }
    return false;
  };

  //JSX
  return (
    <div className={s.wrapper_form}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.location}>
          <label htmlFor="location">Location</label>
          <Map_icon className={s.map_icon} />
          <input
            id="location"
            type="text"
            name="location"
            placeholder="City"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </div>

        <p className={s.filters}>Filters</p>
        <p className={s.equipment}>Vehicle equipment</p>

        <div className={s.wrap_equipment}>
          <input
            type="checkbox"
            id="AC"
            name="AC"
            checked={formik.values.AC}
            onChange={formik.handleChange}
          />
          <label htmlFor="AC">
            <Air_icon className={s.air_icon} />
            AC
          </label>

          <input
            type="checkbox"
            id="kitchen"
            name="kitchen"
            checked={formik.values.kitchen}
            onChange={formik.handleChange}
          />
          <label htmlFor="kitchen">
            <Kitchen_icon className={s.kitchen_icon} />
            Kitchen
          </label>

          <input
            type="radio"
            id="automatic"
            name="transmission"
            value="automatic"
            checked={
              formik.values.transmission === "automatic" ||
              filtersFromParams.transmission === "automatic"
            }
            onChange={formik.handleChange}
          />
          <label htmlFor="automatic">
            <Automatic_icon className={s.transmission_icon} />
            Automatic
          </label>

          <input
            type="radio"
            id="manual"
            name="transmission"
            value="manual"
            checked={
              formik.values.transmission === "manual" ||
              filtersFromParams.transmission === "manual"
            }
            onChange={formik.handleChange}
          />
          <label htmlFor="manual">
            <Manual_icon className={s.transmission_icon} />
            Manual
          </label>

          <input
            type="checkbox"
            id="TV"
            name="TV"
            checked={formik.values.TV}
            onChange={formik.handleChange}
          />
          <label htmlFor="TV">
            <TV_icon className={s.tv_icon} />
            TV
          </label>

          <input
            type="checkbox"
            id="bathroom"
            name="bathroom"
            checked={formik.values.bathroom === true}
            onChange={formik.handleChange}
          />
          <label htmlFor="bathroom">
            <Bathroom_icon className={s.bathroom_icon} />
            Bathroom
          </label>
        </div>

        <p className={s.vehicle_type}>Vehicle type</p>

        <div className={s.wrap_vehicle_type}>
          <input
            type="radio"
            id="van"
            name="vehicleType"
            value="panelTruck"
            checked={
              formik.values.vehicleType === "panelTruck" ||
              filtersFromParams.form === "panelTruck"
            }
            onChange={formik.handleChange}
          />
          <label htmlFor="van">
            <Van_icon className={s.van_icon} />
            Van
          </label>

          <input
            type="radio"
            id="alcove"
            name="vehicleType"
            value="alcove"
            checked={
              formik.values.vehicleType === "alcove" ||
              filtersFromParams.form === "alcove"
            }
            onChange={formik.handleChange}
          />
          <label htmlFor="alcove">
            <Alcove_icon className={s.alcove_icon} />
            Alcove
          </label>

          <input
            type="radio"
            id="fully"
            name="vehicleType"
            value="fullyIntegrated"
            checked={
              formik.values.vehicleType === "fullyIntegrated" ||
              filtersFromParams.form === "fullyIntegrated"
            }
            onChange={formik.handleChange}
          />
          <label htmlFor="fully">
            <Fully_icon className={s.fully_icon} />
            Fully Integrated
          </label>
        </div>

        <div className={s.button_wrap}>
          <button className={s.btn_search_with_filter} type="submit">
            Search
          </button>

          {hasActiveFilters() && (
            <button
              className={s.btn_reset_filter}
              type="button"
              onClick={handleReset}
            >
              Reset Filters
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;
