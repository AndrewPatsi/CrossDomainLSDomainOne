# CrossDomainLSDomainOne
Domain one of cross domain local storage

Start the code from https://github.com/AndrewPatsi/CrossDomainLSDomainTwo on your localhost:3000, this would be "domain.two".

The "domain.one" code from this repository work's on https://crossdomainlsdomainonemain.gatsbyjs.io free hosting.

# The domain.one code

## javascript
```javascript
window.onload = function() {
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
```
## HTML
```html
<form class="form-storage" id="StorageForm" name="formStorage" action="http://localhost:3000" method="get"
	target="domainTwoFrame">
	<fieldset>
		<legend>Storage Method</legend>
		<p><label for="formSet"><input type="radio" id="formSet" name="method" value="set" checked="">Set</label>
        <label
				for="formGet"><input type="radio" id="formGet" name="method" value="get">Get</label>
        <label
				for="formRemove"><input type="radio" id="formRemove" name="method" value="remove">Remove</label></p>
	</fieldset>
	<fieldset>
		<legend>Set data</legend>
		<p><label for="formKey">Key:</label><input type="text" id="formKey" name="key" placeholder="name" required="">
		</p>
		<p><label for="formValue">Value:</label><input type="text" id="formValue" name="value" placeholder="Jack"></p>
	</fieldset>
	<fieldset>
		<legend>Callback</legend><label for="formCallback"><input type="checkbox" id="formCallback" name="confirm">I
			need to provide callback function</label><textarea id="formTextarea" name="callback" rows="10" cols="45"
			disabled=""></textarea>
	</fieldset>
	<fieldset class="submit-form">
		<legend>Send request</legend>
		<p><input type="submit"></p>
	</fieldset>
</form>
```
