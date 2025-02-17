import debounce from "../utils/debounce";
import useUniqueId from '../utils/uid';
import getAddressApi from "../api/address/get-addresses.api";
import setAddressApi from "../api/address/set-address.api";
import { useState } from 'react';

export default function Suggest() {
    const [uid] = useState(useUniqueId());
    const [addresses, setAddresses] = useState([]);
    const [dirty, setDirty] = useState(false);

    const handleInput = async (e) => {
        const { data } = await getAddressApi({ query: e.target.value });
        setAddresses(data.suggestions);
        setDirty(true);
    };

    const debouncedHandleInput = debounce(handleInput);

    const clickHandler = (value) => {
        setAddressApi({ value });
    };

    return (
        <div className="suggest">
            <input
                type="text"
                id={`input-${uid}`} 
                className="input"
                onInput={debouncedHandleInput}
            />
            <div className="suggest__list">
                {!addresses.length && dirty ? (
                    <p>Нет результатов</p>
                ) : (
                    addresses.map(({ value }) => (
                        <div key={value} className="suggest__item">
                            <p className="suggest__title">{ value }</p>
                            <button type="button" 
                                    className="button" 
                                    onClick={() => clickHandler(value)}>
                                Сохранить
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}