class EventListener {
    constructor() {
        this.listeners = []
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    trigger(input) {
        this.listeners.forEach(listener => { listener(input) });
    }

}

export default EventListener;