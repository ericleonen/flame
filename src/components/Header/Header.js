import './Header.css';
import { logout } from '../../features/firebase';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = () => {
    return (
        <div id="Header">
            <button onClick={logout} id="btn-logout">
                <FontAwesomeIcon icon={faArrowLeft} id="icon-arrow"/>
                Logout
            </button>
        </div>
    );
}