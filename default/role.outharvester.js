var roleOutHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,targetRoom) {

        const homeRoom = 'W5N3';

        if (creep.room.name === targetRoom) {
            if (!creep.memory.sourceId) {
                const sources = creep.room.find(FIND_SOURCES);
                const source = sources.find((s) => {
                    const creepsAssigned = _.filter(Game.creeps, (c) => c.memory.sourceId === s.id);
                    return creepsAssigned.length < 2; 
                });
    
                if (source) {
                    creep.memory.sourceId = source.id;
                    creep.say(`🔄 Source ${source.id}`);
                }
            }
            if (creep.store.getFreeCapacity() > 0) {
                const source = Game.getObjectById(creep.memory.sourceId);
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                
            } else {
                // 能量满载，返回原房间
                creep.moveTo(new RoomPosition(25, 25, homeRoom), { visualizePathStyle: { stroke: '#ffffff' } });
                creep.say('🚚 Returning');
            }
        } else if (creep.room.name === homeRoom && creep.store[RESOURCE_ENERGY] != 0) {
            // 如果在原房间，运输能量
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_STORAGE||
                            structure.structureType === STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.say('🚚 Delivering');
                }
            }
        } else if(creep.store[RESOURCE_ENERGY] == 0) {
            // 如果不在目标房间或原房间，移动到目标房间
            creep.moveTo(new RoomPosition(25, 25, targetRoom), { visualizePathStyle: { stroke: '#ffaa00' } });
            creep.say('🚪 Moving');
        }
    }
};

module.exports = roleOutHarvester;
