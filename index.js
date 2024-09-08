const [,,userName]=process.argv;
if(!userName){
    console.log("Username cannot be empty");
}else{
    const URL = `https://api.github.com/users/${userName}/events`;
    const data = await fetchData(URL);
    if(!data.length<=0){
        showData(data);
    }else{
        console.log(`No github activity found for ${userName}`);
    }
}

function showData(data){
    let activity = {};
    data.forEach(event => {
        if(activity[event.repo.name]==undefined){
            activity[event.repo.name] = {};
        }
        activity[event.repo.name][event.type] = (activity[event.repo.name][event.type] || 0) + 1;
    });
    activity = Object.entries(activity);
    activity.forEach(element=>{
        let repo = element[0];
        for (const [key, value] of Object.entries(element[1])) {
            console.log(`${value} ${key} in ${repo}`);
        }
    })
}



async function fetchData(URL) {
    let fetchData = [];
    fetchData = await fetch(URL).then(response=>{
        if(response.ok){
            let data = response.json();
            return data;
        }
    }).catch(error=> console.log("Error occur while fetching data"));
    
    return fetchData;
}

