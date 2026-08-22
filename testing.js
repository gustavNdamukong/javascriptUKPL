
function Car(name, fuel)
{
    this.name = name;
    this.fuel = fuel;

    this.getName = function()
    {
        return this.name;
    }   

    this.getType = function()
    {
        return this.name+'-'+this.fuel;
    }

    this.multiply = function(first, second)
    {
        return (first * second);
    }

    this.resolve = function(first, second)
    {
        return this.multiply(first, second);
        //return (first * second);
    }
}

function Motorbike(name, fuel)
{
    this.name = name;
    this.fuel = fuel;

    this.getName = function()
    {
        return this.name;
    }

    this.multiply = function(first, second)
    {
        return (first / second);
    }
}

let car = new Car('Mercedes', 'petrol');
let bike = new Motorbike('Harley Davidson', 
    'petrol');

let divide = car.resolve.bind(bike, 6, 3);
alert(divide());
//I expect the popup to say 'Mercedes'

//alert(bike.getName());
//I expect the popup to say 'Harley Davidson'

//alert("JavaScript is working!");