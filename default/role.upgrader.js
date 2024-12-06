var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#0532ff'}});
            }
        }
	    else {
	        var storage = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_STORAGE) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
				});
			var sources = creep.room.find(FIND_SOURCES);

			// if(sources.length > 0) {
			// 	console.log('source'+sources.length);
            //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
			if(storage.length > 0) {
				var target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_STORAGE) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				})

				if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#fffb0d'}});
				}
			}
			else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
			}
            // if(creep.withdraw(container[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(container[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
	    }
	}
};

module.exports = roleUpgrader;