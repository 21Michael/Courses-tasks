const SPEED_INCREASE_INTERVAl = 2000,
    SPEED_DECREASE_INTERVAl = 1500,
    MOTO_SPEED_DIFF_LIMITSPEED = 30,
    MOTO_SPEED_DIFF_OVERHEAT = 50;

function Vehicle(color, engine) {
    this._maxSpeed = 70;
    this._color = color;
    this._engine = engine;
    this._model = 'unknown model';
    this._speed = 0;
    this._driving = false;
    this._braking = false;

    this._hightSpeedAlert = () => {
        console.log('speed is too high, SLOW DOWN!');
    };
    this._fullStopAlert = (maxDriveSpeed) => {
        console.log(`Vehicle is stopped. Maximum speed during the drive was ${maxDriveSpeed}`);
    };

    const startDriving = function() {
        this._driving = true;
        this._braking = false;
        clearInterval(this._intervalBraking);

        this._intervalDriving = setInterval(() => {
            this._speed += 20;
            if (this._speed < this._maxSpeed) {
                console.log(this._speed);
            } else {
                console.log(this._speed);
                this._hightSpeedAlert();
            }
        }, SPEED_INCREASE_INTERVAl);
    };
    const startStoping = function() {
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
                this._fullStopAlert(maxDriveSpeed);
                clearInterval(this._intervalBraking);
            }
        }, SPEED_DECREASE_INTERVAl);
    };

    Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
        this._engine = newEngine;
        this._maxSpeed = maxSpeed;
    };
    Vehicle.prototype.getInfo = function() {
        return { engine: this._engine, color: this._color, maxSpeed: this._maxSpeed, model: this._model };
    };
    Vehicle.prototype.drive = function() {
        this._driving ? console.log('Already driving') : startDriving.call(this);
    };
    Vehicle.prototype.stop = function() {
        this._braking ? console.log('Already slows down') : startStoping.call(this);
    };
}

function Car(color, engine, model) {
    Vehicle.call(this, color, engine);
    this._maxSpeed = 80;
    this._model = model;

    this._fullStopAlert = (maxDriveSpeed) => {
        console.log(`Car ${this._model} is stopped. Maximum speed during the drive was ${maxDriveSpeed}`);
    };

    Car.prototype.changeColor = function(newColor) {
        newColor !== this._color ? this._color = newColor :
            console.log('The selected color is the same as the previous, please choose another one');
    };
}
Object.setPrototypeOf(Car.prototype, Vehicle.prototype);

function Motorcycle(color, engine, model) {
    Vehicle.call(this, color, engine);
    this._maxSpeed = 90;
    this._model = model;

    this._hightSpeedAlert = () => {
        const speedDifference = this._speed - this._maxSpeed;
        if (speedDifference < MOTO_SPEED_DIFF_OVERHEAT) {
            console.log('speed is too high, SLOW DOWN!');
            speedDifference >= MOTO_SPEED_DIFF_LIMITSPEED ? console.log('Engine overheating') : 0;
        } else {
            Vehicle.prototype.stop.call(this);
        }
    };

    this._fullStopAlert = () => {
        console.log(`Motorcycle ${this._model} is stopped. Good drive`);
    };

    Motorcycle.prototype.drive = function() {
        const drive = Vehicle.prototype.drive.bind(this);
        this._driving ? drive() : (console.log('Let’s drive'), drive());
    };
}
Object.setPrototypeOf(Motorcycle.prototype, Vehicle.prototype);