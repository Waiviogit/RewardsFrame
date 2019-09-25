import React, { useState, useEffect } from 'react';
import {size, map} from 'lodash';
import './Rewards.less';
import Campaign from "./Campaign/Campaign";
import * as ApiClient from '../waivioApi/ApiClient';

const Rewards = () => {
    const userName ='monterey';
    const [propositions, setPropositions] = useState(0);

    useEffect(() => {
        getPropositions(userName)
    }, []);

    const getPropositions = (userName) => {
        ApiClient.getPropositions(userName).then(
            data => {
                setPropositions(data.campaigns);
            }
        );
    };
    const campaignsLayoutWrapLayout = () => {
        if (size(propositions) !== 0) {
            return map(
                propositions,
                proposition =>
                    proposition &&
                    proposition.required_object &&
                    <Campaign
                        proposition={proposition}
                        filterKey={'eligible'}
                        key={`${proposition.required_object.author_permlink}${proposition.required_object.createdAt}`}
                        userName={userName}
                    />
            )
        }
        return 'no rewards for you'
        // return `${intl.formatMessage(
        //     {
        //         id: 'noProposition',
        //         defaultMessage: `No reward matches the criteria for user @{userName}`,
        //     },
        //     {userName},
        // )}`;
    };

        return <div>
            {campaignsLayoutWrapLayout()}
        </div>;
};

export default Rewards;
