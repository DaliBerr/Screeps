var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
            // 优先寻找掉落的能量
            const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (resource) => resource.resourceType === RESOURCE_ENERGY
            });
            if (droppedEnergy) {
                if (creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy, { visualizePathStyle: { stroke: '#fffb0d' } });
                }
            } else {
                var fullcontainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => 
                        structure.structureType === STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > structure.store.getCapacity(RESOURCE_ENERGY) * 0.6
                });
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => 
                        structure.structureType === STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > 0
                });
                if(fullcontainer){
                    if (creep.withdraw(fullcontainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(fullcontainer, { visualizePathStyle: { stroke: '#fffb0d' } });
                    }
                }
                // 如果没有掉落的资源，寻找能量容器

                else if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#fffb0d' } });
                    }
                }
            }
        } else {
            // 运输能量到基地
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN || 
                            structure.structureType === STRUCTURE_EXTENSION || 
                            structure.structureType === STRUCTURE_STORAGE
                            ) &&
                           structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#fffb0d' } });
                }
            }
        }
    }
};

module.exports = roleHauler;