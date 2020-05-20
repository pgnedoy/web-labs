import * as React from "react";
import WebWorker from "../workerSetup";
import worker from '../timer';

export class Alarm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Math.round(Math.random() * 100000).toString(),
            time: props.time,
            alarmTime: this.initTime(props.time),
            done: false,
        };

        this.worker = null;
    }

    componentDidMount() {
        this.worker = new WebWorker(worker);
        this.worker.postMessage(this.state.alarmTime);
        this.worker.onmessage = (e) => {
            console.log('master', e.data);
            alert('Time to work!');
            this.toggleDone();
        }
    }

    initTime = (time) => {
        const [hour, min, sec] = time.split(':');
        const alertTime = new Date();
        alertTime.setHours(hour);
        alertTime.setMinutes(min);
        alertTime.setSeconds(sec);
        return alertTime;
    };

    toggleDone = () => {
        if (this.worker) {
            this.worker.terminate();
        }
        this.setState({ done: !this.state.done });
    };

    delete = () => {
        this.props.deleteAlarm(this.state.id);
    };

    render() {
        const color = 'grey';
        const checked = this.state.done ? "checked" : "";
        return <tr>
                <td style={{ color }}>
                    ${this.state.time}
                </td>
                <td>
                    <input type="checkbox" data-id={this.state.id} checked={checked} onChange={this.toggleDone}/>
                </td>
                <td>
                    <button data-id={this.state.id} class='del-button' onClick={this.delete}>Delete</button>
                </td>
            </tr>;
    }

}
