import LoadingIcons from "react-loading-icons";

const FetchingScreen = () => {
  return (
    <div className="w-full h-[600px] flex items-center justify-center bg-white/70">
      <LoadingIcons.ThreeDots fill="#1159A8" speed={0.75} />
    </div>
  );
};

export default FetchingScreen;
