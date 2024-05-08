import { useEffect, useState } from 'react';
import { BaseResponse } from '../interfaces';
import {MarriedStatus, UserInformation} from "../interfaces/UserInformation";

export function CheckUserInformation() {
    const [status, setStatus] = useState<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>();
    const [userInfo, setUserInfo] = useState<UserInformation>({name: '', age: 0, married: MarriedStatus.NoData, birth: ''});
    const [data , setData] = useState<BaseResponse>();

    const setValue = (property: keyof UserInformation, value: any) => {
        setUserInfo((previousUserInfo) => ({
            ...previousUserInfo,
            [property]: value,
        }));
    };


    useEffect(() => {
        if(status === 'SEND_DATA') {
            setStatus('SENDING_DATA');
            fetch('http://localhost:3001/info/userInfo/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    userInfo
                )
            })
                .then((rawResponse) => {
                    if([200, 201].includes(rawResponse.status)) {
                        return rawResponse.json();
                    } else {
                        throw new Error();
                    }
                })
                .then((response: BaseResponse) => {
                    setStatus('DATA_SENDED');
                    setData(response);
                })
                .catch(e => {
                    setStatus('ERROR_SENDING_DATA');
                })
        }
    }, [status, userInfo]);

    if (status === 'ERROR_SENDING_DATA') {
        return (
            <div>
                <h1>ERRORE INVIO DATI</h1>
                <button onClick={() => setStatus('INITIAL')}>RIPROVA</button>
            </div>
        );
    }

    if(status === 'SEND_DATA' || status === 'SENDING_DATA') {
        return (
            <div>
                <h1>INVIO IN CORSO</h1>
                <button onClick={() => setStatus('INITIAL')}>ANNULLA</button>
            </div>
        );
    }

    if(status === 'DATA_SENDED') {
        return (<div>
            {data?.success === true && <h1>DATI INVIATI VALIDI</h1>}
            {data?.success === false && <h1>DATI INVIATI NON VALIDI</h1>}
            <button onClick={() => setStatus('INITIAL')}>INVIA UN ALTRO VALORE</button>
        </div>)
    }

    return (
        <div>
            <h1>Enter the user information</h1>
            <div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" value={userInfo.name} onChange={(e) => {
                        setValue('name', e.target.value);
                    }}></input>
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input id="age" type="number" value={userInfo.age} onChange={(e) => {
                        setValue('age', e.target.value);
                    }}></input>
                </div>
                <div>
                    <label htmlFor="married">Married:</label>
                    <select
                        id="married"
                        value={userInfo.married}
                        onChange={(e) => setValue('married', e.target.value as MarriedStatus)}
                    >
                        <option value={MarriedStatus.Yes}>Yes</option>
                        <option value={MarriedStatus.No}>No</option>
                        <option value={MarriedStatus.NoData}>   </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birth">Date of birth:</label>
                    <input id="birth" type="date" value={userInfo.birth} onChange={(e) => {
                        setValue('birth', e.target.value);
                    }}></input>
                </div>
            </div>

            <button onClick={() => setStatus('SEND_DATA')}>VALIDATE</button>
        </div>
    );
}
