import { updateFlag1PlayerPositions, updateFlag2PlayerPositions, updateFlag3PlayerPositions, updatePlayerTimeInQuarter } from '../helpers';

export const createPlayerSchedule = async (data) => {
  // go through each one, one by one
    // First Half of quarter 1
    const iterationOne = await updateFlag3PlayerPositions(data);
    const iterationTwo = await updateFlag1PlayerPositions(iterationOne, 0, 1);
    const iterationThree = await updateFlag2PlayerPositions(iterationTwo, 0, 1);
    // Second half of quarter 1
    const iterationFour = await updateFlag1PlayerPositions(iterationThree, 0, 2);
    const iterationFive = await updateFlag2PlayerPositions(iterationFour, 0, 2);
    const quarterOneData = await updatePlayerTimeInQuarter(iterationFive, 0);
    // First Half of quarter 2
    // const iterationSeven = await updateFlag1PlayerPositions(quarterOneData, 1, 1);
    // const iterationEight = await updateFlag2PlayerPositions(iterationSeven, 1, 1);
    // // // Second half of quarter 2
    // const iterationNine = await updateFlag1PlayerPositions(iterationEight, 1, 2);
    // const iterationTen = await updateFlag2PlayerPositions(iterationNine, 1, 2);
    // const quarterTwoData = await updatePlayerTimeInQuarter(iterationTen, 1);
    // // // First Half of quarter 3
    // const iterationEleven = await updateFlag1PlayerPositions(quarterTwoData, 2, 1);
    // const iterationTwelve = await updateFlag2PlayerPositions(iterationEleven, 2, 1);
    // // // Second half of quarter 3
    // const iterationThirteen = await updateFlag1PlayerPositions(iterationTwelve, 2, 2);
    // const iterationFourteen = await updateFlag2PlayerPositions(iterationThirteen, 2, 2);
    // const quarterThreeData = await updatePlayerTimeInQuarter(iterationFourteen, 2);
    // console.log('use', quarterThreeData);
  return {
    quarterOne: quarterOneData,
    quarterTwo: [],
    quarterThree: []
  }
}