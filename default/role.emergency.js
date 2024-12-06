var roleEmergency = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) =>
                    structure.structureType === STRUCTURE_CONTAINER||
                    structure.structureType === STRUCTURE_STORAGE &&
                    structure.store[RESOURCE_ENERGY] > 0
            });
            if(container){
                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#fffb0d' } });
                }
            }
            else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN 
                            ) &&
                           structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_SPAWN || 
                            structure.structureType == STRUCTURE_EXTENSION 
                        ) &&
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

module.exports = roleEmergency;