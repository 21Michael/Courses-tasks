function Fighter() {

    let context = this;

    class Fighter {
        constructor(arg) {
            context.name = arg.name;
            context.damage = arg.damage;
            context.totalHp = arg.hp;
            context.hp = arg.hp;
            context.strength = arg.strength;
            context.agility = arg.agility;
            context.wins = 0;
            context.losses = 0;
        }
        getName() {
            return context.name;
        }
        getDamage() {
            return context.damage;
        }
        getStrength() {
            return context.strength;
        }
        getAgility() {
            return context.agility;
        }
        getHealth() {
            return context.hp;
        }
        attack(enemyFighter) {
            let probability = Math.floor(Math.random() * 100);
            100 - (enemyFighter.getStrength() + enemyFighter.getAgility()) > probability ?
                (
                    enemyFighter.dealDamage(context.damage),
                    console.log(`${context.name} makes ${context.damage} damage to ${this.getName()}`)
                ) :
                console.log(`${context.name} attack missed`);
        }
        logCombatHistory() {
            console.log(`Name: ${context.name}, Wins: ${context.wins}, Losses: ${context.losses}`);
        }
        heal(addHeal) {
            context.hp + addHeal < context.totalHp ? context.hp += addHeal : context.hp = context.totalHp;
        }
        dealDamage(damage) {
            context.hp - damage >= 0 ? context.hp -= damage : context.hp = 0;
        }
        addWin() {
            context.wins += 1;
        }
        addLoss() {
            context.losses += 1;
        }
    }
    return new Fighter(...arguments);
}

const myFighter = new Fighter({ name: 'Maximus', damage: 20, hp: 100, strength: 20, agility: 15 });
const myFighter2 = new Fighter({ name: 'Maximus2', damage: 25, hp: 90, strength: 25, agility: 20 });

let battle = (Fighter1, Fighter2) => {
    let startAttack = (Fighter1, Fighter2) => {
        if (Fighter1.getHealth() === 0) {
            Fighter2.addWin();
            Fighter1.addLoss();
            console.log(`${Fighter2.getName()} has won`);
        } else if (Fighter2.getHealth() === 0) {
            Fighter1.addWin();
            Fighter2.addLoss();
            console.log(`${Fighter1.getName()} has won`);
        } else {
            Fighter1.attack(Fighter2);
            startAttack(Fighter2, Fighter1);
        }
    };
    if (Fighter1.getHealth() === 0) {
        console.log(`${Fighter1.getName()} is dead and can't fight`)
    } else if (Fighter2.getHealth() === 0) {
        console.log(`${Fighter2.getName()} is dead and can't fight`)
    } else {
        startAttack(Fighter1, Fighter2);
    }
};


