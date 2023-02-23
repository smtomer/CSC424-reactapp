# CSC424-reactapp

The first vulnerability that I fixed was a Cross-site Scripting one.
![image](https://user-images.githubusercontent.com/100058418/220991792-0bb65b3c-98a5-40e8-987a-80fc668db4a9.png)
I fixed this by using express-validator to validate and sanitize the Username parameter before using it in the database and using encodeURI to encode the result.


The second vulnerability that I fixed was Information Exposure.
![image](https://user-images.githubusercontent.com/100058418/220984875-e0c7a91e-1c50-4290-97d8-f7811337bfc4.png)
Which I fixed by using the Helmet middleman.
