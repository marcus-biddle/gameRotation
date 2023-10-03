export function generateDataArrayWithLength(rowLength) {
  
    // Create an array of objects with 'position' starting from 'A'
    const dataArray = Array.from({ length: rowLength }, (_, index) => ({
      position: String.fromCharCode('A'.charCodeAt(0) + index),
      name: '',
      flag: '',
      maxTimeAllowed: 0,
      quarters: [
        {
          firstHalf: 0,
          secondHalf: 0
        },
        {
          firstHalf: 0,
          secondHalf: 0
        },
        {
          firstHalf: 0,
          secondHalf: 0
        },
        {
          firstHalf: 0,
          secondHalf: 0
        }
      ]
    }));
  
    return dataArray;
  }

export function resetQuartersData(dataArray) {
  // Iterate through each object in the array
  for (let i = 0; i < dataArray.length; i++) {
    const player = dataArray[i];

    // Iterate through each quarter
    for (let quarterIndex = 0; quarterIndex < player.quarters.length; quarterIndex++) {
      player.quarters[quarterIndex].firstHalf = 0;
      player.quarters[quarterIndex].secondHalf = 0;
    }

    player.maxTimeAllowed = 0;
  }

  return dataArray;
}

export function createFlag3Positions(array) {

      const flag2Players = array.filter((player) => {
        if (player.flag === '3') {
          return player
        }
      })

      flag2Players.forEach((player, index) => {
        if ((index + 2) % 2) {
          player.quarters[0].firstHalf = 0;
          player.quarters[0].secondHalf = 5;
          player.quarters[1].firstHalf = 0;
          player.quarters[1].secondHalf = 5;
          player.quarters[2].firstHalf = 0;
          player.quarters[2].secondHalf = 5;
          player.quarters[3].firstHalf = 0;
          player.quarters[3].secondHalf = 5;
        } else {
          player.quarters[0].firstHalf = 5;
          player.quarters[0].secondHalf = 0;
          player.quarters[1].firstHalf = 5;
          player.quarters[1].secondHalf = 0;
          player.quarters[2].firstHalf = 5;
          player.quarters[2].secondHalf = 0;
          player.quarters[3].firstHalf = 5;
          player.quarters[3].secondHalf = 0;
        }

        player.maxTimeAllowed = 20;
      })

  return array;
}

export function createFlag2Positions(array) {
  // GET all flag 2 players
  const flag2Players = array.filter((player) => {
    if (player.flag === '2') {
      return player;
    }
  });

  
// SET all players to actively play on the field with max times. This should 
// make every half of a quarter over 30 min player time.
  flag2Players.forEach((player) => {
    // randomize rest times
    player.maxTimeAllowed = 40;

    player.quarters.forEach((quarter) => {
      quarter.firstHalf = 5
      quarter.secondHalf = 5
    });
  })

  // Outer for loop indicates quarter
  for (let quarter = 0; quarter < 4; quarter++) {
    // Inner loop indicates halves (0 or 1)
    for (let half = 1; half <= 2; half++) {
      let playerTime = calcPlayerTimeOnField(quarter, array, half)
      console.log('check quarter', playerTime );

      // Loop through each each quarter/half
      // Add up flag 1 & 2 player time for that half then subtract from 30
      // For Q1H1, random flag2 until player time is 30
      // for H2's, look at H1's if there are any 0's make them play
      // Two separate arrays needed?
      while (playerTime > 30) {
        console.log('playerTime', playerTime, quarter, half)
        // array is filled only if prev half the player did not play
        const forcedPlayers = flag2Players.filter((player) => {
          // grab players that aren't in Q1H1
          if ((quarter !== 0 && half === 1) || (quarter === 1 && half === 2) || (quarter !== 0 && half === 2)) {
            // grab player if their previous half is 0
            if ((half === 1 && player.quarters[quarter - 1].secondHalf === 0) || (half === 2 && player.quarters[quarter].firstHalf === 0)) {
              return player
            }
          }
        })

        console.log('forced', forcedPlayers);

        // Ensure that players who sat out last half gets to play.
        if (forcedPlayers.length > 0) {
          forcedPlayers.forEach((player) => {
            half === 1 ? player.quarters[quarter].firstHalf = 5 : player.quarters[quarter].secondHalf = 5;
          })
          console.log('Continued', quarter, half, playerTime)
        }

        // This should reloop with the same playerTime to loop at the rest of the players

        // Filter out all forced players because they have to play. Then grab me the players that are on the field.
        const onFieldPlayers = flag2Players.filter((player) => !forcedPlayers.includes(player)).filter((player) => {
          if (half === 1 ? player.quarters[quarter].firstHalf === 5 : player.quarters[quarter].secondHalf === 5) {
            return player;
          }
        })

        if (onFieldPlayers.length === 0) {
          break;
        }

        const difference = (playerTime - 30) / 5;
        console.log('difference', difference, onFieldPlayers, quarter, half)



        for (let index = 0; index < difference; index++) {
          console.log('loop', onFieldPlayers[index])

          const mostPlayedFlag2Player = onFieldPlayers.reduce((maxPlayer, obj) => {
            return obj.maxTimeAllowed > maxPlayer.maxTimeAllowed ? obj : maxPlayer;
          }, onFieldPlayers[0]);

          if (!mostPlayedFlag2Player) {
            playerTime = calcPlayerTimeOnField(quarter, array, half);
            break;
          }

          console.log('removed', mostPlayedFlag2Player);

          half === 1 ? mostPlayedFlag2Player.quarters[quarter].firstHalf = 0 : mostPlayedFlag2Player.quarters[quarter].secondHalf = 0;
          mostPlayedFlag2Player.maxTimeAllowed = mostPlayedFlag2Player.maxTimeAllowed - 5;
          
        }

        playerTime = calcPlayerTimeOnField(quarter, array, half);
        console.log('end playerTime', quarter, half, playerTime)

        // for (let index = 0; index < difference; index++) {
        //   // Grab a player on the field and put him on the bench
        //   half === 1 ? onFieldPlayers[index].quarters[quarter].firstHalf = 0 : onFieldPlayers[index].quarters[quarter].secondHalf = 0;
        //   onFieldPlayers[index].maxTimeAllowed = onFieldPlayers[index].maxTimeAllowed - 5;

        //   // If a player is moved to the bench, player time on field is reduced.
        //   playerTime = playerTime - 5;
        // }
      }
    }
  }
console.log('ARRAY',array)
  return array
}

export function calcPlayerTimeOnField(quarterIndex, dataArray, half) {
  let totalSum = 0;

  dataArray.forEach((item) => {
    if (item.quarters && item.quarters[quarterIndex]) {
      const quarter = item.quarters[quarterIndex];
      if (half === 1) {
        const sum = quarter.firstHalf;
        totalSum += sum;
      } else {
        const sum = quarter.secondHalf;
        totalSum += sum;
      }
    }
  });

  return totalSum;
}

export function createFlag1Positions(array) {
  const flag1Players = array.filter((player) => {
    if (player.flag === '1') {
      return player;
    }
  });

  const flag1PlayerCount = flag1Players.length;
  if (flag1PlayerCount === 0) return array;

  const playerMaxTime = 
  flag1PlayerCount === 1 ? 35 
  : flag1PlayerCount === 2 ? 35 
  : flag1PlayerCount === 3 ? 30 : 25;

  const eachPlayerOnFieldCount = playerMaxTime / 5;
  const restTimeCount = 8 - eachPlayerOnFieldCount;
  console.log('resttime', restTimeCount);
  

  flag1Players.forEach((player) => {
    // randomize rest times
    let sumTime = 0;

    const activePlayerArray = Array(eachPlayerOnFieldCount).fill(5);
    const restArray = Array(restTimeCount).fill(0);
    const playerArray = activePlayerArray.concat(restArray);
    const playerPositioning = randomizePositioning(playerArray);
    console.log('THIS', restArray, playerArray, playerPositioning);
    
    console.log('playerPosition', playerPositioning);
    player.quarters.forEach((quarter) => {
      quarter.firstHalf = playerPositioning[0] // 0, 1, 0
      quarter.secondHalf = playerPositioning[1] // 1, 0, 1 
      playerPositioning.splice(0, 2);
      sumTime = sumTime + (quarter.firstHalf + quarter.secondHalf)
    });

    player.maxTimeAllowed = sumTime;
    
  })

  console.log('flag1Players', flag1Players)
  return array
}
  // Deprecated
export function updatePlayerTimeInQuarter(array, quarter) {
  
    array.forEach((item) => {
      if (item.quarters && item.quarters[quarter] && item.flag !== '3') {
        const currentQuarter = item.quarters[quarter];
          const sum = currentQuarter.firstHalf + currentQuarter.secondHalf;
          item.maxTimeAllowed = item.maxTimeAllowed + sum;
      }
    });

  return array;
}

export function sortArrayWithNoAdjacentZeros(arr) {
  // Separate the array into two subarrays: one for non-zero values and one for zeros
  const nonZeroArray = arr.filter((value) => value !== 0);
  const zeroArray = arr.filter((value) => value === 0);

  // Initialize the result array
  const result = [];

  // Merge the non-zero values and zeros alternatively
  while (nonZeroArray.length > 0 || zeroArray.length > 0) {
    if (nonZeroArray.length > 0) {
      result.push(nonZeroArray.shift());
    }
    if (zeroArray.length > 0) {
      result.push(zeroArray.shift());
    }
  }

  return result;
}

// Example usage:
// const inputArray = [5, 5, 0, 5, 0, 0, 5];
// const sortedArray = sortArrayWithNoAdjacentZeros(inputArray);
// console.log(sortedArray); // Output: [5, 0, 5, 0, 5, 0, 5]

export function randomizePositioning(arr) {
  console.log('START RANDOMIZATION')
  const nonZeroIndices = arr.reduce((indices, value, index) => {
    if (value !== 0) {
      indices.push(index);
    }
    return indices;
  }, []);

  const zeroIndices = arr.reduce((indices, value, index) => {
    if (value === 0) {
      indices.push(index);
    }
    return indices;
  }, []);

  if (nonZeroIndices.length + 1 === arr.length || zeroIndices.length < 3) {
    for (let i = arr.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      // Swap the elements at randomIndex and i
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }

    return arr;
  }

  const sortedArray = Array.from({ length: arr.length }, () => 0);

  for (let i = 0; i < nonZeroIndices.length; i++) {
    sortedArray[i * 2] = arr[nonZeroIndices[i]];
  }

  if (sortedArray.length > 8) {
    const zeroIndices = [];

    // Get an array of indices for where the 0's are in the array
    for (let i = 0; i < sortedArray.length; i++) {
      if (arr[i] === 0) {
        zeroIndices.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * 4);
    const zeroIndex = zeroIndices[randomIndex];
    sortedArray[zeroIndex] = 5;
    sortedArray.pop();
  }

  const randomIndex = Math.floor(Math.random() * 2);

  randomIndex === 0 ? sortedArray.reverse() : sortedArray;

  const nonZeroNewArray = sortedArray.filter((value) => value !== 0);

  // const zeros = sortedArray.filter((value) => value === 0);

  console.log('RANDOMIZE', nonZeroNewArray.length, nonZeroIndices.length)

  if (nonZeroNewArray.length < nonZeroIndices.length) {
    const zeroIndices = [];

    // Get an array of indices for where the 0's are in the array
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] === 0) {
        zeroIndices.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * zeroIndices.length);
    const zeroIndex = zeroIndices[randomIndex];
    sortedArray[zeroIndex] = 5;
    console.log('SORTEDARAY', sortedArray[zeroIndex], zeroIndex)
  } 

  return sortedArray;
}