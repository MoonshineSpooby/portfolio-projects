/*
Date: 04/17/24 Author: Thomas Alden
Summary: PalWorld Sprite Battler
*/
let yourPal
let theirPal
let battleInfoText 
let yourTurn = true
class Pal {
    constructor(imgSrc){
        this.imgSrc = imgSrc;
        this.hp = 100;
        this.attackPower = 25;
        this.healingPower = 18;
        this.name = this.buildNameFromSrc(imgSrc);
        this.updateState()
    }
    attack(target) {
        let damage = Math.round(this.attackPower * (1+(Math.random() * .5)));

        target.takeDamage(damage);
        //dom info block for what happen
        if(this == yourPal) { battleInfoText = `Your `}
        else battleInfoText = `Evil `
        battleInfoText += `${this.name} does ${damage} to `
        if(this == yourPal) { battleInfoText += `the enemy ${this.name}`}
        else battleInfoText += `your ${this.name}`
        if(target.hp <=0) {
            target.death()
        }
    }
    heal() {
        let healingValue = Math.round(this.healingPower * (1+(Math.random() * .5)));
        this.hp +=healingValue
        this.updateState();
        if(this == yourPal) { battleInfoText = `Your `}
        else battleInfoText = `Evil `
        battleInfoText += `${this.name} heals for ${healingValue}. `
    }
    takeDamage(damage) {
        this.hp -= damage;       
        this.updateState(); 
    }
    death() {
        battleInfoText = `${this.name} has died!`
        gameEnd()
    }
    updateState() {
        if(this === yourPal){
            document.querySelector('#yourPalHP').value = this.hp;
        } else document.querySelector('#theirPalHP').value = this.hp;
        
    }
    buildNameFromSrc(imgSrc) {
        let a = imgSrc.split('/');
        let b = a[(a.length - 1)].split('L');
        let c = b[0].split('R');
        let name = c[0];
        let nameArr = name.split('')
        nameArr[0] = nameArr[0].toUpperCase() 
        name = nameArr.join('')
        return name
    }
}
const theirPals = [new Pal('assets/Images/foxparksRight.png'), 
    new Pal('assets/Images/lifmunkRight.png'), new Pal('assets/Images/pengulletRight.png')];

const starterPals = document.querySelectorAll('.starterPals');
starterPals.forEach(pal => pal.addEventListener('click', 
() => goToBattle(pal.src)))

function goToBattle(imgSrc) {
    yourTurn = true;
    yourPal = new Pal(imgSrc);
    const rand = Math.random();
    if (rand < .33) {theirPal = theirPals[0];}
    else if (rand < .66) {theirPal = theirPals[1]}
    else theirPal = theirPals[2]
    document.querySelector('#yourPal').src = imgSrc;
    document.querySelector('#theirPal').src = theirPal.imgSrc
    document.querySelector('#pickYourPalPage').hidden = true;
    document.querySelector('#toHideBattle').hidden = false;

}
function youAttack() {
    if(yourTurn == true){    
        battleInfoText = ""
        yourPal.attack(theirPal)
        document.querySelector("#battleInfo").textContent = battleInfoText 
        yourTurn = false
        document.querySelector('#nextBTN').hidden = false   
    }
}
function youHeal () {
    if(yourTurn == true){    
        battleInfoText = ""
        yourPal.heal(theirPal)
        document.querySelector("#battleInfo").textContent = battleInfoText 
        yourTurn = false
        document.querySelector('#nextBTN').hidden = false   
    }

}
function theirTurn() {
    battleInfoText = ""
    const rand = Math.random()
    if(rand < .66) theirPal.attack(yourPal)
    else theirPal.heal()
    document.querySelector("#battleInfo").textContent = battleInfoText
    yourTurn = true
    document.querySelector('#nextBTN').hidden = true
}
function gameEnd() {
    if(yourPal.hp < 1) {
        document.querySelector('#deathSummaryText').textContent = 
            `Your ${yourPal.name} has been defeated in combat by the Evil ${theirPal.name}... 
            Leaving you defenseless against the ${theirPal.name}...`
    } else {
        document.querySelector('#deathSummaryText').textContent = 
            `Your ${yourPal.name} has defeated the Evil ${theirPal.name}... 
            You collect their spirit globules as a trophy..`}
    document.querySelector('#toHideBattle').hidden = true
    document.querySelector('#gameOverScreen').hidden = false

   
}
function startOver() {
    yourPal = null
    theirPal = null
    theirPals.forEach(pal => pal.hp = 100)
    document.querySelector('#gameOverScreen').hidden = true
    document.querySelector('#pickYourPalPage').hidden = false
    document.querySelector("#battleInfo").textContent = 'Let the battle begin!'
    yourTurn = true
    document.querySelector('#nextBTN').hidden = true
    document.querySelector('#yourPalHP').value = 100;
    document.querySelector('#theirPalHP').value = 100;

}
document.querySelector('#attackBTN').addEventListener('click',
() => youAttack())
document.querySelector('#healBTN').addEventListener('click',
() => youHeal())
document.querySelector('#nextBTN').addEventListener('click',
() => theirTurn())
document.querySelector('#startOverBTN').addEventListener('click', 
() => startOver())
