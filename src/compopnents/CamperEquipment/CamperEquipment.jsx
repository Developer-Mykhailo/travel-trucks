import clsx from "clsx";
import TransmissionIcon from "../../assets/catalogSvg/automatic.svg?react";
import FuelIcon from "../../assets/catalogSvg/fuel.svg?react";
import KitchenIcon from "../../assets/catalogSvg/kitchen.svg?react";
import AirIcon from "../../assets/catalogSvg/air_icon.svg?react";

import s from "./CamperEquipment.module.scss";

const CamperEquipment = ({
  transmission = "",
  engine = "",
  kitchen,
  AC,
  radio,
  microwave,
  refrigerator,
  bathroom,
}) => {
  return (
    <div className={clsx(s.camper_equipment)}>
      <span className={s.automatic}>
        <TransmissionIcon />
        {transmission.charAt(0).toUpperCase() +
          transmission.slice(1).toLowerCase()}
      </span>

      {bathroom}

      <span className={clsx(s.kitchen, kitchen === false && s.disabled)}>
        <KitchenIcon />
        Kitchen
      </span>

      <span className={clsx(s.air_con, AC === false && s.disabled)}>
        <AirIcon />
        AC
      </span>

      <span className={s.petrol}>
        <FuelIcon />
        {engine.charAt(0).toUpperCase() + engine.slice(1).toLowerCase()}
      </span>

      {radio}

      {microwave}
      {refrigerator}
    </div>
  );
};

export default CamperEquipment;
