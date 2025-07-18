import { useFormik } from "formik";
import s from "./FilterPanel.module.scss";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/filtered/slice";

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
    <div className={s.temp}>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="location"
          placeholder="Введіть локацію"
          value={formik.values.location}
          onChange={formik.handleChange}
        />

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
