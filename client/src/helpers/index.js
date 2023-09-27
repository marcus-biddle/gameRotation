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
          totalSum += sum;
        } else {
          const sum = quarter.firstHalf + quarter.secondHalf;
          totalSum += sum;
        }
        
      }
    });
  
    return totalSum;
  }
  
  export function updateFlag1PlayerPositions(dataArray, quarter, half) {
    const flag1Count = dataArray.filter((item) => item.flag === '1').length;

    const timeLimit = checkQuarterSum(quarter, dataArray, half);
    const setTimeLimit = 30 * half;
    console.log('updateFlag1')
    console.log(timeLimit)
    // If there are 6 or fewer objects with a flag of 1 and there's less than 6 players in the quarter, update the firstHalf of the first quarter
    if (flag1Count <= 6 && timeLimit < setTimeLimit) {
      dataArray.forEach((item) => {
        if (item.flag === '1' && half === 1) {
          if (quarter === 0) {
            item.quarters[quarter].firstHalf = 5;
          } else if (item.maxTimeAllowed % 10 != 0) {
            item.quarters[quarter].firstHalf = 5;
          }
        } 
      });

      if (quarter === 0 && half === 2) {
        let count = flag1Count / 2;

        while (count > 0) {
          const flag2Objects = dataArray.filter((item) => item.flag === '1' && item.quarters[quarter].secondHalf === 0);
          const randomIndex = Math.floor(Math.random() * flag2Objects.length);
          console.log('while', flag2Objects)
          if (randomIndex >= 0) {
            const randomObject = flag2Objects[randomIndex];
            console.log('randObj', randomObject);
            randomObject.quarters[quarter].secondHalf = 5;
            count -= 1;
          } 

        }
      }
    }
  
    return dataArray;
  }

  export function updateFlag2PlayerPositions(dataArray, quarter, half) {

    const timeLimit = 30 * half;

    while (checkQuarterSum(quarter, dataArray, half) < timeLimit) {
      const flag2Objects = dataArray.filter((item) => {
        if (item.flag === '2' && item.quarters[quarter].firstHalf === 0) {
          return item;
        }
      });

      if (flag2Objects.length === 0) {
        break;
      }

      if (quarter === 0) {
        const randomIndex = Math.floor(Math.random() * flag2Objects.length);

        if (randomIndex >= 0) {
          const randomObject = flag2Objects[randomIndex];
          if (half === 1) {
            randomObject.quarters[quarter].firstHalf = 5;
          } else {
            randomObject.quarters[quarter].secondHalf = 5;
          }
          
        } else {
          // No more flag 2 objects with firstHalf at 0, break the loop
          break;
        }
      } else {
        flag2Objects.forEach((item) => {
          if (half === 1 && (item.quarters[quarter - 1].secondHalf === 0 || item.maxTimeAllowed % 10 != 0) ) {
            item.quarters[quarter].firstHalf = 5;
          } 
        });
      }

      
      
    }
  
    return dataArray;
  }
  
export function updatePlayerTimeInQuarter(array, quarter) {
  
    array.forEach((item) => {
      if (item.quarters && item.quarters[quarter] && item.flag !== '3') {
        const currentQuarter = item.quarters[quarter];
          const sum = currentQuarter.firstHalf + currentQuarter.secondHalf;
          item.maxTimeAllowed = sum;
      }
    });

  return array;
}