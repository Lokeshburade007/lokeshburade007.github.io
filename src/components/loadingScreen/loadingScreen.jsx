import { useContext } from "react";
import LoadingIcons from "react-loading-icons";
import { LoaderContext } from "../../context/loaderContext";

const LoadingScreen = () => {
  const mrLoader = useContext(LoaderContext);
  const isHidden = mrLoader?.isLoading === false;

  return (
    <div
      className={`fixed inset-0 z-[100000] w-full h-screen flex items-center justify-center bg-white/85 ${
        isHidden ? "hidden" : "flex"
      }`}
    >
      <div className="w-fit h-fit">
        <LoadingIcons.ThreeDots fill="#1159A8" speed={0.75} />
      </div>
    </div>
  );
};

export default LoadingScreen;
