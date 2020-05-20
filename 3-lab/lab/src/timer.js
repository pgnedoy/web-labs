export default () => {
    onmessage = (e) => {
        const endTime = new Date(e.data);
        setTimeout(function(){ this.postMessage('time'); }, endTime - new Date());
    }
}

