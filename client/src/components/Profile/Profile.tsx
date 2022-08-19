import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faMagnifyingGlass, faFireFlameCurved } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { AppStateType } from "../../redux/reduxStore"
import { updateUserThunk } from "../../redux/usersReducer"
import ProfileUserImage from "./ProfileUserImage"
import ProfileSettingsList from "./ProfileSettingsList"
import ProfileSetting from "./ProfileSetting"
import ProfileImageSetting from "./ProfileImageChange/ProfileImageSetting"

const Profile = () => {

    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [currentDistanceSetting, setCurrentDistanceSetting] = useState(currentUser.partnerSettings ? currentUser.partnerSettings.distance : 0)
    const [currentAgeSetting, setCurrentAgeSetting] = useState(currentUser.age ? currentUser.age : 0)
    const [isUserInfoSetting, setIsUserInfoSetting] = useState(false)
    const [isImageSetting, setIsImageSetting] = useState(false)
    const [formName, setFormName] = useState('') // name of the title in ProfileSetting
    const [settingInputName, setSettingInputName] = useState('')
    const [innerObjectName, setInnerObjectName] = useState('')


    // objectName for inner object in user object if it is
    const submitSettings = (inputName: string, changedData: string | number | boolean | {from: number, to: number}, innerObjectName?: string) => { 
        dispatch(updateUserThunk({currentUser, inputName, changedData, innerObjectName}) as any)
        setIsUserInfoSetting(false)
        setInnerObjectName('')
    }

    return (
        <div className="tinder">
            <aside className="tinder__info tinder__info--gray">
                <div className="tinder__info-user">
                    <Link className="tinder__info-main-link" to='/'>
                        <FontAwesomeIcon icon={faFireFlameCurved}/>
                    </Link>
                    <div className="tinder__info-review">
                        <Link className="tinder__info-review-link" to='#'>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </Link>
                    </div>
                    <div className="tinder__info-work-mode">
                        <Link className="tinder__info-work-mode-link" to='#'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Link>
                    </div>
                </div>
                {isUserInfoSetting ? 
                    <ProfileSetting
                        currentUser={currentUser}
                        setIsUserInfoSetting={setIsUserInfoSetting}
                        submitSettings={submitSettings}
                        formName={formName}
                        settingInputName={settingInputName}
                        innerObjectName={innerObjectName}
                        setInnerObjectName={setInnerObjectName}
                    />
                :
                    <ProfileSettingsList 
                        currentUser={currentUser}
                        setIsUserInfoSetting={setIsUserInfoSetting}
                        currentDistanceSetting={currentDistanceSetting}
                        setCurrentDistanceSetting={setCurrentDistanceSetting}
                        currentAgeSetting={currentAgeSetting}
                        setCurrentAgeSetting={setCurrentAgeSetting}
                        submitSettings={submitSettings}
                        setFormName={setFormName}
                        setSettingInputName={setSettingInputName}
                        setInnerObjectName={setInnerObjectName}
                    />
                }
            </aside>
            <div className="tinder__content">
                <div className="tinder__content-search tinder__content-search--profile">
                {isImageSetting ?
                    <ProfileImageSetting 
                        setIsImageSetting={setIsImageSetting}
                        currentUser={currentUser}
                    />
                :
                    <ProfileUserImage 
                        currentUser={currentUser}
                        setIsImageSetting={setIsImageSetting}
                    />
                }
                </div>
            </div>
        </div>
    )
}

export default Profile