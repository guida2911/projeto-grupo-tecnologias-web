document.addEventListener('onsubmit', (e) => {
    e.preventDefault();
})

let passwords = [admin, user]
let usernames = [admin, user]
let user_login_name; let user_login_pass
let user_register_name; let user_register_confirm_name; let user_register_pass; let user_register_confirm_pass

let userlogged = false; let accountlogged = ""

let register_verified = 1

function Login(){
    user_login_name =  document.querySelector("#login_name").value 
    user_login_pass = document.querySelector("#login_pass").value
    for(let i = 0;i<usernames.length;i++){
        if(passwords[i] == user_login_pass && usernames[i] == user_login_name){
            userlogged = true
            accountlogged = usernames[i]
            return(true);
        }
    }
return false;
}

function Register(){
    user_register_name =  document.querySelector("#register_name").value
    user_register_confirm_name = document.querySelector("#register_confirm_name").value 
    user_register_pass = document.querySelector("#register_pass").value
    user_register_confirm_pass = document.querySelector("#register_pass").value
    if(user_register_name == user_register_confirm_name && user_register_pass == user_register_confirm_pass){
    for(let i = 0;i<usernames.length;i++){
        if(usernames[i] == user_register_name){
           register_verified = 0
        }
        if(register_verified == 1){
            usernames.push(user_register_name)
            passwords.push(user_register_pass)
            userlogged = true
            accountlogged = user_register_name
            alert("Conta criada com sucesso!")
        } else{alert("Já existe uma conta com esse nome!")}
        register_verified = 1
    }
} else{alert("Certifique-se de que a password e o confirmar password são iguais.")}
return false;
}

function Espet(){
document.body.innerHTML = ("")
}