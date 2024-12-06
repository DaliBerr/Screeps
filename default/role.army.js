var roleClaimer = {
    run: function(creep) {
        const targetRoom = 'W4N3'; // 目标房间名称
        console.log(creep.room.name);
        if (creep.room.name === targetRoom) {
            const controller = creep.room.controller;
                if(creep.claimController(controller) === -15){
                    if (creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ff00' } });
                        creep.say('📜 Reserving');
                    }
                }
                else{
                    if (creep.claimController(controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ff00' } });
                        creep.say('📜 Reserving');
                    }
                }

        } else {
            if (creep.pos.x === 0) {
                creep.move(RIGHT);
            } else if (creep.pos.x === 49) {
                creep.move(LEFT);
            } else if (creep.pos.y === 0) {
                creep.move(BOTTOM);
            } else if (creep.pos.y === 49) {
                creep.move(TOP);
            } else {
                creep.moveTo(new RoomPosition(25, 25, targetRoom), { visualizePathStyle: { stroke: '#ffaa00' } });
                creep.say('🚪 Moving');
            }
        }
    }
};

module.exports = roleClaimer;
