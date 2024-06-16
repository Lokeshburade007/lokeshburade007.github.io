import LoadingIcons from 'react-loading-icons';
import "./fetchingScreen.css";

const FetchingScreen =()=>{
    return(
        <div className="fetching_screen">
            <LoadingIcons.ThreeDots fill='#1159A8' speed={0.75} />
        </div>
    )
}
export default FetchingScreen;