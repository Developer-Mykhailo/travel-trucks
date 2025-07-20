import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectCamperDetails } from "../../redux/camperDetails/selectors";

import CamperEquipment from "../CamperEquipment/CamperEquipment";
import RadioIcon from "../../assets/catalogSvg/radio.svg?react";
import MicrowaveIcon from "../../assets/catalogSvg/microwave.svg?react";
import RefrigeratorIcon from "../../assets/catalogSvg/refrigerator.svg?react";
import BathroomIcon from "../../assets/catalogSvg/bathroom.svg?react";
import s from "./Features.module.scss";

const Features = () => {
  const camper = useSelector(selectCamperDetails);
  const {
    transmission,
    engine,
    kitchen,
    AC,
    radio,
    microwave,
    refrigerator,
    bathroom,
    form,
    length,
    width,
    height,
    tank,
    consumption,
  } = camper;

  const formMap = {
    panelTruck: "Panel truck",
    fullyIntegrated: "Fully integrated",
    alcove: "Alcove",
  };

  const readableForm = formMap[form];

  // JSX
  return (
    <div className={s.outlet_block}>
      <div className={s.features_box}>
        <CamperEquipment
          transmission={transmission}
          engine={engine}
          kitchen={kitchen}
          AC={AC}
          radio={
            <span className={clsx(s.radio, radio === false && s.disabled)}>
              <RadioIcon />
              Radio
            </span>
          }
          microwave={
            <span
              className={clsx(s.microwave, microwave === false && s.disabled)}
            >
              <MicrowaveIcon />
              Microwave
            </span>
          }
          refrigerator={
            <span
              className={clsx(
                s.refrigerator,
                refrigerator === false && s.disabled
              )}
            >
              <RefrigeratorIcon />
              Refrigerator
            </span>
          }
          bathroom={
            <span
              className={clsx(s.bathroom, bathroom === false && s.disabled)}
            >
              <BathroomIcon />
              Refrigerator
            </span>
          }
        />
      </div>

      <p className={s.vehicle_detail}>Vehicle details</p>

      <ul className={s.detail_list}>
        <li>
          <p>Form</p>
          <span>{readableForm}</span>
        </li>
        <li>
          <p>Length</p>
          <span>{length.replace(/(.)([^ ])$/, "$1 $2")}</span>
        </li>
        <li>
          <p>Width</p>
          <span>{width.replace(/(.)([^ ])$/, "$1 $2")}</span>
        </li>
        <li>
          <p>Height</p>
          <span>{height.replace(/(.)([^ ])$/, "$1 $2")}</span>
        </li>
        <li>
          <p>Tank</p>
          <span>{tank.replace(/(.)([^ ])$/, "$1 $2")}</span>
        </li>
        <li>
          <p>Consumption</p>
          <span>{consumption}</span>
        </li>
      </ul>
    </div>
  );
};

export default Features;
