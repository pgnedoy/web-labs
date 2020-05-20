import * as React from "react";
import {Alarm} from "./Alarm";

export class AlarmList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alarms: [ this.alarmFactory('12:12:12') ]
        }
    }

    alarmFactory = (time) => {
        return <Alarm time={time} deleteAlarm={() => this.deleteAlarm() } />;
    };

    addAlarm = () => {
        const time = prompt('Enter a new title:', '');
        this.setState((prevState) => ({
            ...prevState,
            alarms: [ ...prevState.alarms, this.alarmFactory(time) ]
        }))
    };

    deleteAlarm = (id) => {
        const { alarms } = this.state;
        const itemIndex = alarms.findIndex(item => item.id === id);
        alarms.splice(itemIndex, 1);
        this.setState({
            alarms: [ ...alarms ],
        });
    };

    render() {
        return <div>
            <table border="1">
                <tr>
                    <th>Time</th>
                    <th>Done</th>
                    <th>Operation</th>
                </tr>
                { this.state.alarms }
            </table>
            <button id="add-item" onClick={() => this.addAlarm()}> Add Item </button>;
        </div>
    }

}
