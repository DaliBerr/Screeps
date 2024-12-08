var roleOutBuilder = {

    /** @param {Creep} creep **/
    run: function(creep,targetroom) {
		const homeRoom = Game.rooms['W5N3'];
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(!creep.memory.building){

			var containerHome = homeRoom.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return ( 
						structure.structureType == STRUCTURE_STORAGE) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
			});
			
			if(containerHome.length > 0 && creep.room == homeRoom) {

				var target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_STORAGE) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				})
				if(creep.room != homeRoom){
					creep.moveTo(new RoomPosition(25,25,homeRoom.name))
				}
				else if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#fffb0d'}});
				}
			}
			if(creep.room != homeRoom){
				
				creep.moveTo(new RoomPosition(25,25,homeRoom.name));
			}
			
	    }

	    if(creep.memory.building){ 
			var outtargets = Game.rooms[targetroom].find(FIND_CONSTRUCTION_SITES);
			if(outtargets.length) {
			    if(creep.room.name !== targetroom){
					creep.moveTo(new RoomPosition(25,25,targetroom), { visualizePathStyle: { stroke: '#ffaa00' } });
					creep.say('🚪 Moving');
				}
				else{
					const ConstructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
					if(ConstructionSite){
						if (creep.build(ConstructionSite) === ERR_NOT_IN_RANGE) {
							creep.moveTo(ConstructionSite, { visualizePathStyle: { stroke: '#ffffff' } });
						}
					}
				}
			}
	    }

	}
};

module.exports = roleOutBuilder;