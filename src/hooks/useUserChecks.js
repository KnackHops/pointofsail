const _PROFANITY = [
    "faggot",
    "nigger",
    "cunt",
    "cock",
    "fuck",
    "tits",
    "shit"
]

const useUserCheck = () => {

    const responseCreator = ( description = "" ) => {
        return {
            status: {
                ok: description ? false : true,
                description
            }
        }
    }

    const generalCheck = ( val, which ) => {
        const whichUppercased = which.charAt(0).toUpperCase() + which.slice(1);

        if ( !val ) return responseCreator(`${whichUppercased} is empty!`);

        if ( val.includes(" ") ) return responseCreator(`${whichUppercased} has a space character!`);

        if ( which === "username" || which === "password" ) {
            if ( val.length <= 5 ) return responseCreator(`${whichUppercased} has to be 6 characters minimum!`);
            if ( which === "username" ) {
                if ( val.length >= 11 ) return responseCreator(`${whichUppercased} has to be 10 characters maximum!`);
            } else if ( which === "password" ) {
                if ( val.length >= 21 ) return responseCreator(`${whichUppercased} has to be 20 characters maximum!`);
            }
        }

        let containsProfanity = false;

        _PROFANITY.forEach( profItem => {
            if ( val.includes( profItem ) ) containsProfanity = true;
        } )

        if ( containsProfanity ) return responseCreator(`Contains profanity!`);

        switch ( which ) {
            case "username":
                return usernameCheck( val );
            case "password":
                return passwordCheck( val );
            case "email":
                return emailCheck( val );
            case "mobile":
                return mobileCheck( val );
            case "name":
                return nameCheck( val );
            default:
                console.log("not a valid value");
                return false;
        }
    }

    const usernameCheck = username => {
        /* it checks if the user is using a special character which we doesn't allow */
        /* it first checks if the character is a number which we do allow */
        /* then if it is underspace which we again, do allow */
        if ( [...username].some( eachChar => {
            if ( eachChar === "_" ) return false
            if ( !Number.isNaN( Number( eachChar ) ) ) return false
            if ( eachChar.toLowerCase() === eachChar.toUpperCase() ) return true
            return false
        } ) ) return responseCreator(`Username has a special character!`);

        return responseCreator();

    }
    
    const passwordCheck = password => {
        let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        let upper = 0;
        let lower = 0;

        [...password].forEach( eachChar => {

            if ( eachChar.toLowerCase() !== eachChar.toUpperCase() ) {

                if ( eachChar.toLowerCase() === eachChar ) lower+=1;
                if ( eachChar.toUpperCase() === eachChar ) upper+=1;
            }

        } )

        if ( !upper ) return responseCreator(`Password needs atleast one uppercase character!`)
        if ( !lower ) return responseCreator(`Password needs atleast one lowercase character!`)

        if ( format.test( password ) ) return responseCreator() 
        else return responseCreator(`Password needs atleast one special character`)

    }
    
    const emailCheck = email => {

        if ( /^\S+@\S+\.\S+$/.test(email) ) return responseCreator();
        else return responseCreator("Please enter a proper email")

    }

    const mobileCheck = mobile => {
        if ( mobile.length > 13 ) responseCreator('Mobile must be 13 characters maximum!');
        if ( mobile.length < 11 ) responseCreator('Mobile must be 11 characters minimum!');

        if ( [...mobile].some( eachChar => !Number.isNaN( Number( eachChar ) ) ) ) return responseCreator(`Mobile number must not contain characters and special characters`);

        return responseCreator();

    }

    const nameCheck = name => {
        if ( name.length < 4 ) return responseCreator(`Name must be 5 characters minimum!`);

        if ( [...name].some( eachChar => eachChar.toLowerCase() === eachChar.toUpperCase() ) ) return responseCreator(`Name must not contain special character or number`);

        return responseCreator();
    }

    return { generalCheck }
}

export default useUserCheck;