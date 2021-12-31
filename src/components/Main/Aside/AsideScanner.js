import AsideWrapper from "../../../wrappers/AsideWrapper"
import './AsideScanner.css';

const AsideScanner = () => {
    return (
        <AsideWrapper asideClass={"aside-scanner-con"}>
            <p className="btn-container">
                <button>
                    Scan
                </button>
            </p>
            <p className="img-con">
                <img></img>
            </p>
        </AsideWrapper>
    )
}

export default AsideScanner;