import { updateFlag1PlayerPositions, updateFlag2PlayerPositions, updateFlag3PlayerPositions, updatePlayerTimeInQuarter } from '../helpers';

const usePlayerPositioning = async (data) => {
    // First Half of quarter 1
    const iterationOne = await updateFlag3PlayerPositions(data);
    const iterationTwo = await updateFlag1PlayerPositions(iterationOne, 0, 1);
    const iterationThree = await updateFlag2PlayerPositions(iterationTwo, 0, 1);
    // Second half of quarter 1
    const iterationFour = await updateFlag1PlayerPositions(iterationThree, 0, 2);
    const iterationFive = await updateFlag2PlayerPositions(iterationFour, 0, 2);
    const quarterOneData = await updatePlayerTimeInQuarter(iterationFive, 0);
    // First Half of quarter 2
    const iterationSeven = await updateFlag1PlayerPositions(quarterOneData, 1, 1);
    const iterationEight = await updateFlag2PlayerPositions(iterationSeven, 1, 1);
    // // Second half of quarter 2
    // const iterationNine = await updateFlag1PlayerPositions(iterationEight, 1, 2);
    // const iterationTen = await updateFlag2PlayerPositions(iterationNine, 1, 2);
    console.log('use', iterationEight);
  return {
    quarterOne: quarterOneData,
    quarterTwo: iterationEight,
  }
}

export default usePlayerPositioning