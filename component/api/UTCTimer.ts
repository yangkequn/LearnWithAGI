import { Time } from ".";

//sync utc time with server
export class UTCTimer {
    private static offsetRecords: number[] = [];
    private static localStorageKey = "UTCTMOffset";
    //准确的时间，以服务器时间为准
    //sync time with server 5 times, and take medium as the final offset
    public static SyncWithServer(TryTimes: number = 5) {
        let startTime = Date.now();
        const SycTimeCallBack = (serverTime: any) => {
            //数据往返，真正到达服务器的时间，也就是服务器给的具有一致性的时间戳，是往返时间的一半
            let timeDiff = (serverTime - startTime) / 2
            UTCTimer.offsetRecords.push(timeDiff);
            //use median as UTCTimeSync.offset
            UTCTimer.offset = UTCTimer.offsetRecords.sort((a, b) => a - b)[Math.floor(UTCTimer.offsetRecords.length / 2)];
            // save to local storage
            typeof window !== 'undefined' &&localStorage.setItem(UTCTimer.localStorageKey, UTCTimer.offset.toString());
        }
        Time().then(SycTimeCallBack)
        if (TryTimes > 0) setTimeout(() => UTCTimer.SyncWithServer(TryTimes - 1), 100);

    }

    public static offset = 0;

    public static StartSyncServerTime = () => {
        //try load from local storage
        const offset = localStorage.getItem(UTCTimer.localStorageKey);
        if (!offset) return UTCTimer.SyncWithServer()
        UTCTimer.offset = Number(offset);
        console.info("UTCTimeSync.offset loaded from local storage: " + UTCTimer.offset)
    }
    public static LocalMs = (now: number = new Date().getTime()): number => now
    public static ServerMs = (now: number = new Date().getTime()): number => now + UTCTimer.offset
}
//auto sync time when app starts
UTCTimer.StartSyncServerTime();