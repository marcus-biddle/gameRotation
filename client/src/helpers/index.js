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

    // Reset maxTimeAllowed to 0
    if (player.flag !== '3') {
      player.maxTimeAllowed = 0;
    }
  }

  return dataArray;
}

export function createFlag2Positions(array) {
  const flag2Players = array.filter((player) => {
    if (player.flag === '2') {
      return player;
    }
  });

  const activePlayerArray = Array(4).fill(5);
  const restArray = Array(4).fill(0);
  const playerTimeArray = activePlayerArray.concat(restArray);

  flag2Players.forEach((player) => {
    // randomize rest times
    const playerPositioning = randomizePositioning(playerTimeArray);

    player.quarters.forEach((quarter, index) => {
      quarter.firstHalf = playerPositioning[index + 2 % 2] // 0, 1, 0
      quarter.secondHalf = playerPositioning[index + 3 % 2] // 1, 0, 1 
      playerPositioning.splice(0, 1);
    });

    player.maxTimeAllowed = 20;
  })

  // validate each half is adds up to 30
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 8; y++) {
      console.log('variables',x, array, (y +3 % 2))
      const quarter = checkQuarterSum(x, array, (y + 3 % 2))
      console.log('quarter', quarter);
      while (quarter < 30) {
        const inactivePlayers = flag2Players.filter((player) => {
          (y +3 % 2) === 1 ? player.quarters[x].firstHalf === 0 : player.quarters[x].firstHalf === 0
        });
        console.log(inactivePlayers);
        (y +3 % 2) === 1 ? inactivePlayers[0].quarters[x].firstHalf = 5 : inactivePlayers[0].quarters[x].secondHalf = 5
      }
    }
  }

  return array
}

// Deprecated
export function updateFlag3PlayerPositions(dataArray) {
console.log('function');
  const updatedDataArray = dataArray.map((item) => {
    if (item.flag === '3') {
      
      item.maxTimeAllowed = 20;
      console.log('function pt2');
      // Determine whether to set firstHalf or secondHalf to 5
      const shouldSetFirstHalf = Math.random() < 0.5;
      console.log(shouldSetFirstHalf)

      if (shouldSetFirstHalf) {
        item.quarters[0].firstHalf = 0;
        item.quarters[0].secondHalf = 5;
        item.quarters[1].firstHalf = 5;
        item.quarters[1].secondHalf = 0;
        item.quarters[2].firstHalf = 5;
        item.quarters[2].secondHalf = 0;
        item.quarters[3].firstHalf = 5;
        item.quarters[3].secondHalf = 0;
      } else {
        item.quarters[0].firstHalf = 0;
        item.quarters[0].secondHalf = 5;
        item.quarters[1].firstHalf = 0;
        item.quarters[1].secondHalf = 5;
        item.quarters[2].firstHalf = 0;
        item.quarters[2].secondHalf = 5;
        item.quarters[3].secondHalf = 0;
        item.quarters[3].firstHalf = 5;
      }
    }

    return item;
  });

  return updatedDataArray;
}

export function checkQuarterSum(quarterIndex, dataArray, half) {
  let totalSum = 0;

  dataArray.forEach((item) => {
    if (item.quarters && item.quarters[quarterIndex]) {
      const quarter = item.quarters[quarterIndex];
      if (half === 1) {
        const sum = quarter.firstHalf;
        console.log(sum, 'sum')
        totalSum += sum;
      } else {
        const sum = quarter.secondHalf;
        totalSum += sum;
      }
      
    }
  });

  return totalSum;
}

// Deprecated
export function updateFlag1PlayerPositions(dataArray, quarter, half) {
  // Get all players with flag 1
  const flag1Players = dataArray.filter((item) => item.flag === '1');

  if (flag1Players.length > 0) return dataArray;

  const timeLimit = checkQuarterSum(quarter, dataArray, half);
  const maxTimeLimit = 30 * half;
  console.log('updateFlag1')
  console.log(timeLimit)
  
  // Update flag 1 players if there are 6 or less of them
  // If half = 1, only update if the current amount of players time does not exceed 30 (minutes)
  // If half = 2, only update if the current amount of players time does not exceed 60 (minutes)
  if (flag1Players.length <= 6 && timeLimit < maxTimeLimit) {
    flag1Players.forEach((player) => {
      // All flag 1 players should start the game
      if (quarter === 0 && half === 1) {
        player.quarters[quarter].firstHalf = 5;
      }
      // If player max time played is not 25 by the start of quarter 3 
      // then let them play for both halves of last quarter
      if (quarter === 3 && player.maxTimeAllowed === 15) {
        player.quarters[quarter].firstHalf = 5;
        player.quarters[quarter].secondHalf = 5;
      }
      // If it's the second half of a quarter and the player didn't play the first 
      // previous half, put them in the current quarter/half
      // OR
      // If player didn't play in the second half of the previous quarter (not including quarter 0)
      // Automatically put them in the current quarter/half
      if ((half === 2 && player.quarters[quarter].firstHalf === 0) || (quarter !== 0 && half === 1 && player.quarters[quarter - 1].secondHalf === 0)) {
        half === 1 ? player.quarters[quarter].firstHalf = 5 : player.quarters[quarter].secondHalf = 5;
      }

      
    })

    if (quarter === 0 && half === 2) {
      // We want half of flag 1 players to play both halves of quarter 0
      let count = Math.floor(flag1Players.length / 2);
      console.log('let count', count);
      // Set two random flag 1 players to play both halves of quarter 0.
      while (count > 0) {
        console.log('while count', count);
        const freshPlayers = flag1Players.filter((player) => {
          if (player.quarters[quarter].secondHalf === 0) {
            return player;
          }
        })

        // If all flag 1 players are in the second half of quarter 0, end loop.
        if (freshPlayers.length === 0) break;

        const randomIndex = Math.floor(Math.random() * freshPlayers.length);

        // Set randomPlayer to play, continue loop
        if (randomIndex >= 0) {
          const randomPlayer = freshPlayers[randomIndex];
          randomPlayer.quarters[quarter].secondHalf = 5;
          count -= 1;
        } else {
          count -= 1;
          continue;
        }

      }
    }
  }

  return dataArray;
}

// Deprecated
export function updateFlag2PlayerPositions(dataArray, quarter, half) {
  const timeLimit = 30 * half;

  // Get all players that have flag 2
  const flag2Players = dataArray.filter((item) => {
    if (item.flag === '2') {
      return item;
    }
  });

  if (flag2Players.length > 0) return dataArray;

  // Get all players that did not play in the previous half
  // ignores quarter 0
  const freshPlayers = flag2Players.filter((player) => {
    if ((quarter !== 0) && ((player.quarters[quarter - 1].secondHalf === 0 && half === 1) || (player.quarters[quarter].firstHalf === 0 && half === 2))) {
      return player;
    }
    if ((quarter === 0 && half === 2) && (player.quarters[quarter].firstHalf === 0 && half === 2)) {
      return player;
    }
  })

  // Any player that didn't play in the previous half (excluding quarter 0) gets to 
  // automatically play.
  console.log('freshPlayers.length', freshPlayers.length);
  if (freshPlayers.length > 0) {
    freshPlayers.forEach((player) => {
      half === 1 ? player.quarters[quarter].firstHalf = 5 : player.quarters[quarter].secondHalf = 5
    })
  } 

  // Loop through the quarter 0 half 1 players and fill remaining slots
  while ((checkQuarterSum(quarter, dataArray, 1) < timeLimit) && half === 1) {

    // Get all players for Quarter 0 half 1
    const activeQuarter0Players = flag2Players.filter((player) => {
      if (quarter === 0 && player.quarters[quarter].firstHalf === 0) {
        return player;
      }
    });

    // If there are no flag 2 players or it's not quarter 0, end loop.
    if (flag2Players.length === 0 || quarter !== 0 || activeQuarter0Players.length === 0) break;

    const randomIndex = Math.floor(Math.random() * activeQuarter0Players.length);

    if (activeQuarter0Players.length === 0) break;

    // For quarter 0, continue giving a flag 2 player a slot until time limit is reached.
    if (randomIndex >= 0) {
      const randomObject = activeQuarter0Players[randomIndex];
      if (half === 1) {
        randomObject.quarters[quarter].firstHalf = 5;
      } else {
        randomObject.quarters[quarter].firstHalf = 5;
      }
      console.log('randomObj',randomObject.quarters[quarter].firstHalf, randomObject.quarters[quarter].firstHalf)
      
    }
  }

  // Get all players that are not currently playing
  const activePlayers = flag2Players.filter((player) => {
    if (quarter !== 0 && ((half === 1 && player.quarters[quarter].firstHalf !== 5 )|| (half === 2 && player.quarters[quarter].secondHalf !== 5))) {
      return player;
    }
  });

  // While there are open slots for the quarter, continue adding flag 2 players
  while (checkQuarterSum(quarter, dataArray, half) < timeLimit) {
    if (activePlayers.length === 0) break;
      const randomIndex = Math.floor(Math.random() * activePlayers.length);
      half === 1 ? activePlayers[randomIndex].quarters[quarter].firstHalf = 5 : activePlayers[randomIndex].quarters[quarter].secondHalf = 5;
  }

  if (flag2Players.length !== 0 && quarter === 3) {
    flag2Players.forEach((player) => {
      if (player.maxTimeAllowed >= 20) {
        player.quarters[quarter].secondHalf = 5
      }
    })
  }

  return dataArray;
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
  flag1PlayerCount === 1 ? 40 
  : flag1PlayerCount === 2 ? 35 
  : flag1PlayerCount === 3 ? 30 : 25;

  const eachPlayerOnFieldCount = playerMaxTime / 5;
  const restTimeCount = playerMaxTime === 40 ? 0 : (40 - playerMaxTime) / 5;
  console.log('resttime', restTimeCount);
  const activePlayerArray = Array(eachPlayerOnFieldCount).fill(5);
  const restArray = Array(restTimeCount).fill(0);
  console.log('active rest arrays',activePlayerArray, restArray)
  
  const playerTimeArray = activePlayerArray.concat(restArray);
  console.log(playerTimeArray)


  flag1Players.forEach((player) => {
    // randomize rest times
    const playerPositioning = randomizePositioning(playerTimeArray);

    player.quarters.forEach((quarter, index) => {
      quarter.firstHalf = playerPositioning[index + 2 % 2] // 0, 1, 0
      quarter.secondHalf = playerPositioning[index + 3 % 2] // 1, 0, 1 
      playerPositioning.splice(0, 1);
    });

    player.maxTimeAllowed = playerMaxTime;
  })

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
  // Separate the array into two subarrays: one for non-zero values and one for zeros
  const nonZeroArray = arr.filter((value) => value !== 0);
  const zeroArray = arr.filter((value) => value === 0);

  const shuffledArray = shuffleArray(arr);

  // Initialize the result array
  const result = [];

  // Initialize a flag to track if the previous element was zero
  let prevWasZero = false;

  // Merge the non-zero values and shuffled zeros ensuring no adjacent zeros
  for (const value of shuffledArray) {
    if (prevWasZero) {
      // If the previous element was zero, add a non-zero value to break adjacency
      // result.shift();
      
      result.push(nonZeroArray.shift());
      prevWasZero = false;
    }
    result.push(value);
    prevWasZero = value === 0;
    while( result.length > arr.length) {
      result.shift();
      result.pop();
      result.push(0);
    }
  }

  // Add any remaining non-zero values
  // while (nonZeroArray.length > 0) {
  //   result.push(nonZeroArray.shift());
  // }
console.log('RESULS',arr, result);
  return result;
}





// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
