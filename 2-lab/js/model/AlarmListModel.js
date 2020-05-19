export class AlarmListModel {
    constructor() {
        this.alarms = [];
        this.onChangeCallback = null;
    }

    add(alarm) {
        alarm.onChangeCallback = this.onChangeCallback;
        this.alarms.push(alarm);
    }

    delete(itemId) {
        const itemIndex = this.alarms.findIndex(item => item.id === itemId);
        this.alarms[itemIndex].toggleDone();
        this.alarms.splice(itemIndex, 1);
    }

    toggleDone(alarmIdList) {
        this.alarms.map( (alarm) => {
            if (alarmIdList.indexOf(alarm.id) > -1) alarm.toggleDone();
        });
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}

