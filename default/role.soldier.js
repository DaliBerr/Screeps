var roleSoldier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const flag_attack = Game.flags['AttackFlag']; 
        const flag_defense = Game.flags['DefenseFlag'];
        if (flag_attack) {
            if (creep.room.name === flag_attack.pos.roomName) {
                const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                if (target) {
                    if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
                    }
                }
                else {
                    // 如果没有敌人，寻找建筑攻击
                    const structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
                    if (structure) {
                        if (creep.attack(structure) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure, { visualizePathStyle: { stroke: '#ff0000' } });
                            creep.say('🏰 Siege');
                        }
                    } else {
                        creep.say('🚶 Patrolling');
                    }
                    if (creep.room.controller.owner) {
                        // 如果控制器被占领，清空所有权
                        if (creep.attackController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ff0000' } });
                            creep.say('⚔️ Attacking');
                        }
                    }
                    else if (creep.room.controller.sign) {
                        // 如果控制器有签名，清空签名
                        if (creep.signController(creep.room.controller, '') === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#00ff00' } });
                            creep.say('📜 Signing');
                        }
                    }
                }
            }else {
                if (creep.pos.x === 0) {
                    creep.move(RIGHT);
                } else if (creep.pos.y === 0) {
                    creep.move(BOTTOM);
                } else if (creep.pos.y === 49) {
                    creep.move(TOP);
                } else {
                    creep.moveTo(new RoomPosition(25, 25, flag_attack.pos.roomName), { visualizePathStyle: { stroke: '#ffaa00' } });
                    creep.say('🚪 Moving');
                }
            }
        }
        else if(flag_defense){
            const patrolPoints = [new RoomPosition(10, 10, flag_defense.pos.roomName), new RoomPosition(40, 40, flag_defense.pos.roomName)];
            const nextPatrolPoint = patrolPoints[Game.time % patrolPoints.length];
            

            const hostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if (creep.attack(hostileCreep) === ERR_NOT_IN_RANGE) {
                creep.moveTo(hostileCreep, { visualizePathStyle: { stroke: '#ff0000' } });
                creep.say('⚔️ Attacking');
            }
            else{
                creep.moveTo(nextPatrolPoint, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleSoldier;
