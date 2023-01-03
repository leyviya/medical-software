# yourhospital
An easy to use, simple and awesome hospital management software built using Java Spring Boot and AngularJS

## Demo View
[![Demo CountPages alpha](https://j.gifs.com/2x0NYW.gif)](https://www.youtube.com/watch?v=DgwLARbsPxw)

## Usage
The software is pretty easy to use, head to the release section to download the distribution zip file.
In the archive, there's a *bin* folder, to run the software, simply ensure the following
- Mysql is running on port 3306
- Mysql root user with no password is active (You can change this in the code anyway)
- Mysql has a database name _yourhospital_
After these condition are met, run the software as thus
```shell
$ bin/yourhospital
```
That should start the server which will in turn connect to mysql for hibernate DBA OPs.
Wait till the string _'Server started successfully'_ appears on the server's console output, then open your favouraite browser.
Head to *http://localhost:8080*, there you have it, the working software! 

I hope this explanation works! Raise an issue if you do have one please.

With Love, Ephraimd
