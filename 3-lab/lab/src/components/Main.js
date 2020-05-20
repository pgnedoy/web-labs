import * as React from "react";
import {AlarmList} from "./AlarmList";

export class Main extends React.Component {

    render() {
        return <div>
            <h3>Alarms list</h3>
            <div id="alarms-list">
                <AlarmList />
            </div>
        </div>
    }

}
