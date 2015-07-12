/**
 * Common class for packets that can be received from the camera.
 */
 export default class AbstractResponse {
    constructor() {
        this._data = undefined;
    }

    /**
     * Check if the content of this._data matches the
     * response specification.
     */
    matches() {
        return false;
    }

    /**
     * Called when the packet can be handled (the action).
     */
    process() {
        return false;
    }

    /**
     * Try to parse the string sent by the server and
     * put it into this._data.
     *
     * In most cases this method should not be overridden.
     */
    parse(data) {
        try {
            this._data = JSON.parse(data);
            return this._data ? true : false;
        } catch (e) {
            return false;
        }
    }

    /**
     * Called by the PacketHandler with the received data.
     *
     * In most cases this method should not be overridden.
     */
    handle(data) {
        if (this.parse(data) && this.matches()) {
            this.process();
            return true;
        }

        return false;
    }
}
