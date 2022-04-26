function removeDuplicate(arr) {
    for(let i=0; i<arr.length; i++) {
        for(let j=i+1; j<arr.length; j++) {
            if(arr[i].id === arr[j].id) {
                if (Array.isArray(arr[i].role_id)) {
                    arr[i].role_id.push(arr[j].role_id)
                } else {
                    const roleId = arr[i].role_id
                    arr[i].role_id = []
                    arr[i].role_id.push(roleId)
                    arr[i].role_id.push(arr[j].role_id)
                }
                arr.splice(j, 1);
                j--;
            }
        }
    }
    let index = 0;
    let id;
    while(index < arr.length) {
        if(!Array.isArray(arr[index].role_id)) {
            id = arr[index].role_id
            arr[index].role_id = []
            arr[index].role_id.push(id)
        }
        index++;
    }
    return arr
}

module.exports = {
    removeDuplicate
}