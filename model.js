function Model()
{
//Model Data in this Section

var myTarget = new Target("target",100,0,true);


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
        sumOfShielding = 0
        if (this.items.length == 0) {return 0;} //Return zero if there are no items.
        for (var i = 0; i < this.items.length; i++)
        {
            item = this.items[i];
            sumOfShielding = sumOfShielding + item.modifier;
        }
        return sumOfShielding;
    }
}

function Item(name,modifier,description,strength)
{
    this.name = name;
    this.modifier = modifier;
    this.description = description;
    this.strength = strength;
}

function getRandomInt(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Functions that modify the model below this point.

function stressItem(attackedTarget)
//This is a private function called as part of attack.
{
    //verify it has a shelding item.
    if (attackedTarget.items.length > 0)
    {
        console.log("There is sheilding.")
        var itemHit = attackedTarget.items[0]
        console.log("Item hit", itemHit.name)
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


function update()
{
    //update health score
    var healthScore = document.getElementById("health")
    var healthValue = myTarget.health;
    if (healthValue > 0)
    {healthScore.innerText = myTarget.health.toFixed(1);}
    else 
    {healthScore.innerText = "K.O.";}

    //update hits score
    var hitsScore = document.getElementById("hits")
    hitsScore.innerText = myTarget.hits;

    //update health progress bar
    var progressBar = document.getElementById("healthBar")
    var txt_health = "width:"+myTarget.health+"%"
    progressBar.setAttribute("style",txt_health)

    //update shielding bar
    var display_text = "Shielding Items: "
    var txt_Shielding = document.getElementById("txt_Shielding")

    //update display of sheilding elements
    for (var i=0;i<myTarget.items.length;i++)
        {
            item = myTarget.items[i];
            display_text += item.name+" ";
        }
    txt_Shielding.innerHTML = display_text;

    //update display of sheilding bar
    var progressBar = document.getElementById("shieldBar")
    var shieldPercentage = (myTarget.addMods())*100
    var txt_shield = "width:"+shieldPercentage+"%";
    progressBar.setAttribute("style",txt_shield)
}

function addProtectionToTarget(protectionItem)
{
    var item_name = protectionItem.name;
    var current_shielding = myTarget.addMods();
    var shielding_to_add = protectionItem.modifier;
        if (current_shielding + shielding_to_add <= 1)  //verify we are not shielding past 100%
        {                                           //if we are not...
        myTarget.items.push(protectionItem)           //add to myTarget items array.
        console.info(`A ${item_name} has been added to the target`)
        console.info("current addMods result:",myTarget.addMods())
        }
    else
        {
        console.warn(`A ${item_name} has not been added to the target.`);
        console.warn("proposed shielding too great",current_shielding + shielding_to_add);
        } 
        update()   
}


this.reset = function()
{
    myTarget.hits = 0;
    myTarget.health = 100;
    myTarget.items = []
    update()
}


this.attack = function(damageToTarget)
{
    //If random damage is true we reduce the effectiveness of the attack
    //by a random amount.
if (myTarget.randomDamage)
    {
        randomDamageModifier = getRandomInt(0,damageToTarget)
        damageToTarget = damageToTarget - randomDamageModifier;
    }

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



this.addGauntlets = function()
{
    addProtectionToTarget(new Item("Gauntlet",0.1,"This is an awsome gauntlet!",1))
}


this.addHelmet = function()
{
    addProtectionToTarget(new Item("Helmet",0.2,"This is an awsome helment!",3))
}

this.addShield = function()
{
    addProtectionToTarget(new Item("Shield",0.5,"This is an awsome shield!",5))
}

//This is just a helper function for debugging.
this.getTargetStatus = function()
{
    console.log("Name: ",myTarget.name)
    console.log("Health: ",myTarget.health)
    console.log("Hits: ",myTarget.hits)
    console.log("RandomDamage: ",myTarget.randomDamage)
}







}