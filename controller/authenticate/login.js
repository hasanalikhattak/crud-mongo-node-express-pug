var login =function(user,password){

    console.log(user,password)
    if(user==="hasan@ali" && password==="ali@hasan"){
        return true;
    }
    else{
        return false;
    }
}

module.exports=login;