function Control()
{
    var model = new Model()

    model.getTargetStatus()

    this.slap = function()
    {
    model.attack(5)
    model.getTargetStatus()
    }   

    this.punch = function()
    {
    model.attack(10)
    model.getTargetStatus()
    }   

    this.kick = function()
    {
    model.attack(20)
    model.getTargetStatus()
    }   

    this.addGauntlets = function()
    {
    model.addGauntlets()
    model.getTargetStatus()
    }  

    this.addHelmet = function()
    {
    model.addHelmet()
    model.getTargetStatus()
    }  

    this.addShield = function()
    {
    model.addShield()
    model.getTargetStatus()
    }  












    this.reset = function()
    {
    model.reset()
    }

}