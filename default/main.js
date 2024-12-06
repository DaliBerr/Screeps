var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHauler = require('role.hauler');
var roleEmergency = require('role.emergency');
var roleSoldier = require('role.soldier');
var roleArmy = require('role.army');
var roleOutHarvester = require('role.outharvester');
var roleTowerKeeper = require('role.towerkeeper');
var roleEmergencyHarvester = require('role.emergencyharvester');
var rampartRepairIndex = 0;
module.exports.loop = function (){

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    console.log('Haulers: '+ haulers.length);

    var emergencys = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergency');
    console.log('Emergency: '+ emergencys.length); 

    var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    console.log('Soldiers: '+ soldiers.length);

    var armys = _.filter(Game.creeps, (creep) => creep.memory.role == 'army');
    console.log('Armys: '+ armys.length);

    var outharvesters = _.filter(Game.creeps, (creep) => creep.memory.role =='outharvester');
    console.log('OutHarvesters: '+ outharvesters.length);

    var towerkeepers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerkeeper');
    console.log('Towerkeepers: '+ towerkeepers.length);

    var emergencyharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergencyharvester');
    console.log('Emergencyharvesters: '+ emergencyharvesters.length);

    var towers = Game.rooms['W5N3'].find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_TOWER
    });
    
    var buildingTargetnum = Game.rooms['W5N3'].find(FIND_CONSTRUCTION_SITES)
    var outharvester_num_toW4N3 = 4;
    var outharvester_num_toW5N2 = 2;

    var assignedToW4N3 = _.filter(Game.creeps, (c) => c.memory.role === 'outharvester' && c.memory.targetRoom === 'W4N3').length;
    var assignedToW5N2 = _.filter(Game.creeps, (c) => c.memory.role === 'outharvester' && c.memory.targetRoom === 'W5N2').length;

    
    if (towers.length > 0) {
        const closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            towers.forEach(tower => {
                const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                }
            });
        }
        
        else towers.forEach((tower, index) => {
            const ramparts = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_RAMPART && structure.hits < structure.hitsMax * 0.01
            });
            if (index === 0) {
                // 第一个 Tower 修复其他普通建筑
                const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) =>
                        structure.hits < structure.hitsMax  * 0.7&&
                        structure.structureType !== STRUCTURE_RAMPART // 不修复 Rampart
                });
    
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                    tower.room.visual.text('🔧 Normal', tower.pos.x, tower.pos.y + 1, { align: 'center', opacity: 0.8 });
                }
                else if (ramparts.length > 0) {
                    // 轮流选择 Rampart
                    const targetRampart = ramparts[rampartRepairIndex % ramparts.length];
                    if (targetRampart) {
                        tower.repair(targetRampart);
                        tower.room.visual.text('🔧 Rampart', tower.pos.x, tower.pos.y + 1, { align: 'center', opacity: 0.8 });
    
                        // 更新索引
                        rampartRepairIndex++;
                    }
                }
            } else if (index === 1) {
                // 第二个 Tower 专门修复 Rampart
                if (ramparts.length > 0) {
                    // 轮流选择 Rampart
                    const targetRampart = ramparts[rampartRepairIndex % ramparts.length];
                    if (targetRampart) {
                        tower.repair(targetRampart);
                        tower.room.visual.text('🔧 Rampart', tower.pos.x, tower.pos.y + 1, { align: 'center', opacity: 0.8 });
                        // 更新索引
                        rampartRepairIndex++;
                    }
                }
            }
        });
    }
    if(harvesters.length > 0 && Object.keys(Game.creeps).length > 4){
    if(harvesters.length <2){
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
                {memory: {role: 'harvester'}});
    }
    if(upgraders.length < 3){
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader:'+ newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    if(builders.length < 3 && buildingTargetnum.length > 0){
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder:'+ newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    else{
        console.log('NoBuildingTarget'); 
    }
    if(haulers.length < 6){
        var newName = 'Hauler' + Game.time;
        console.log('Spawning new hauler:'+ newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'hauler'}});
    }
    
    if(soldiers.length < 0){
        var newName = 'Soldier' + Game.time;
        console.log('Spawning new soldier:'+ newName);
        Game.spawns['Spawn1'].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK,ATTACK,ATTACK,MOVE, MOVE,MOVE], newName, 
            {memory: {role:'soldier'}});
    }

    if(armys.length <0){
        var newName = 'Army' + Game.time;
        console.log('Spawning new army:'+ newName);
        Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE], newName, 
            {memory: {role:'army'}});
    }
    if(outharvesters.length < 6){
        var newName = 'OutHarvester' + Game.time;
        console.log('Spawning new out harvester:'+ newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE], newName, 
            {memory: {role: 'outharvester'}});
    }
    if(towerkeepers.length < 2){
        var newName = 'Towerkeeper' + Game.time;
        console.log('Spawning new towerkeeper:'+ newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY, MOVE,MOVE], newName, 
            {memory: {role: 'towerkeeper'}});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var buildertargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            if(buildertargets.length < 1){
                roleUpgrader.run(creep);
            }
            else{
                roleBuilder.run(creep);
            }
        }
        if(creep.memory.role == 'hauler'){
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'emergency'){
            roleEmergency.run(creep);
        }
        if(creep.memory.role == 'soldier'){
            roleSoldier.run(creep);
        }
        if(creep.memory.role == 'army'){
            roleArmy.run(creep);
        }
        if (creep.memory.role == 'outharvester') {
        if (!creep.memory.targetRoom) {
            if (assignedToW4N3 < outharvester_num_toW4N3) {
                creep.memory.targetRoom = 'W4N3';
                assignedToW4N3++;
            } else if (assignedToW5N2 < outharvester_num_toW5N2) {
                creep.memory.targetRoom = 'W5N2';
                assignedToW5N2++;
            }
        }
        if (creep.memory.targetRoom) {
            roleOutHarvester.run(creep, creep.memory.targetRoom);
        }
        }
        
        if(creep.memory.role == 'towerkeeper'){
            roleTowerKeeper.run(creep);
        }
        if(creep.memory.role == 'emergencyharvester'){
            roleEmergencyHarvester.run(creep);
        }
    }
    }
    else{
        console.log('--------EMERGENCY!!!!!!!!---------');
        Game.notify('Warning,Harvester count less than 3',3);
        var newName = 'Emergency' + Game.time;
        console.log('Spawning new emergency:'+ newName);
        var Name2 = 'Emergency_Harvester' + Game.time;
        console.log('Spawning new harvester : '+ Name2);
        if(emergencys.length < 2){
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'emergency'}}); 
        }
        if(emergencyharvesters.length <3){
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK,CARRY], Name2, 
                {memory: {role: 'emergencyharvester'}}); 
        }
        if(harvesters.length < 1){
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'harvester'}});
        }

        for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                if(creep.memory.role == 'harvester') {
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == 'upgrader') {
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == 'builder'){
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == 'hauler'){
                    roleHauler.run(creep);
                }
                if(creep.memory.role == 'emergency'){
                    roleEmergency.run(creep);
                } 
                if(creep.memory.role == 'towerkeeper'){
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == 'emergencyharvester'){
                    roleEmergencyHarvester.run(creep);
                }
        }
    }


};