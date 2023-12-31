export const  timeAgo = (timestamp) => {
    const now = Date.now();
    const secondesAgo  = Math.floor((now - timestamp) / 1000);
   

    if (secondesAgo < 60){
        return `${secondesAgo}s ago`;

    }else if (secondesAgo < 3600){
        const minutesAgo = Math.floor(secondesAgo / 60);

        return `${minutesAgo}m ago`;
        
    }else if (secondesAgo < 86400){

        const hoursAgo = Math.floor(secondesAgo / 3600);

        return `${hoursAgo}h ago`;

    }else if  (secondesAgo < 604800){

        const daysAgo = Math.floor(secondesAgo / 86400);

        return `${daysAgo}d ago`;
     
    
    
    }else if (secondesAgo < 2629743){

        const weeksAgo = Math.floor(secondesAgo / 604800);

        return `${weeksAgo} w ago`;
    }



};