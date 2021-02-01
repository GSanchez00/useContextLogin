export function fetchUser() {
    console.log("fetch user...");
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("fetched user");
        resolve({ 
            name: "Mr. Daiello", 
            token: "abjd2323jb443jbbb" 
        });
      }, 500);
    });
  }
