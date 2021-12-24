import { useContext } from "react";
import { RouteContext } from "../../../wrappers/LocationMonitor";
import SectionWrappers from "../../../wrappers/SectionWrappers"

const Profile = () => {
    const { subRoute } = useContext( RouteContext );

    return (
        <SectionWrappers>
            <p>Profile</p>
            { subRoute }
        </SectionWrappers>
    )
}

export default Profile;