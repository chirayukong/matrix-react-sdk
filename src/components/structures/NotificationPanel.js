/*
Copyright 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const React = require('react');
const ReactDOM = require("react-dom");
import { _t } from '../../languageHandler';
const Matrix = require("matrix-js-sdk");
const sdk = require('../../index');
const MatrixClientPeg = require("../../MatrixClientPeg");
const dis = require("../../dispatcher");

/*
 * Component which shows the global notification list using a TimelinePanel
 */
const NotificationPanel = React.createClass({
    displayName: 'NotificationPanel',

    propTypes: {
    },

    render: function() {
        // wrap a TimelinePanel with the jump-to-event bits turned off.
        const TimelinePanel = sdk.getComponent("structures.TimelinePanel");
        const Loader = sdk.getComponent("elements.Spinner");

        const timelineSet = MatrixClientPeg.get().getNotifTimelineSet();
        if (timelineSet) {
            return (
                <TimelinePanel key={"NotificationPanel_" + this.props.roomId}
                    className="mx_NotificationPanel"
                    manageReadReceipts={false}
                    manageReadMarkers={false}
                    timelineSet={timelineSet}
                    showUrlPreview = {false}
                    opacity={this.props.opacity}
                    tileShape="notif"
                    empty={_t('You have no visible notifications')}
                />
            );
        } else {
            console.error("No notifTimelineSet available!");
            return (
                <div className="mx_NotificationPanel">
                    <Loader />
                </div>
            );
        }
    },
});

module.exports = NotificationPanel;
