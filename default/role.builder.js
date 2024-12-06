var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) { 
			
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
				var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#00f91a'}});
                }
            }
	    }
	    else {
	        var container = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return ( 
						structure.structureType == STRUCTURE_STORAGE||
						structure.structureType == STRUCTURE_CONTAINER) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
				});
			// var source = creep.room.find(FIND_SOURCES);
			if(container.length > 0) {
				
				var target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_STORAGE||
							structure.structureType == STRUCTURE_CONTAINER
						) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				})
				if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#fffb0d'}});
				}
			}
            // if(creep.withdraw(container[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(container[0], {visualizePathStyle: {stroke: '#fffb0d'}});
            // }
			// if(creep.harvest(source[1]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(source[1], {visualizePathStyle: {stroke: '#fffb0d'}});
            // }

	    }
	}
};

module.exports = roleBuilder;