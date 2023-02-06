const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const account = {
    account_list:
    [
        {
            // token : '2342f2f1d131rf12',
            username : 'user',
            password : 'pass',
        }
    ]
}

app.use(cors());
app.use(express.json());


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.get('/Home', (req, res) => {
//     res.send('Home');
// });

// app.get('/Login', (req, res) => {
//     res.send('Login');
// });

app.post('/account/login', (req, res) => {
    try{
        const username = req.body.value.username;
        const password = req.body.value.password;
        let user = findUser(username, password);
        if(user){
            const token = '2342f2f1d131rf12';
            // res.status(201).send(user);
            res.status(201).json({token, username, password});
        }
        else{
            res.status(400).end();
        }
    }
    catch{
        res.status(404).send('Internal server error');
    }
});

app.post('/account/register', (req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(Password != confirmPassword){
        res.status(400).json({message: 'Passwords do not match'});
    }
    else if(!containsUppercase(Password)){
        res.status(400).json({message: 'Passwords require an uppercase letter'});
    }
    else if(!containsNumbers(Password)){
        res.status(400).json({message: 'Passwords require a number'});
    }
    else if(!containsSpecialChar(Password)){
        res.status(400).json({message: 'Passwords require a special character'});
    }
    else {
        let user = findUserByUsername(Username);
        if(user){
            res.status(400).json({message: 'Username already exists.'});
        }
        else{
            account['account_list'].push({username: Username, password: Password});
            // account['account_list'].push(u);

            res.status(201).json(account);
        }
        
    }
});



// app.post('/register', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     if(username != undefined && password != undefined){
//         let result = finduser(username,password);
//         result = {account_list: result};
//         res.send(result);
//     }
//     else{
//         res.status(404).send('Username or Password is incorrect');
//     }
    
//     console.log("app.post");
// });

function findUser(username, password) {
    return account['account_list'].find( (user) => 
    user['username'] === username && user['password'] === password);
}

function findUserByUsername(username) {
    return account['account_list'].find( (user) => 
    user['username'] === username);
}

function containsUppercase(str) {
    return /[A-Z]/.test(str);
}
function containsNumbers(str) {
    return /\d/.test(str);
}
function containsSpecialChar(str) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(str);
}

app.get('/account/users', (req, res) => {
    res.send(account);
});

app.get('account/users/:username', (req, res) => {
    const username = req.params['username'];
    let result = findUserByUsername(username);
    if(result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
    }
    else{
        result = {account_list: result};
        res.send(result);
    }
});



// function makeId(){
//     var c = require("crypto");
//     var id = c.randomBytes(3).toString('hex');
//     return id;
// }

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      
