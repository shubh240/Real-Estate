import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { APP_NAME } from '../../app.config';

export default function Breadcrumb({ header, subHeader, redirectPath, subHeaderState }) {
    const location = useLocation();
    const path = location?.pathname
    let splitPath = path?.split('/')

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <ol className="breadcrumb m-0 mx-30">
                        <li className="breadcrumb-item"><Link to="/" className='linkdata'>{APP_NAME}</Link></li>
                        <li className="breadcrumb-item"><Link to={'/' + splitPath?.[1] + '/' + splitPath?.[2]}>{header}</Link></li>
                        {subHeader ?
                            <li className="breadcrumb-item"><Link to={'/' + redirectPath}>{subHeader}</Link></li>
                            :
                            <></>
                        }

                    </ol>
                </div>
            </div>
        </div >
    )
}
