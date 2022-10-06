import { faCircleDown, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IUser } from "../../../models/IUser"
import ImageSlider from "../../Slider/ImageSlider"

interface ProfileFullPreviewPropsInterface{
    currentUser: IUser
    setIsFullPreviewPageSetting: (setting: boolean) => void
}

const ProfileFullPreview: React.FC<ProfileFullPreviewPropsInterface> = ({currentUser, setIsFullPreviewPageSetting}) => {
    return(
        <div className="tinder__content-full-preview">
            <div className="tinder__content-full-preview-slider">
                <ImageSlider  images={[currentUser.pictures.avatar, ...currentUser.pictures.gallery]} userId={currentUser._id} imageExtraClassName={'tinder__image-slider-item--bdrd-top'}/>
                <button onClick={() => setIsFullPreviewPageSetting(false)} className="tinder__content-full-preview-close">
                    <FontAwesomeIcon icon={faCircleDown} className="tinder__content-full-preview-close-icon"/>
                </button>
            </div>
            <div className="tinder__content-full-preview-info">
                <div className="tinder__content-full-preview-info-flex">
                    <div className="tinder__content-full-preview-info-name">
                        {currentUser.name}
                    </div>
                    <div className="tinder__content-full-preview-info-years">
                        {currentUser.age || 'unkown years'}
                    </div>
                </div>
                <div className="tinder__content-full-preview-info-sex">
                    <FontAwesomeIcon icon={faUser} className="tinder__content-full-preview-info-sex-icon"/>
                    {currentUser.sex ? currentUser.sex[0].toUpperCase() + currentUser.sex.slice(1) : 'unkown sex'}
                </div>
            </div>
            <hr className="tinder__content-info-separator"/>
        </div>
    )
}

export default ProfileFullPreview