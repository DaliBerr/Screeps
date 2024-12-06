var roleTowerkeeper = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (!creep.memory.towerId) {
            // 找到当前房间内所有 Tower
            const towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_TOWER
            });
        
            // 找到分配 Creep 较少的 Tower
            const targetTower = towers.find((tower) => {
                const creepsAssigned = _.filter(Game.creeps, (c) => c.memory.towerId === tower.id);
                return creepsAssigned.length < 1; 
            });
        
            if (targetTower) {
                creep.memory.towerId = targetTower.id;
                creep.say(`🔄 Tower ${targetTower.id}`);
            }
        }
        
        // 切换状态逻辑
        if (creep.memory.collecting && creep.store.getFreeCapacity() === 0) {
            creep.memory.collecting = false; // 满了，切换到运输模式
            creep.say('🚚 Deliver');
        }
        if (!creep.memory.collecting && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.collecting = true; // 空了，切换到收集模式
            creep.say('🔄 Collect');
        }
        // 收集能量
        if (creep.memory.collecting) {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => 
                        (structure.structureType === STRUCTURE_CONTAINER || 
                        structure.structureType === STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0
                });
                if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#fffb0d' } });
                    }
                }
            
        } else {
            const target = Game.getObjectById(creep.memory.towerId)
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#fffb0d' } });
                }
            }
        }
    }
};

module.exports = roleTowerkeeper;