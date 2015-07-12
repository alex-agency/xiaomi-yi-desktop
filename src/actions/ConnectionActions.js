import mcFly from '../flux/mcFly';

import {CONNECTION_CONNECTED, CONNECTION_DISCONNECTED} from '../constants/ConnectionConstants';

const ConnectionAction = mcFly.createActions({
    setConnected: function(connected) {
        return {
            actionType: connected ? CONNECTION_CONNECTED : CONNECTION_DISCONNECTED
        }
    }
});

export default ConnectionAction;
