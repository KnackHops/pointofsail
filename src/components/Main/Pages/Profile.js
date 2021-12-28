import { useContext } from "react";
import { RouteContext } from "../../../wrappers/LocationMonitor";
import SectionWrappers from "../../../wrappers/SectionWrappers"

const Profile = () => {
    const { subRoute } = useContext( RouteContext );

    return (
        <SectionWrappers>
            <h1>Profile</h1>
            <p>{ subRoute || "origin" }</p>
        </SectionWrappers>
    )
}

export default Profile;