import {AlarmModel} from "../model/AlarmModel.js";

export class AlarmListController {
    constructor(alarmListModel, alarmListView) {
        this.alarmListModel = alarmListModel;
        this.alarmListView = alarmListView;
        this.alarmListModel.setOnChangeCallback((e) => this.onChangeCallback(e));
        this.alarmListView.setControllerOnAddAlarm(this.addAlarm);
        this.alarmListView.setControllerOnDelAlarm(this.delAlarm);
        this.initOnModelChange();
        this.alarmListView.setControllerOnCheckbox(this.alarmToggleDone);
        document.querySelector('#add-item').addEventListener('click', (e)=>alarmListView.onAddItem(e));
    }

    onChangeCallback() {
        document.querySelector('#alarms-list').innerHTML = this.alarmListView.toHtml();
    }

    alarmToggleDone(id) {
        this.alarmListModel.toggleDone([id]);
    }

    addAlarm(title) {
        const alarm = new AlarmModel(title);
        this.alarmListModel.add(alarm);
        alarm.worker.onmessage = () => {
            alert('Time to work!');
            this.alarmListModel.toggleDone([alarm.id]);
        }
    }

    delAlarm(id) {
        this.alarmListModel.delete(id);
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                document.querySelector('#alarms-list').innerHTML = this.alarmListView.toHtml();
                return true;
            }
        };
        this.alarmListModel.alarms = new Proxy(this.alarmListModel.alarms, handler);
    }
}
