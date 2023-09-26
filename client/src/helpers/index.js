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
  
 export function validateQuarter1Flag3PlayerPositions(dataArray) {
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
          item.quarters[2].firstHalf = 5;
          item.quarters[3].firstHalf = 5;
        } else {
          item.quarters[0].secondHalf = 5;
          item.quarters[1].secondHalf = 5;
          item.quarters[2].secondHalf = 5;
          item.quarters[3].secondHalf = 0;
          item.quarters[3].firstHalf = 5;
        }
      }
  
      return item;
    });
  
    return updatedDataArray;
  }

  export function checkQuarterSum(quarterIndex, dataArray) {
    let totalSum = 0;
  
    dataArray.forEach((item) => {
      if (item.quarters && item.quarters[quarterIndex]) {
        const quarter = item.quarters[quarterIndex];
        const sum = quarter.firstHalf + quarter.secondHalf;
        totalSum += sum;
      }
    });
  
    return totalSum;
  }
  
  
  
  
  export function validateQuarter1FirstHalfFlag1PlayerPositions(dataArray) {
    const flag1Count = dataArray.filter((item) => item.flag === '1').length;

    const playerLimit = checkQuarterSum(0, dataArray);
  
    // If there are 6 or fewer objects with a flag of 1 and there's less than 6 players in the quarter, update the firstHalf of the first quarter
    if (flag1Count <= 6 && playerLimit < 30) {
      dataArray.forEach((item) => {
        if (item.flag === '1') {
          item.quarters[0].firstHalf = 5;
        }
      });
    }
  
    return dataArray;
  }

  export function validateQuarter1FirstHalfFlag2PlayerPositions(dataArray) {

    while (checkQuarterSum(0, dataArray) < 30) {
      const flag2Objects = dataArray.filter((item) => item.flag === '2' && item.quarters[0].firstHalf === 0);
      const randomIndex = Math.floor(Math.random() * flag2Objects.length);

      if (randomIndex >= 0) {
        const randomObject = flag2Objects[randomIndex];
        randomObject.quarters[0].firstHalf = 5;
      } else {
        // No more flag 2 objects with firstHalf at 0, break the loop
        break;
      }
    }
  
    return dataArray;
  }
  
  