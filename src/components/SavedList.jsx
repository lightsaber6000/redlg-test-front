import getUserAddressApi from "../api/address/get-user-addresses.api";
import { useEffect, useState } from 'react';

export default function SavedList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const setData = async () => {
        const { data } = await getUserAddressApi();
        setList(data);
        setLoading(false);
    };

    useEffect(() => {
        setData();
    }, []);

    if (loading) return null;

    return (
        <div className="saved">
            {
                list.length 
                ? list.map(({ id, value }) => (
                    <p key={id} className="saved__item">
                        { value }
                    </p>
                ))
                : <p>Нет сохраненных</p>
            }
        </div>
    )
};