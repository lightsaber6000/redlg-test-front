import { useAuth } from "./AuthProvider";
import isEmpty from '../utils/isEmpty';

export default function Header() {
    const { user, loading, logout } = useAuth();

    if (loading || isEmpty(user)) return null;

    const logoutHandler = () => {
        logout();
    };

    return (
        <header className="header">
            <p className="header__email">{ user.email }</p>
            <button className="button" onClick={logoutHandler}>Выйти</button>
        </header>
    )
};