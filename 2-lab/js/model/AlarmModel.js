export class AlarmModel {
    constructor(time) {
        this.id = Math.round(Math.random() * 100000).toString();
        this.time = time;
        this.alarmTime = this.initTime(time);
        this.done = false;
        this.worker = null;

        this.initWorker();

        return this.initOnModelChange();
    }

    initTime(time) {
        const [hour, min, sec] = time.split(':');
        const alertTime = new Date();
        alertTime.setHours(hour);
        alertTime.setMinutes(min);
        alertTime.setSeconds(sec);
        return alertTime;
    }

    initWorker() {
        this.worker = new Worker('./js/timer.js');
        this.worker.postMessage(this.alarmTime);
    }

    setOnChangeCallback() {
        this.onChangeCallback = onChangeCallback;
    }

    toggleDone() {
        this.done = !this.done;
        if (this.worker) {
            this.worker.terminate();
        }
        return this.done;
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                if (this.onChangeCallback) this.onChangeCallback(this);
                return true;
            }
        };
        return new Proxy(this, handler);
    }
}
