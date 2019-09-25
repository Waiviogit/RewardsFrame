import React from 'react';
// import { injectIntl } from 'react-intl';
import './Campaign.less';
import {getClientWObj} from "../../helpers/adapters";
import ObjectCardView from "../ObjectCard/ObjectCardView";

const Campaign = ({ proposition = {}, filterKey, history, intl }) => {
  const requiredObject = getClientWObj(proposition.required_object);

  // const goToProducts = () => history.push(`/rewards/${filterKey}/${requiredObject.id}`);
  return (
    <div role="presentation" className="Campaign" onClick={()=>{}}>
      <div className="RewardsHeader-wrap">
        {/*{`${intl.formatMessage({*/}
          {/*id: 'rewards_for_reviews',*/}
          {/*defaultMessage: `Rewards for review`,*/}
        {/*})}:`}*/}
        <span className="RewardsHeader-payment">
          {`$${proposition.min_reward} ${
            proposition.max_reward !== proposition.min_reward ? ` - $${proposition.max_reward}` : ''
          } >`}
        </span>
      </div>
      <ObjectCardView wObject={requiredObject} key={requiredObject.id} />
    </div>
  );
};

// export default injectIntl(withRouter(Campaign));
export default Campaign;
