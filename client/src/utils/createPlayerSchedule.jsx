import { addPlayerTime, bringInactivePlayersIntoQ1SecondHalf, bringInactivePlayersIntoQ2, bringInactivePlayersIntoQ2SecondHalf, bringInactivePlayersIntoQ3, bringInactivePlayersIntoQ3SecondHalf, bringInactivePlayersIntoQ4, bringInactivePlayersIntoQ4SecondHalf, checkQ2Half, checkQ4SecondHalf, createQ1Flag1, createQ1Flag2, createQ1Flag3, createQ1SecondHalfFlag1, createQ1SecondHalfFlag2, createQ2Flag1, createQ2Flag2, createQ2Flag3, createQ2SecondHalfFlag1, createQ2SecondHalfFlag2, createQ3Flag1, createQ3Flag2, createQ3SecondHalfFlag1, createQ3SecondHalfFlag2, createQ4Flag1, createQ4Flag2, createQ4Flag3, createQ4SecondHalfFlag1, createQ4SecondHalfFlag2, createQ4SecondHalfFlag3, } from "../helpers"

export const generatePlayerData = (data) => {
    
    createQ1Flag1(data);
    createQ1Flag3(data);
    createQ1Flag2(data);

    bringInactivePlayersIntoQ1SecondHalf(data);

    createQ1SecondHalfFlag1(data);
    createQ1SecondHalfFlag2(data);

    bringInactivePlayersIntoQ2(data);

    createQ2Flag2(data);
    createQ2Flag3(data);
    createQ2Flag1(data);

    checkQ2Half(data);

    bringInactivePlayersIntoQ2SecondHalf(data);

    createQ2SecondHalfFlag2(data);
    createQ2SecondHalfFlag1(data);

    bringInactivePlayersIntoQ3(data);

    createQ3Flag2(data);
    createQ3Flag1(data);

    bringInactivePlayersIntoQ3SecondHalf(data);

    createQ3SecondHalfFlag1(data);
    createQ3SecondHalfFlag2(data);

    bringInactivePlayersIntoQ4(data);

    createQ4Flag3(data);
    createQ4Flag1(data);
    createQ4Flag2(data);

    bringInactivePlayersIntoQ4SecondHalf(data);

    createQ4SecondHalfFlag1(data);
    createQ4SecondHalfFlag2(data);
    createQ4SecondHalfFlag3(data);

    checkQ4SecondHalf(data);

    addPlayerTime(data);
    
  return data;
}