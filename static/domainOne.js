window.onload = function() {
	//document.domain = "gatsbyjs.io";
    const data = {};
    const iframe = document.getElementById('domainTwoFrame');
    let win;
    // some browser (don't remember which one) throw exception when you try to access
    // contentWindow for the first time, it work when you do that second time
    try {
        win = iframe.contentWindow;
    } catch(e) {
        win = iframe.contentWindow;
    }

    function getData(e) {
        const form = e.target;
        const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);
        for (let field of form) {
            const {name} = field;

            if (name) {
                const {type, checked, value} = field;
                if (isCheckboxOrRadio(type) && !checked){
                    continue;
                }
                data[name] = value;
            }
        }
    }
    function StorageAction(e){
        e.preventDefault();
        getData(e);
        // save obj in subdomain localStorage
        win.postMessage(JSON.stringify(data), "*");
        return false;
    }
    document.getElementById("StorageForm").addEventListener("submit", StorageAction);
    
    
    function receiveMessage (e) {
        if (e.origin !== "http://localhost:3000" && e.origin !== "https://localhost:3000") {
            return;
        }
        // this will log response
        let message = JSON.parse(e.data);
        if (!!message.callback) {
            const addon = document.createElement('script');
            addon.type = 'text/javascript';
            addon.text = message.callback;
            document.body.insertBefore(addon, document.body.firstChild);
        }

        console.log(message);
    }
    window.addEventListener("message", receiveMessage, false);

    const checkCallback = document.getElementById("formCallback");
    const callbackTextarea = document.getElementById("formTextarea");

    checkCallback.addEventListener("click", (e) => {
        console.log('checkbox clicked', e);
        
        e.target.checked ? callbackTextarea.disabled = false : (callbackTextarea.disabled = true, callbackTextarea.value = "");

    },false);
}