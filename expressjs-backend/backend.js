const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const userServices = require('./models/user-services')
const jwtToken = require('./models/jwt-token');

const https = require('https');
const fs = require('fs');

app.use(cors());
app.use(express.json());



app.post('/account/login', async (req, res) => {
// app.post('/account/login', jwtToken.authenticateToken, async (req, res) => {

    try{
        const username = req.body.value.username;
        const password = req.body.value.password;
        //let user = findUser(username, password);
        //const user = await userServices.findUser(username, password);
        const user = await userServices.loginCheck(username, password);

        if(user){
            //const token = generateAccessToken({ username: req.body.username });
           // res.json(token);
            //const token = '2342f2f1d131rf12';
            //// res.status(201).send(user);

            const token = jwtToken.generateAccessToken({ username: username });

            // res.status(201).json({token, Username, Password});
            // res.status(201).json({token, username, password});
            res.status(201).send({username, password, token});
            // res.status(201).send(token);

        }
        else{
            res.status(400).end();
        }
    }
    catch{
        res.status(404).send('Internal server error');
    }
});

app.post('/account/register', async (req, res) => {
    // const User = req.body;

    // const Username = req.body.value.username;
    // const PhoneNumber = req.body.value.phoneNumber
    // const Password = req.body.value.password;
    // const confirmPassword = req.body.value.confirmPassword;

    // const Username = req.body.username;
    // const PhoneNumber = req.body.phoneNumber
    // const Password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;

    const Username = req.body.user.username;
    const PhoneNumber = req.body.user.phoneNumber
    const Password = req.body.user.password;
    const confirmPassword = req.body.user.confirmPassword;

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
        
        // alert("I11");
        //let user = findUserByUsername(Username);
        // const user = await userServices.findUserByUsername(Username);
        const user = await userServices.userExistsCheck(Username);
        
        // alert("I12");

        if(user === true){
            res.status(400).json({message: 'Username already exists.'});
        }
        else{
            ////account['account_list'].push({username: Username, password: Password});
            ////res.status(201).json(account);
            
            // alert("I13");
            let Token = jwtToken.generateAccessToken({ Username });
            // const Token = jwtToken.generateAccessToken({ username: Username });
            // const Token = jwtToken.generateAccessToken({ username: req.body.value.username });
            //res.json(token);

            // alert("I14");
            // const newUser = await userServices.addUser({
            //     username: Username, password: Password, phoneNumber: PhoneNumber, token: Token});
            // const newUser = await userServices.addUser(User);
            const newUser = await userServices.addUser({Username, Password, PhoneNumber});
            // alert("I15");
            // res.status(201).send(newUser);
            res.status(201).send(Token);
        }
        
    }
});

app.get('/account/users', async (req, res) => {
    ////res.send(account);
    const result = await userServices.getAllUsers();
    res.status(201).send(result);
});

app.get('account/users/:username', async (req, res) => {
    const Username = req.params['username'];
    ////let result = findUserByUsername(username);
    const result = await userServices.findUserByUsername(Username);
    if(result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
    }
    else{
        ////result = {account_list: result};
        ////res.send(result);
        res.status(201).send(result);
    }
});


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

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });      

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
  });