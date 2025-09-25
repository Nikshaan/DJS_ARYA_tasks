const add = (...nums) => {
    let sum = 0;
    for(let i = 0; i < nums.length; i++){
        sum += nums[i];
    }
    return sum;
}

const subtract = (d, ...nums) => {
    let difference = d;
    for(let i = 0; i < nums.length; i++){
        difference -= nums[i];
    }
    return difference;
}

module.exports = {add, subtract};