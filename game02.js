

function GameService()
{
    function Target(name,health,slap,punch,kick)
    //this function creates a target with the properites listed below.
    {
        this.name = name;
        this.health = health;
        this.attacks = 
            {
            "slap":slap,
            "punch":punch,
            "kick":kick
            };

        this.items = []; //this is the array that holds the sheilding items.
        this.hits = 0; //this holds a value corsponding to the number of hits against this target.


    }

    // function Item(name,modifier,description)
    // {
    //     this.name = name;
    //     this.modifier = modifier;
    //     this.description = description;
    // }

    var dataStore = this;   //dataStore is operating here as a alias for the this keyword.
                            //OQ: For what purpose.
    var myTarget = new Target("Scarecrow",100,1,5,10);
    //console.log(myTarget)

    dataStore.attack = function()
        {
            console.log("In dataStore.attack")
            myTarget.health--;
            myTarget.hits++;
            console.log("Health: ",myTarget.health);
            console.log("Hits: ",myTarget.hits);
        }

    dataStore.status = function()
        {
            output = ""
            output = output + `Target Name: ${myTarget.name}` + "\n"
            output = output + `Target Health: ${myTarget.health}`
            console.log(output)
        }

        //return dataStore;

}







