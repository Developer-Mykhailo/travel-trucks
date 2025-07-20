import { useSelector } from "react-redux";
import s from "./Reviews.module.scss";
import { selectCamperDetails } from "../../redux/camperDetails/selectors";
import StarIcon from "../../assets/catalogSvg/star.svg?react";

const Reviews = () => {
  const { reviews } = useSelector(selectCamperDetails);

  //JSX
  return (
    <div className={s.reviews_block}>
      <ul>
        {reviews.map((review, index) => {
          const { reviewer_name, comment, reviewer_rating } = review;

          return (
            <li key={index}>
              <div className={s.reviewer_info}>
                <div className={s.first_letter}>
                  {reviewer_name.charAt(0).toUpperCase()}
                </div>

                <div className={s.name_wrap}>
                  <span className={s.reviewer_name}>{reviewer_name}</span>

                  <ul className={s.star_list}>
                    {Array.from({ length: reviewer_rating }, (_, i) => (
                      <li key={i}>
                        <StarIcon />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className={s.comment}>{comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
