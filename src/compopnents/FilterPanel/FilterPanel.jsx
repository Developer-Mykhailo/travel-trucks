import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/filtered/slice";

import MapIcon from "../../assets/catalogSvg/map.svg?react";

import s from "./FilterPanel.module.scss";

const FilterPanel = ({ handleFilter }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      location: "",
      name: "",
      automatic: false,
      manual: false,
      AC: false,
      kitchen: false,
      bathroom: false,
      TV: false,
    },
    onSubmit: (values) => {
      const filters = {};
      if (values.location.trim()) filters.location = values.location;

      if (values.automatic && values.manual) {
        filters.transmission = null;
      } else if (values.automatic) {
        filters.transmission = "automatic";
      } else if (values.manual) {
        filters.transmission = "manual";
      }

      if (values.name.trim()) filters.name = values.name;
      if (values.AC) filters.AC = true;
      if (values.kitchen) filters.kitchen = true;
      if (values.bathroom) filters.bathroom = true;
      if (values.TV) filters.TV = true;

      dispatch(setFilters(filters)); // put the filter value in steat
      handleFilter(filters);
      //   formik.resetForm();
    },
  });

  //JSX
  return (
    <div className={s.wrapper_form}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.location}>
          <label htmlFor="location">Location</label>
          <MapIcon className={s.map_icon} />
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
          <label htmlFor="AC">AC</label>

          <input
            type="checkbox"
            id="kitchen"
            name="kitchen"
            checked={formik.values.kitchen}
            onChange={formik.handleChange}
          />
          <label htmlFor="kitchen">Kitchen</label>

          <input
            type="checkbox"
            id="automatic"
            name="automatic"
            checked={formik.values.automatic}
            onChange={formik.handleChange}
          />
          <label htmlFor="automatic">Automatic</label>

          <input
            type="checkbox"
            id="manual"
            name="manual"
            checked={formik.values.manual}
            onChange={formik.handleChange}
          />
          <label htmlFor="manual">Manual</label>
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterPanel;
