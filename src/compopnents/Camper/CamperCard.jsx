import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

import HeartIcon from "../../assets/catalogSvg/heart.svg?react";
import StarIcon from "../../assets/catalogSvg/star.svg?react";
import MapIcon from "../../assets/catalogSvg/map.svg?react";
import TransmissionIcon from "../../assets/catalogSvg/automatic.svg?react";
import FuelIcon from "../../assets/catalogSvg/fuel.svg?react";
import KitchenIcon from "../../assets/catalogSvg/kitchen.svg?react";
import AirIcon from "../../assets/catalogSvg/air_icon.svg?react";
import clsx from "clsx";
import s from "./Camper_Card.module.scss";

const CamperCard = ({ camper }) => {
  const {
    id,
    name,
    description,
    gallery,
    price,
    location,
    rating,
    reviews,
    transmission,
    engine,
    kitchen,
    AC,
  } = camper;

  //for too long name
  const isNameTruncated = name.length > 27;

  return (
    <div className={s.camper_wrap}>
      <div className={s.image_box}>
        <img src={gallery[0]?.thumb} alt={description} />
      </div>

      <div className={s.content_box}>
        <div className={s.name_price}>
          <h3
            className={s.card_title}
            {...(isNameTruncated && {
              "data-tooltip-id": "title-tooltip",
              "data-tooltip-content": name,
            })}
          >
            {name.length > 27 ? name.slice(0, 27) + "..." : name}
          </h3>
          <Tooltip
            className={s.title_tooltip}
            id="title-tooltip"
            place="top"
            delayHide="350"
          />

          <span className={s.price}>
            &#x20AC;{price.toFixed(2)}
            <HeartIcon className={s.heart_icon} />
          </span>
        </div>

        <div className={s.reviews_location}>
          <p className={s.reviews}>
            <StarIcon />
            {rating}({reviews.length} Reviews)
          </p>

          <p className={s.location}>
            <MapIcon />
            {location}
          </p>
        </div>

        <p
          className={s.descr}
          data-tooltip-id="descr-tooltip"
          data-tooltip-content={description}
        >
          {description.length > 62
            ? description.slice(0, 62) + "..."
            : description}
        </p>
        <Tooltip
          className={s.descr_tooltip}
          id="descr-tooltip"
          place="bottom"
          delayShow={100}
          delayHide={350}
        />

        <div className={s.camper_equipment}>
          <span className={s.automatic}>
            <TransmissionIcon />
            {transmission.charAt(0).toUpperCase() +
              transmission.slice(1).toLowerCase()}
          </span>

          <span className={s.petrol}>
            <FuelIcon />
            {engine.charAt(0).toUpperCase() + engine.slice(1).toLowerCase()}
          </span>

          <span className={clsx(s.kitchen, !kitchen && s.disabled)}>
            <KitchenIcon />
            Kitchen
          </span>

          <span className={clsx(s.air_con, !AC && s.disabled)}>
            <AirIcon />
            AC
          </span>
        </div>

        <Link className={s.link_show_more} to={`/catalog/${id}`}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
