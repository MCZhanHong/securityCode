function main() {
    let authCode = new SecurityCode();
    authCode.init(document.getElementById("auth-code"));
    let code = authCode.getCode();

    let domCodeInput = document.getElementById("code-input");
    domCodeInput.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            let codeInput = domCodeInput.value;
            if (code === codeInput) {
                alert("success");
            }
        }
    })
    
}
