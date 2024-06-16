import { useContext, useEffect, useRef } from 'react';
import { LoaderContext } from '../../context/loaderContext';
import LoadingIcons from 'react-loading-icons';
import "./loadingScreen.css";

const LoadingScreen = () => {
    const mrLoader = useContext(LoaderContext);

    const screenRef = useRef(null);

    useEffect(() => {
        if (mrLoader) {
            if (mrLoader.isLoading === false) {
                screenRef.current.classList.add("hide");
            } else {
                screenRef.current.classList.remove("hide");
            }
        }
    }, [mrLoader.isLoading]);

    return (
        <div className="loading_container" ref={screenRef}>
            <div className="loading_element">
                <LoadingIcons.ThreeDots fill='#1159A8' speed={0.75} />
            </div>
        </div>
    );
}

export default LoadingScreen;