import { SyncLoader } from "react-spinners";
import s from "./Loadeк.module.scss";

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <SyncLoader color="var(--button)" size={30} />
    </div>
  );
};

export default Loader;
