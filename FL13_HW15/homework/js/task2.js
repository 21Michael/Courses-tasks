const SPEED_INCREASE_INTERVAl = 2000,
    SPEED_DECREASE_INTERVAl = 1500,
    MOTO_ENGINE_OVERHEAT_LIMIT = 30,
    MOTO_ENGINE_OVERHEAT_BREAKING = 50;

function Vehicle(color, engine) {
    this._maxSpeed = 70;
    this._color = color;
    this._engine = engine;
    this._model = 'unknown model';
    this._speed = 0;
    this._driving = false;
    this._braking = false;

    this._driveHightSpeed = () => {
        console.log('speed is too high, SLOW DOWN!');
    };
    this._stopZeroSpeed = (maxDriveSpeed) => {
        console.log(`Vehicle is stopped. Maximum speed during the drive was ${maxDriveSpeed}`);
    };

    Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
        this._engine = newEngine;
        this._maxSpeed = maxSpeed;
    };
    Vehicle.prototype.getInfo = function() {
        return { engine: this._engine, color: this._color, maxSpeed: this._maxSpeed, model: this._model };
    };
    Vehicle.prototype.drive = function() {

        if (this._driving) {
            console.log('Already driving');
        } else {

            this._driving = true;
            this._braking = false;
            clearInterval(this._intervalBraking);

            this._intervalDriving = setInterval(() => {
                this._speed += 20;
                if (this._speed < this._maxSpeed) {
                    console.log(this._speed);
                } else {
                    console.log(this._speed);
                    this._driveHightSpeed();
                }
            }, SPEED_INCREASE_INTERVAl);
        }
    };

    Vehicle.prototype.stop = function() {

        if (this._braking) {
            console.log('Already slows down');
        } else {
            let maxDriveSpeed = this._speed;
            this._braking = true;
            this._driving = false;
            clearInterval(this._intervalDriving);

            this._intervalBraking = setInterval(() => {
                if (this._speed > 0) {
                    console.log(this._speed);
                    this._speed -= 20;
                } else {
                    this._braking = false;
                    this._stopZeroSpeed(maxDriveSpeed);
                    clearInterval(this._intervalBraking);
                }
            }, SPEED_DECREASE_INTERVAl);
        }
    };
}

function Car(color, engine, model) {
    Vehicle.call(this, color, engine, model);
    this._maxSpeed = 80;
    this._model = model;
    this._speed = 0;
    this._driving = false;
    this._braking = false;

    this._stopZeroSpeed = (maxDriveSpeed) => {
        console.log(`Car ${this._model} is stopped. Maximum speed during the drive was ${maxDriveSpeed}`);
    };

    Car.prototype.changeColor = function(newColor) {
        newColor !== this._color ? this._color = newColor :
            console.log('The selected color is the same as the previous, please choose another one');
    };
}

Car.prototype = Object.create(Vehicle.prototype);
Object.defineProperty(Car.prototype, 'constructor', { value: 'Car', enumerable: false });


function Motorcycle(color, engine, model) {
    Vehicle.call(this, color, engine, model);
    this._maxSpeed = 90;
    this._model = model;
    this._speed = 0;
    this._driving = false;
    this._braking = false;

    this._driveHightSpeed = () => {
        if (this._speed - this._maxSpeed < MOTO_ENGINE_OVERHEAT_BREAKING) {
            console.log('speed is too high, SLOW DOWN!');
            if (this._speed - this._maxSpeed >= MOTO_ENGINE_OVERHEAT_LIMIT) {
                console.log('Engine overheating');
            }
        } else {
            Vehicle.prototype.stop.call(this);
        }
    };

    this._stopZeroSpeed = () => {
        console.log(`Motorcycle ${this._model} is stopped. Good drive`);
    };

    Motorcycle.prototype.drive = function() {
        const drive = () => {
            Vehicle.prototype.drive.call(this);
        };

        if (this._driving) {
            drive();
        } else {
            console.log('Let’s drive');
            drive();
        }
    };
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Object.defineProperty(Motorcycle.prototype, 'constructor', { value: 'Car', enumerable: false });

