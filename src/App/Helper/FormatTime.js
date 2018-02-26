export const formatTime=(timeInSeconds)=>{

    let minutes = "0" + Math.floor(timeInSeconds / 60).toString();
    let seconds = "0" + (timeInSeconds - minutes * 60).toString();

    return minutes.toString().slice(-2) + ":" + seconds.slice(-2);
};