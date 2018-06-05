const API = {
    fetchPopularRepositories: function(language) {
        let URI = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
        return (
            fetch(URI, {
                method: 'get'
            })
            .then(response => response.json())
        )
    
    }
};

export default API;  