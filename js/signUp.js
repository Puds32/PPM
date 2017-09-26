AWS.config.region='eu-west-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'eu-west-2:a2bd7b68-8131-4d4c-b39a-102f0de57a4e'});

var lambda = new AWS.Lambda();

function signup(){
    var result = document.getElementById('result');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var verifyPassword = document.getElementById('verify-password');

    result.innerHTML = 'Sign Up ...';

    if(email.nodeValue == null || email.nodeValue == ''){
        result.innerHTML = 'Please specify your email address.';
    }else if(password.nodeValue == null || password.nodeValue == ''){
        result.innerHTML = 'Please specify a password.';
    }else if(password.nodeValue != verifyPassword.nodeValue){
        result.innerHTML = 'Passwords are <b>different</b>, please check.'
    }else{
        var input = {email: email.nodeValue, password: password.nodeValue};

        lambda.invoke({
            FunctionName: 'createUser', Payload: JSON.stringify(input)
        }, function(err, data){
            if(err) console.log(err, err.stack);
            else{
                var output = JSON.parse(data.Payload);
                if(output.created){
                    result.innerHTML = 'User ' + input.email + 'created. Please check your email to validate the user and enable login.';
                } else {result.innerHTML = 'User <b>not</b> created.'}
            }
        });
    }
}

var form = document.getElementById('signUp-form');
form.addEventListener('submit', function(evt){
evt.preventDefault();
signup();
});