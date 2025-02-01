const generateUsername = (email) => {
    if (!email.includes("@")) {
        throw new Error("Invalid email format");
    }

    // Extract the part before '@'
    let usernameBase = email.split("@")[0];

    // Remove special characters (except letters and numbers)
    usernameBase = usernameBase.replace(/[^a-zA-Z0-9]/g, "")

    // Append a random **two-digit** number to ensure uniqueness
    const randomNum = Math.floor(10 + Math.random() * 90); 

    return `${usernameBase}${randomNum}`.toLowerCase();
};
const emailone = generateUsername("harshdahiya@gmail.com")
const emailtwo = generateUsername("harshdahiya@yahoo.com")
console.log(emailone)
console.log(emailtwo)

export {
    generateUsername 
}
