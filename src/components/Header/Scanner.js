import { useContext } from 'react';
import { MenuContext } from '../UnderRootContent';
import './Scanner.css';

const Scanner = () => {
    const { scannerMenuHandler } = useContext( MenuContext );

    return (
        <div className='scanner-con'>
            <p>
                <button onClick={()=>scannerMenuHandler()}>
                    Scanner
                </button>
            </p>
        </div>
    )
}

export default Scanner;