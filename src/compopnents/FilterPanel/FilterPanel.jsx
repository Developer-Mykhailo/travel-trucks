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
      AC: null,
      kitchen: null,
      bathroom: null,
      TV: null,
      transmission: "",
      name: "",
    },
    onSubmit: (values) => {
      dispatch(setFilters(values)); // put the filter value in steat
      handleFilter(values);
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

        {/* <label>
          <input
            type="checkbox"
            name="airConditioner"
            checked={formik.values.AC}
            onChange={formik.handleChange}
          />
          Кондиціонер
        </label> */}
        {/* 
        <label>
          <input
            type="checkbox"
            name="kitchen"
            checked={formik.values.kitchen}
            onChange={formik.handleChange}
          />
          Кухня
        </label> */}

        {/* <label>
          <input
            type="checkbox"
            name="automaticTransmission"
            checked={formik.values.automaticTransmission}
            onChange={formik.handleChange}
          />
          Автоматична коробка передач
        </label> */}

        {/* <select
          name="driveType"
          value={formik.values.driveType}
          onChange={formik.handleChange}
        >
          <option value="">Тип приводу</option>
          <option value="4x4">4x4</option>
          <option value="AWD">AWD</option>
          <option value="FWD">FWD</option>
          <option value="RWD">RWD</option>
        </select> */}

        <button type="submit">Шукати</button>
      </form>
    </div>
  );
};

export default FilterPanel;
