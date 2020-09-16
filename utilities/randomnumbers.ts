class Random{
    GenerateOddRandomNumber(lowerLimit:number, upperLimit:number){
        let random = Math.floor((Math.random()*(upperLimit-lowerLimit+2))+lowerLimit);
        if(random%2 === 0){
            return random-1;
        }
        return random;
    }

    GenerateEvenRandomNumber(lowerLimit:number, upperLimit:number){
        let random = Math.floor((Math.random()*(upperLimit-lowerLimit+1))+lowerLimit);
        if(random%2 !== 0){
            if(random !== upperLimit)
                return random+1;
            else
                return random-1;
        }
        return random;
    }
}


export default Random;