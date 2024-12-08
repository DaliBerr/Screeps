var tastManageRoom = {
    run:function manageRoom(room){
        console.log("Managing room" + room.name);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room === room.name);
        console.log('Harvesters: ' + harvesters.length);
    
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.room === room.name);
        console.log('Upgraders: ' + upgraders.length);
    
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.room === room.name);
        console.log('Builders: ' + builders.length);
    
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.room === room.name);
        console.log('Haulers: '+ haulers.length);
    
        var emergencys = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergency' && creep.memory.room === room.name);
        console.log('Emergency: '+ emergencys.length); 
    
        var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier' && creep.memory.room === room.name);
        console.log('Soldiers: '+ soldiers.length);
    
        var armys = _.filter(Game.creeps, (creep) => creep.memory.role == 'army' && creep.memory.room === room.name);
        console.log('Armys: '+ armys.length);
    
        var outharvesters = _.filter(Game.creeps, (creep) => creep.memory.role =='outharvester' && creep.memory.room === room.name);
        console.log('OutHarvesters: '+ outharvesters.length);
    
        var towerkeepers = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerkeeper' && creep.memory.room === room.name);
        console.log('Towerkeepers: '+ towerkeepers.length);
    
        var emergencyharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'emergencyharvester' && creep.memory.room === room.name);
        console.log('Emergencyharvesters: '+ emergencyharvesters.length);
    
        var outbuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'outbuilder' && creep.memory.room === room.name);
        console.log('Outbuilders: ' + outbuilders.length);
    
        var roomCreeps = _.filter(Game.creeps, (creep) => creep.memory.room == room.name);
        console.log('RoomCrepps' + roomCreeps.length);
    
        var extensions = room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_EXTENSION
        });
        if(extensions.length >= 12){
            if(harvesters.length > 0 && roomCreeps.length > 4){
                if(harvesters.length <2){
                    var newName = 'Harvester' +room.name+ Game.time;
                    console.log('Spawning new harvester: ' + newName);
                        Game.spawns[room.name].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                }
                if(upgraders.length < 4){
                    var newName = 'Upgrader' +room.name+ Game.time;
                    console.log('Spawning new upgrader:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'upgrader'}});
                }    
                if(builders.length < 3 && buildingTargetnum.length > 0){
                    var newName = 'Builder' +room.name+ Game.time;
                    console.log('Spawning new builder:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'builder'}});
                }
                if(haulers.length < 6){
                    var newName = 'Hauler' +room.name+ Game.time;
                    console.log('Spawning new hauler:'+ newName);
                    Game.spawns[room.name].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'hauler'}});
                }
                if(soldiers.length < 0){
                    var newName = 'Soldier' +room.name+ Game.time;
                    console.log('Spawning new soldier:'+ newName);
                    Game.spawns[room.name].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK,ATTACK,ATTACK,MOVE, MOVE,MOVE], newName, 
                        {memory: {role:'soldier'}});
                }
                if(armys.length <0){
                    var newName = 'Army' +room.name+ Game.time;
                    console.log('Spawning new army:'+ newName);
                    Game.spawns[room.name].spawnCreep([CLAIM, MOVE], newName, 
                        {memory: {role:'army'}});
                }
                if(outharvesters.length < 2){
                    var newName = 'OutHarvester' +room.name+ Game.time;
                    console.log('Spawning new out harvester:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK, WORK, WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE], newName, 
                        {memory: {role: 'outharvester'}});
                }
                if(room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType === STRUCTURE_TOWER}).length > 0) {
                        if(towerkeepers.length < 2){
                            var newName = 'Towerkeeper' +room.name+ Game.time;
                            console.log('Spawning new towerkeeper:'+ newName);
                            Game.spawns[room.name].spawnCreep([CARRY,CARRY,CARRY,CARRY, MOVE,MOVE], newName, 
                                {memory: {role: 'towerkeeper'}});
                        }   
                }
                if(outbuilders.length < 2){
                    var newName = 'OutBuilder' +room.name+ Game.time;
                    console.log('Spawning new out builder:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK, WORK, WORK, WORK, WORK,WORK,WORK, CARRY,CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,MOVE], newName, 
                        {memory: {role: 'outbuilder'}});
                }       
            }
            else{
                console.log('--------EMERGENCY!!!!!!!! in ${room.name}---------');
                if(emergencys.length < 2){
                    var newName = 'Emergency' +room.name + Game.time;
                    console.log('Spawning new emergency:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'emergency'}}); 
                }
                if(emergencyharvesters.length <3){
                    var newName = 'Emergency_Harvester' +room.name + Game.time;
                    console.log('Spawning new harvester : '+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE,WORK,CARRY], newName, 
                        {memory: {role: 'emergencyharvester'}}); 
                }
                if(harvesters.length < 1){
                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                        Game.spawns[room.name].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                }
            }
        }
        if(extensions.length >= 6 && extensions.length < 12){
            if(harvesters.length > 2 && roomCreeps.length > 4){
                if(harvesters.length <6){
                    var newName = 'Harvester' +room.name+ Game.time;
                    console.log('Spawning new harvester: ' + newName);
                        Game.spawns[room.name].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                }
                if(upgraders.length < 3){
                    var newName = 'Upgrader' +room.name+ Game.time;
                    console.log('Spawning new upgrader:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'upgrader'}});
                }    
                if(builders.length < 2 && buildingTargetnum.length > 0){
                    var newName = 'Builder' +room.name+ Game.time;
                    console.log('Spawning new builder:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'builder'}});
                }
                if(haulers.length < 3){
                    var newName = 'Hauler' +room.name+ Game.time;
                    console.log('Spawning new hauler:'+ newName);
                    Game.spawns[room.name].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'hauler'}});
                }
                if(room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType === STRUCTURE_TOWER}).length > 0) {
                        if(towerkeepers.length < 1){
                            var newName = 'Towerkeeper' +room.name+ Game.time;
                            console.log('Spawning new towerkeeper:'+ newName);
                            Game.spawns[room.name].spawnCreep([CARRY,CARRY,CARRY,MOVE], newName, 
                                {memory: {role: 'towerkeeper'}});
                        }   
                }
            }
            else{
                console.log('--------EMERGENCY!!!!!!!! in ${room.name}---------');
                if(emergencyharvesters.length <3){
                    var newName = 'Emergency_Harvester' +room.name + Game.time;
                    console.log('Spawning new harvester : '+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE,], newName, 
                        {memory: {role: 'emergencyharvester'}}); 
                }
                if(emergencys.length < 2){
                    var newName = 'Emergency' +room.name + Game.time;
                    console.log('Spawning new emergency:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'emergency'}}); 
                }
                if(harvesters.length < 3){
                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                        Game.spawns[room.name].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                }
            }
        }
        if(extensions.length < 6){
            if(harvesters.length >2 && roomCreeps.length >4){
                if(harvesters.length <3){
                    var newName = 'Harvester' +room.name+ Game.time;
                    console.log('Spawning new harvester: ' + newName);
                        Game.spawns[room.name].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                }
                if(upgraders.length < 2){
                    var newName = 'Upgrader' +room.name+ Game.time;
                    console.log('Spawning new upgrader:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'upgrader'}});
                }    
                if(builders.length < 1 && buildingTargetnum.length > 0){
                    var newName = 'Builder' +room.name+ Game.time;
                    console.log('Spawning new builder:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE,MOVE], newName, 
                        {memory: {role: 'builder'}});
                }
                if(haulers.length < 2){
                    var newName = 'Hauler' +room.name+ Game.time;
                    console.log('Spawning new hauler:'+ newName);
                    Game.spawns[room.name].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE], newName, 
                        {memory: {role: 'hauler'}});
                }
            }
            else{
                console.log('--------EMERGENCY!!!!!!!! in ${room.name}---------');
                if(emergencyharvesters.length <3){
                    var newName = 'Emergency_Harvester' +room.name + Game.time;
                    console.log('Spawning new harvester : '+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE], newName, 
                        {memory: {role: 'emergencyharvester'}}); 
                }
                if(emergencys.length < 2){
                    var newName = 'Emergency' +room.name + Game.time;
                    console.log('Spawning new emergency:'+ newName);
                    Game.spawns[room.name].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'emergency'}}); 
                }
                if(harvesters.length < 4){
                    var newName = 'Harvester' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                        Game.spawns[room.name].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
                            {memory: {role: 'harvester'}});
                }
            }
        }
        for(var name in Game.creeps){
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
            if(creep.memory.role == 'army'){
                roleArmy.run(creep);
            }
        }
    }
}

module.exports = tastManageRoom;