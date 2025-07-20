import clsx from "clsx";
import s from "./CamperEquipment.module.scss";

import TransmissionIcon from "../../assets/catalogSvg/automatic.svg?react";
import FuelIcon from "../../assets/catalogSvg/fuel.svg?react";
import KitchenIcon from "../../assets/catalogSvg/kitchen.svg?react";
import AirIcon from "../../assets/catalogSvg/air_icon.svg?react";

const CamperEquipment = ({
  transmission = "",
  engine = "",
  kitchen,
  AC,
  className,
  radio,
  microwave,
  refrigerator,
  bathroom,
}) => {
  return (
    <div className={clsx(s.camper_equipment, className)}>
      <span className={s.automatic}>
        <TransmissionIcon />
        {transmission.charAt(0).toUpperCase() +
          transmission.slice(1).toLowerCase()}
      </span>
      <span className={s.petrol}>
        <FuelIcon />
        {engine.charAt(0).toUpperCase() + engine.slice(1).toLowerCase()}
      </span>
      <span className={clsx(s.kitchen, kitchen === false && s.disabled)}>
        <KitchenIcon />
        Kitchen
      </span>
      <span className={clsx(s.air_con, AC === false && s.disabled)}>
        <AirIcon />
        AC
      </span>

      {radio}
      {microwave}
      {refrigerator}
      {bathroom}
    </div>
  );
};

export default CamperEquipment;
