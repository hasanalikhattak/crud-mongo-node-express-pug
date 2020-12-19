var login = function(username, password){
    console.log(username,password)
    if(username==="hasan" && password === "ali"){
        return true;
    } else {
        return false;
    }
}
module.exports=login;