import config from "./routes";
import {isEmpty} from 'lodash';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const getPropositions = ({
        limit = 20,
        skip = 0,
        userName = '',
        approved
    }) => new Promise((resolve, reject) => {
        const reqData = {
            limit,
            skip,
            approved
        };
        if (!isEmpty(userName)) reqData.userName = userName;

        fetch(`${config.campaignApiPrefix}${config.campaigns}`, {
            headers,
            method: 'POST',
            body: JSON.stringify(reqData),
        }).then(res => res.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    }
);

