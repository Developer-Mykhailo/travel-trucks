import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

import HeartIcon from "../../assets/catalogSvg/heart.svg?react";
import StarIcon from "../../assets/catalogSvg/star.svg?react";
import MapIcon from "../../assets/catalogSvg/map.svg?react";

import CamperEquipment from "../CamperEquipment/CamperEquipment";
import { ImageModal } from "../../ImageModal/ImageModal";
import s from "./Camper_Card.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";

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

  //Favorit campers
  const [isFavorit, setIsFavorit] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteCampers") || []
    );
    setIsFavorit(storedFavorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favoriteCampers")) || [];

    let updated;
    if (stored.includes(id)) {
      updated = stored.filter((favId) => favId !== id); // Remove from your favorite
    } else {
      updated = [...stored, id]; // Add to your loved ones
    }

    setIsFavorit(!stored.includes(id)); // Set a new condition
    localStorage.setItem("favoriteCampers", JSON.stringify(updated));
  };

  return (
    <div className={s.camper_wrap}>
      <ImageModal
        thumb={gallery?.[0]?.thumb}
        original={gallery?.[0]?.original}
        alt={description}
      />

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
            <HeartIcon
              className={clsx(s.heart_icon, isFavorit && s.favorit_camper)}
              onClick={toggleFavorite}
            />
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

        <CamperEquipment
          transmission={transmission}
          engine={engine}
          kitchen={kitchen}
          AC={AC}
        />

        <Link className={s.link_show_more} to={`/catalog/${id}`}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
