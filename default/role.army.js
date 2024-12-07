var roleClaimer = {
    run: function(creep) {
        const targetRoom = 'W4N3'; // 目标房间名称
        console.log(creep.room.name);
        if (creep.room.name === targetRoom) {
            const controller = creep.room.controller;
            console.log(creep.attackController(controller));
                if(creep.claimController(controller) === -15){
                    if (creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ff00' } });
                        creep.say('📜 Reserving');
                    }
                    if(creep.attackController(controller) === ERR_NOT_IN_RANGE){
                        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ff0000' } });
                        creep.say('Attacking');
                    }

                    }
                
                else{
                    if (creep.claimController(controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ff00' } });
                        creep.say('📜 Reserving');
                    }
                }
        }
        else {
            creep.moveTo(new RoomPosition(25, 25, targetRoom), { visualizePathStyle: { stroke: '#00ff00' } });
            creep.say('Moving to'+ targetRoom);
        }
        } 
};

module.exports = roleClaimer;
