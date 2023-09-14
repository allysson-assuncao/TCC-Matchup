var form = document.getElementById("login");

var txtEmailOrUsername = document.getElementById("txt-email-or-username");
var errorEmailOrUsername = document.getElementById("email-or-username-error");
var txtPassword = document.getElementById("txt-password");
var errorPassword= document.getElementById("password-error");

var errorCredentials = document.getElementById("credentials-error");
var btnCloseErrorMessage = document.getElementById("close-message-error");

var validEmailOrUsername = false;
var isEmail = false;
var isUsername = false;
var validPassword = false;

document.addEventListener("DOMContentLoaded", function () {
    errorCredentials.style.display = "none";
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

txtEmailOrUsername.addEventListener("blur", function (event) {
    if(txtEmailOrUsername.value == "") return;
    errorEmailOrUsername.textContent = "";
    changeInputBorder(true, txtEmailOrUsername);
});

txtPassword.addEventListener("blur", function (event) {
    if(txtPassword.value == "") return;
    errorPassword.textContent = "";
    changeInputBorder(true, txtPassword);
});


btnCloseErrorMessage.addEventListener("click", function (event) {
    //event.preventDefault();
    console.log("onclick");
    configureInputs(true);
});

function validateFields() {
    if(txtEmailOrUsername.value == ""){
        changeInputBorder(false, txtEmailOrUsername);
        errorEmailOrUsername.textContent = "Informe um email ou nome de usuário!";
        return;
    }
    if(txtPassword.value == ""){
        changeInputBorder(false, txtPassword);
        errorPassword.textContent = "Informe uma senha!";
        return;
    }
    
    validateEmailOrUsername(txtEmailOrUsername.value);
    validEmailOrUsername = isEmail || isUsername;
    changeInputBorder(validEmailOrUsername, txtEmailOrUsername);
    if (!validEmailOrUsername) {
        errorEmailOrUsername.textContent = "Email ou nome de usuário inválido!";
        return false;
    } else {
        errorEmailOrUsername.textContent = "";
        return true;
    }
};

async function checkUnavailability(type, data) {
    response = await fetch(`http://localhost:8080/api/data-verification/${type}/exists/${data}`)
        .catch(error => {
            alert("Deu errado! -> (checkUnavailability)" + error);
        });
    return response;
}


function changeInputBorder(validValue, element) {
    if (!validValue) {
        element.classList.add('is-invalid');
    } else {
        element.classList.remove('is-invalid');
    }
}

function configureInputs (valid){
    changeInputBorder(valid, txtEmailOrUsername);
    changeInputBorder(valid, txtPassword);
    if(valid){
        errorCredentials.style.display = "none";
    }else{
        errorCredentials.style.display = "flex";
    }
    
}


async function login() {
    if (!(await validateFields())) return;
    let user = {};

    let exists = {};
    if (isEmail) {
        console.log("email");
        exists = await checkUnavailability('email', txtEmailOrUsername.value);
        user.email = txtEmailOrUsername.value;
    } else if (isUsername) {
        exists = await checkUnavailability('username', txtEmailOrUsername.value);
        user.username = txtEmailOrUsername.value;
    }

    console.log(exists.status);
    if(exists.status == 409){
        configureInputs(false, "Credenciais inválidas");
        return;
    } else if(exists.status == 200){
        configureInputs(true, "");
    }

    user.rawPassword = txtPassword.value;
    console.log(user);
    loginRequest(user);

}

function loginRequest(jsonObject) {
    console.log("loginRequest");
    fetch('http://localhost:8080/api/login/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
    })
        .then(async response => {
            if (!response.ok) {
                configureInputs(false, "Credenciais inválidas");
            } else {
                //Session.setLoggedUser(await response.json());  
               // window.location.href = 'home.html';
            }
        })
        .catch(error => {
            alert("Deu errado! -> (login())" + error);
        });
}


function validateEmailOrUsername(emailOrUsername) {
    isEmail = validator.isEmail(emailOrUsername);
    console.log(isEmail);
    if (isEmail) return;
    isUsername = (emailOrUsername.length >= 5 && emailOrUsername.length <= 20) && (validator.matches(emailOrUsername, "^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$"));
    console.log(isUsername);
}

function validatePassword(password) {
    return (validator.matches(password, /^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_\d]{8,255}$/));
} 
