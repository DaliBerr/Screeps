var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.sourceId) {
            const sources = creep.room.find(FIND_SOURCES);
            const source = sources.find((s) => {
                const creepsAssigned = _.filter(Game.creeps, (c) => c.memory.sourceId === s.id);
                return creepsAssigned.length < 1; 
            });

            if (source) {
                creep.memory.sourceId = source.id;
                creep.say(`🔄 Source ${source.id}`);
            }
        }

        // 主采矿逻辑
        if (creep.store.getFreeCapacity() > 0) {
            const source = Game.getObjectById(creep.memory.sourceId);
            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            // 转运能量到目标结构
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER) &&
                           structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				})
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#fffb0d' } });
                }
            }
        }
    }
};

module.exports = roleHarvester;
