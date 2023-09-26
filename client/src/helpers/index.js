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
  
 export function updateDataFlag3(dataArray) {
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
    const valid = dataArray.every((item) => {
      if (item.quarters && item.quarters[quarterIndex]) {
        const quarter = item.quarters[quarterIndex];
        const sum = quarter.firstHalf + quarter.secondHalf;
        return sum === 30;
      }
      return false; // Handle cases where the quarter or quarters array doesn't exist
    });
  
    return valid;
  }
  
  
  export function updateDataFlag1FirstHalfPriority(dataArray) {
    const flag1Count = dataArray.filter((item) => item.flag === '1').length;

    const playerLimit = checkQuarterSum(0, dataArray);
  
    // If there are 6 or fewer objects with a flag of 1 and there's less than 6 players in the quarter, update the firstHalf of the first quarter
    if (flag1Count <= 6 && playerLimit) {
      dataArray.forEach((item) => {
        if (item.flag === '1') {
          item.quarters[0].firstHalf = 5;
        }
      });
    }
  
    return dataArray;
  }

  export function updateDataFlag2FirstHalf(dataArray) {
    const isQuarterSumValid = () => {
      const quarterSum = dataArray.reduce((sum, item) => {
        if (item.flag === '2' && item.quarters && item.quarters[0]) {
          sum += item.quarters[0].firstHalf;
        }
        return sum;
      }, 0);
      return quarterSum === 30;
    };
  
    while (!isQuarterSumValid()) {
      const flag2Objects = dataArray.filter((item) => item.flag === '2');
      const randomIndex = Math.floor(Math.random() * flag2Objects.length);
      const randomObject = flag2Objects[randomIndex];
  
      randomObject.quarters[0].firstHalf = 5;
    }
  
    return dataArray;
  }
  
  