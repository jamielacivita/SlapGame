myTarget = new Target("target",100,0,true);

var items = 
{
shield: new Item("Shield",0.5,"This is an awsome shield!",5),
helmet: new Item("Helmet",0.3,"This is an awsome helmet!",5),
gauntlet: new Item("Gauntlet",0.1,"This is an awsome pair of gauntlets!",5)
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
    //This function returns the shielding value.
    //Shielding values range from 0% to 100%
    //A target with a higher shielding value takes less damage under attack.
    //A target with 100% shielding takes no damage under attack.
     
    {   
        sum = 0
        if (this.items.length == 0) {return 0;} //Return zero if there are no items.
        for (var i = 0; i < this.items.length; i++)
        {
            item = this.items[i];
            sum = sum + item.modifier;
        }
        return sum;
    }
}

function Item(name,modifier,description,strength)
{
    this.name = name;
    this.modifier = modifier;
    this.description = description;
    this.strength = strength;
}

function attack(damageToTarget)
{
    console.log("damageToTarget: ", damageToTarget);
    console.log("applicable mods: ", myTarget.addMods());

    var netDamage = damageToTarget * (1-myTarget.addMods());
    myTarget.health = myTarget.health - netDamage;
    console.log("netDamage: ", netDamage);
    myTarget.hits++;

    if (damageToTarget >= 5)
        {stressItem(myTarget);}

    update()
}

function slap()
{
    //calculate raw damage value.
    if (myTarget.randomDamage)
    {damageToTarget = getRandomInt(1,3);}
    else 
    {damageToTarget = 1;}

    attack(damageToTarget)
}

function punch()
{
    if (myTarget.randomDamage)
    {damageToTarget = getRandomInt(5,7);}
    else 
    {damageToTarget = 5;}

    attack(damageToTarget)
}

function kick()
{
    if (myTarget.randomDamage)
    {damageToTarget = getRandomInt(8,12);}
    else 
    {damageToTarget = 10;}

    attack(damageToTarget)
}

function update()
{
    var healthScore = document.getElementById("health")
    var healthValue = myTarget.health;
    if (healthValue > 0)
    {healthScore.innerText = myTarget.health.toFixed(1);}
    else 
    {healthScore.innerText = "K.O.";}

    var hitsScore = document.getElementById("hits")
    hitsScore.innerText = myTarget.hits;

    //update progress bar
    var progressBar = document.getElementById("healthBar")
    var txt_health = "width:"+myTarget.health+"%"
    //console.log("txt_health:",txt_health)
    progressBar.setAttribute("style",txt_health)

    //update shielding bar
    var display_text = "Shielding Items: "
    var txt_Shielding = document.getElementById("txt_Shielding")
    for (var i=0;i<myTarget.items.length;i++)
        {
            //console.log("126 : inside loop.")
            item = myTarget.items[i];
            display_text += item.name+" ";
        }
    txt_Shielding.innerHTML = display_text;

    var progressBar = document.getElementById("shieldBar")

    // var txt_shield = "width:"+myTarget.addMods()+"%"
    // console.log("txt_shield:",txt_shield)
    var shieldPercentage = (myTarget.addMods())*100
    //shieldPercentage = shieldPercentage;
    //console.log("shield percentage: ",shieldPercentage)
    var txt_shield = "width:"+shieldPercentage+"%";
    progressBar.setAttribute("style",txt_shield)
}

function reset()
{
    myTarget.hits = 0;
    myTarget.health = 100;
    myTarget.items = []
    update()
}

function addProtectionToTarget(protectionItem)
{
    console.log("149 : in addProtectionToTarget")
    var current_shielding = myTarget.addMods();
    var shielding_to_add = protectionItem.modifier;
        if (current_shielding + shielding_to_add <= 1)  //verify we are not shielding past 100%
        {                                           //if we are not...
        myTarget.items.push(protectionItem)           //add to myTarget items array.
        console.info("A shield has been added to the target")
        console.info("current addMods result:",myTarget.addMods())
        }
    else
        {
        console.warn("A shield has not been added to the target.");
        console.warn("proposed shielding too great",current_shielding + shielding_to_add);
        } 
        update()   
}

function addShield()
{
   //addProtectionToTarget(items.shield)
   addProtectionToTarget(new Item("Shield",0.5,"This is an awsome shield!",5)) 
}

function addHelmet()
{
   //addProtectionToTarget(items.helmet) 
   addProtectionToTarget(new Item("Helmet",0.3,"This is an awsome helmet!",5))
}

function addGauntlets()
{
    //addProtectionToTarget(items.gauntlet)
    addProtectionToTarget(new Item("Gauntlet",0.1,"This is an awsome gauntlet!",5))
}

function getRandomInt(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stressItem(attackedTarget)
{
    console.log("in stressItem")
    //attacked target is a target object.
    //verify it has a shelding item.
    if (attackedTarget.items.length > 0)
    {
        console.log("there is sheilding.")
        var itemHit = attackedTarget.items[0]
        console.log("Item hit", itemHit)
        console.log("Strength before reduciton", itemHit.strength)
        itemHit.strength--;
        console.log("Strength after reduciton", itemHit.strength)

        //check to see if item has been destroyed (i.e. strenght = 0)
        if (itemHit.strength == 0)
        {
            console.log("Item has been destroyed.  Needs to be removed from items list.")
            attackedTarget.items.shift()
            console.log("Item has been removed.")
        }

    }
}


addButton("Slap","slap()")
addButton("Punch","punch()")
addButton("Kick","kick()")

addButton("Add Shield","addShield()")
addButton("Add Helmet","addHelmet()")
addButton("Add Gauntlets","addGauntlets()")
addButton("RESET","reset()")


update()

//Done: K.O. Notification: Make a notification apear on the screen once the target's health reaches 0  
//Done: Damage Indicator: Most games have not only a number but a health bar, how could you create one for your target (checkout Bootstraps Progress Bars)
//Done: Reset: Your user should have a way to start the game over without having to refresh the page.
//Done: Randomize damage: Maybe each hit does a damage within a certain range instead of a static number?
//Done: Limit items being used: How could you only allow so many items to be used at a time to prevent users stacking up 100 modifiers
//Done: Reset should reset shields value as well. 
//Done: Fix the hits counter.
//Done: Use bootstrap grid to position items on the screen.
//Done: Limit each items number of uses: Should each shield be permenant or does it break after so many hits?



//GUI for what items are active: How does the user know what modifiers are active and their total affect?
//Hit Animation: How could you make something happen everytime you clicked to hit your target? A pop up animation or maybe the picture moves?



