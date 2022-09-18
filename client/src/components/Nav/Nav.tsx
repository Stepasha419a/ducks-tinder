import { faBriefcase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppStateType } from '../../redux/reduxStore'
import { pairs } from '../../assets/hardcodeObjects/hardcodeObjects'
import Dialogs from '../Dialogs/Dialogs'
import Avatar from '../Avatar/Avatar'
import { MutableRefObject } from 'react'

type PairType = {
    id: number,
    img: string,
    name: string
}

interface NavPropsInterface{
    isPairsOpened: boolean,
    setIsPairsOpened: (setting: boolean) => void
    socket: MutableRefObject<WebSocket | undefined>
}

const Nav: React.FC<NavPropsInterface> = ({isPairsOpened, setIsPairsOpened, socket}) => {
    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    return(
        <aside className="tinder__info">
            <div className="tinder__info-user">
                <Link className="tinder__info-user-person" to='/profile'>
                    <Avatar />
                    <div className="tinder__info-user-name">
                        {currentUser.name}
                    </div>
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
            <div className="tinder__info-content">
                <div className="tinder__info-content-titles">
                    <Link onClick={() => setIsPairsOpened(true)} className={'tinder__info-content-title ' + (isPairsOpened ? 'tinder__info-content-title--active' : '')} to='/'>
                        Pairs
                    </Link>
                    <Link onClick={() => setIsPairsOpened(false)} className={'tinder__info-content-title ' + (!isPairsOpened ? 'tinder__info-content-title--active' : '')} to='/chat'>
                        Messages
                    </Link>
                </div>
                <div className="tinder__info-content-box">
                    {isPairsOpened ?
                    <div className="tinder__info-content-pairs">
                    {pairs.map((item: PairType) => {
                        return (
                            <div className="tinder__info-content-pairs-item" key={item.id}>
                                <Avatar showDefaultPhoto />
                                <div className="tinder__info-content-pairs-item-name">
                                    {item.name}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    :
                    <Dialogs socket={socket}/>
                    }
                </div>
            </div>
        </aside>
    )
}

export default Nav