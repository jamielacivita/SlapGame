
//var health = 100;
//var name = "target";
//var hits = 0;

function Target(name,health,hits)
{
    this.name = name;
    this.health = health;
    this.hits = hits;
    this.items = []
    this.addMods = function()
    {   
        sum = 0
        if (this.items.length == 0) {return 0;} //Return zero if there are no items.
        for (var i = 0; i < this.items.length; i++)
        {
            item = this.items[i];
            //console.log("item",item)
            sum = sum + item.modifier;
        }
        return sum;
    }
}



function Item(name,modifier,description)
{
    this.name = name;
    this.modifier = modifier;
    this.description = description;
}



function slap()
{
    myTarget.health = myTarget.health - (1*myTarget.addMods())
    //health = health - 1;
    myTarget.hits = myTarget.hits + 1
    //hits = hits + 1;
    //alert(health)
    update()
    console.log("slap called: health reduction: " + (1*myTarget.addMods()))
}

function punch()
{
    myTarget.health = myTarget.health - (5*myTarget.addMods())
    //health = health - 1;
    myTarget.hits = myTarget.hits + 1
    //alert(health)
    update()
    console.log("slap called: health reduction: " + (5*myTarget.addMods()))
}

function kick()
{
    myTarget.health = myTarget.health - (10*myTarget.addMods())
    //health = health - 1;
    myTarget.hits = myTarget.hits + 1
    //alert(health)
    update()
    console.log("slap called: health reduction: " + (10*myTarget.addMods()))
}

function update()
{
    var healthScore = document.getElementById("health")
    healthScore.innerText = myTarget.health;

    var healthScore = document.getElementById("hits")
    healthScore.innerText = myTarget.hits;
}

//create a target
myTarget = new Target("target",100,0);

var items = 
{
shield: new Item("Shield",0.3,"This is an awsome shield!"),
helmet: new Item("Helmet",0.2,"This is an awsome helmet!"),
gauntlet: new Item("Gauntlet",0.1,"This is an awsome pair of gauntlets!")
}

function addShield()
{
    myTarget.items.push(items.shield)
    console.log("A shield has been added to the target")
    console.log("current addMods result:",myTarget.addMods())
}

function addHelmet()
{
    myTarget.items.push(items.helmet)
    console.log("A helmet has been added to the target")
    console.log("current addMods result:",myTarget.addMods())
}

function addGauntlets()
{
    myTarget.items.push(items.gauntlet)
    console.log("A helmet has been added to the target")
    console.log("current addMods result:",myTarget.addMods())
}

//add a sheild to the target.
//myTarget.items.push(items.shield)
//console.log(myTarget)
//console.log("result of add mods: ", myTarget.addMods())

update()