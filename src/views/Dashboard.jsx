import Suggest from "../components/Suggest"
import SavedList from "../components/SavedList"

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [showSaved, setShowSaved] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'F5') {
            e.preventDefault();
            setShowSaved(prevShowSaved => !prevShowSaved);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="container">
            { showSaved }
            {
                showSaved ? <SavedList /> : <Suggest />
            }
        </div>
    )
};