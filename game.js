myTarget = new Target("target",100,0,true);

var items = 
{
shield: new Item("Shield",0.5,"This is an awsome shield!"),
helmet: new Item("Helmet",0.3,"This is an awsome helmet!"),
gauntlet: new Item("Gauntlet",0.1,"This is an awsome pair of gauntlets!")
}

function addButton(btnText,btnMethod)
{
    //create an anchor
    var myA = document.createElement("a");
    myA.setAttribute("href","#")
    myA.setAttribute("onClick",btnMethod) 
    myA.innerText=btnText;

    //attach anchor to list element
    var myLI = document.createElement("li");
    myLI.appendChild(myA)

    //attach element to navBar
    var navbarUL = document.getElementById("navButtons")
    navbarUL.appendChild(myLI)
}

function Target(name,health,hits,randomDamage)
{
    this.name = name;
    this.health = health;
    this.hits = hits;
    this.items = []
    this.randomDamage = randomDamage
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
    if (myTarget.randomDamage)
    {damageToTarget = getRandomInt(1,3);}
    else 
    {damageToTarget = 1;}

    console.log("damageToTarget: ", damageToTarget);
    console.log("applicable mods: ", myTarget.addMods());

    var netDamage = damageToTarget * myTarget.addMods();
    myTarget.health = myTarget.health - netDamage;
    console.log("netDamage: ", netDamage);
    update()
}

function punch()
{
    if (myTarget.randomDamage)
    {damageToTarget = getRandomInt(5,7);}
    else 
    {damageToTarget = 5;}

    console.log("damageToTarget: ", damageToTarget);
    console.log("applicable mods: ", myTarget.addMods());

    var netDamage = damageToTarget * myTarget.addMods();
    myTarget.health = myTarget.health - netDamage;
    console.log("netDamage: ", netDamage);
    update()
}

function kick()
{
    if (myTarget.randomDamage)
    {damageToTarget = getRandomInt(8,12);}
    else 
    {damageToTarget = 10;}

    console.log("damageToTarget: ", damageToTarget);
    console.log("applicable mods: ", myTarget.addMods());

    var netDamage = damageToTarget * myTarget.addMods();
    myTarget.health = myTarget.health - netDamage;
    console.log("netDamage: ", netDamage);
    update()
}

function update()
{
    var healthScore = document.getElementById("health")
    var healthValue = myTarget.health;
    if (healthValue > 0)
    {healthScore.innerText = myTarget.health;}
    else 
    {healthScore.innerText = "K.O.";}

    var hitsScore = document.getElementById("hits")
    hitsScore.innerText = myTarget.hits;

    //update progress bar
    var progressBar = document.getElementById("healthBar")
    var txt_health = "width:"+myTarget.health+"%"
    console.log("txt_health:",txt_health)
    progressBar.setAttribute("style",txt_health)

    //update shielding bar
    var progressBar = document.getElementById("shieldBar")

    // var txt_shield = "width:"+myTarget.addMods()+"%"
    // console.log("txt_shield:",txt_shield)
    var shieldPercentage = myTarget.addMods()
    shieldPercentage = shieldPercentage * 100;
    console.log("shield percentage: ",shieldPercentage)
    var txt_shield = "width:50%";
    progressBar.setAttribute("style",txt_shield)

}

function reset()
{
    myTarget.hits = 0;
    myTarget.health = 100;
    update()
}

function addShield()
{
    console.log(items)
    myTarget.items.push(items.shield)
    console.log("A shield has been added to the target")
    console.log("current addMods result:",myTarget.addMods())
}

function addHelmet()
{
    console.log(items)
    myTarget.items.push(items.helmet)
    console.log("A helmet has been added to the target")
    console.log("current addMods result:",myTarget.addMods())
}

function addGauntlets()
{
    console.log(items)
    myTarget.items.push(items.gauntlet)
    console.log("A gauntlets has been added to the target")
    console.log("current addMods result:",myTarget.addMods())
}

function getRandomInt(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

addButton("Slap","slap()")
addButton("Punch","punch()")
addButton("Kick","kick()")

addButton("Add Shield","addShield()")
addButton("Add Helmet","addHelmet()")
addButton("Add Gauntlets","addGauntlets()")
addButton("RESET","reset()")


update()
console.log(myTarget)

//Done: K.O. Notification: Make a notification apear on the screen once the target's health reaches 0  
//Done: Damage Indicator: Most games have not only a number but a health bar, how could you create one for your target (checkout Bootstraps Progress Bars)
//Done: Reset: Your user should have a way to start the game over without having to refresh the page.
//Done: Randomize damage: Maybe each hit does a damage within a certain range instead of a static number?
//Put Progress bar at bottom of screen.
//Hit Animation: How could you make something happen everytime you clicked to hit your target? A pop up animation or maybe the picture moves?
//Limit items being used: How could you only allow so many items to be used at a time to prevent users stacking up 100 modifiers
//Limit each items number of uses: Should each shield be permenant or does it break after so many hits?
//GUI for what items are active: How does the user know what modifiers are active and their total affect?



