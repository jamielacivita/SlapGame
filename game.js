
var health = 100;
var name = "target";
var hits = 0;

function slap()
{
    health = health - 1;
    hits = hits + 1;
    //alert(health)
    update()
}

function punch()
{
    health = health - 5;
    hits = hits + 1;
    //alert(health)
    update()
}

function kick()
{
    health = health - 10;
    hits = hits + 1;
    //alert(health)
    update()
}

function update()
{
    var healthScore = document.getElementById("health")
    healthScore.innerText = health

    var healthScore = document.getElementById("hits")
    healthScore.innerText = hits
}


