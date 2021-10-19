export const formatBytes = (bytes, decimals = 2) =>{
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];	
}

export const storagePercentage = (total,used) =>{
    let TotalAvail = parseInt(total);
    let RemainAvail = parseInt(used);
    let perc = "";
    if(isNaN(TotalAvail) || isNaN(RemainAvail)){
      return 0;
    }else{
         perc = ((RemainAvail/TotalAvail) * 100).toFixed(1);
        // return parseInt(perc) + '%';
        return parseInt(perc);
    }	
}