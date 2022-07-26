import React, { Fragment, useEffect, useState } from 'react';
import { SERVER_LINK } from '../../dev-server-link';

import LeaderTable from './LeaderTable/LeaderTable';
import LoadingSpinner from '../../compenents/LoadingSpinner/LoadingSpinner';

const LeaderBoard = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [leaders, setLeaders] = useState(undefined);

    useEffect(() => {
        fetch(
            `${SERVER_LINK}/api/explore/leaderboard`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            }
        )
            .then(data => data.json())
            .then(response => {
                if (!response.ok) {
                    setLeaders(response);
                }
            })
            .catch(setError)
            .finally(() => setLoading(false))
    }, []);

    return (
        <Fragment>
            {loading && <LoadingSpinner />}
            {!loading && error && (<div>
                <div className='errorTemplate'>
                    <div><span>Msg : </span>Wasn't able to connect to server check if your are not offline or server might not be working !</div>
                    {error && <div><span>Error : </span>{JSON.stringify(error)}</div>}
                </div>
            </div>)}
            {!loading && !error && (
                <LeaderTable leaders={[...leaders]} />
            )}
        </Fragment>
    )
}

export default LeaderBoard;